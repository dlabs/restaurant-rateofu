import ax from "./index";
import { StaffRoles } from "../components/Auth/staff-roles.enum";

export const getRoles = (): Promise<StaffRoles[]> =>
    Promise.resolve([StaffRoles.BARTENDER, StaffRoles.CHEF, StaffRoles.WAITER]);

interface AuthResponseModel {
    accessToken: string;
}

export const auth = (name: string, role: string): Promise<AuthResponseModel> =>
    ax.post("staff/authenticate", {
        name,
        role,
    });
