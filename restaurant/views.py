from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import FormView, TemplateView, UpdateView

from restaurant.forms import DemandForm, StaffLoginForm
from restaurant.models import Demand, Employee, Item, Order


class IndexView(TemplateView):
    template_name = 'restaurant/index.html'

    def dispatch(self, *args, **kwargs):
        if Order.objects.filter(complete=False).exists():
            return redirect('restaurant:summary')
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        order = Order.objects.create()
        for item in Item.objects.all():
            quantity = request.POST.get(f'quantity-{item.pk}', 0)
            if quantity:
                demand = Demand.objects.create(item=item, quantity=quantity)
                order.demands.add(demand)
        return redirect('restaurant:summary')

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['items'] = Item.objects.all()
        return context


class SummaryView(TemplateView):
    template_name = 'restaurant/summary.html'

    def dispatch(self, *args, **kwargs):
        if not Order.objects.filter(complete=False).exists():
            return redirect('restaurant:index')
        return super().dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['order'] = Order.objects.filter(complete=False).first()
        return context


class StaffLoginView(FormView):
    template_name = 'restaurant/staff-login.html'
    form_class = StaffLoginForm
    success_url = reverse_lazy('restaurant:staff-index')

    def dispatch(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('restaurant:staff-index')
        return super().dispatch(*args, **kwargs)

    def form_valid(self, form):
        auth.login(self.request, form.user)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['roles'] = Employee.ROLE_CHOICES
        return context


@login_required(redirect_field_name=None)
def staff_logout(request):
    auth.logout(request)
    return redirect('restaurant:staff-login')


class StaffIndexView(LoginRequiredMixin, TemplateView):
    redirect_field_name = None
    template_name = 'restaurant/staff-index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        role = self.request.user.employee.role
        if role == Employee.WAITER:
            demands = Demand.objects.filter(status=Demand.READY)
        elif role == Employee.BARMAN:
            demands = Demand.objects.filter(
                status=Demand.NEW, item__type=Item.DRINK)
            demands |= Demand.objects.filter(
                status=Demand.PROCESSED, item__type=Item.DRINK)
        else:
            demands = Demand.objects.filter(
                status=Demand.NEW, item__type=Item.FOOD)
            demands |= Demand.objects.filter(
                status=Demand.PROCESSED, item__type=Item.FOOD)
        context['demands'] = demands
        return context


class DemandView(LoginRequiredMixin, UpdateView):
    redirect_field_name = None
    model = Demand
    form_class = DemandForm
    template_name_suffix = '-update'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['statuses'] = Demand.STATUS_CHOICES
        return context
