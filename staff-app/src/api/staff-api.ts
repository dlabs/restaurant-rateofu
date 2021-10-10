import ax from "./index";
import { StaffRoles } from "../components/Auth/staff-roles.enum";
import { triggerAsyncId } from "async_hooks";

export const getRoles = (): Promise<StaffRoles[]> =>
    Promise.resolve([StaffRoles.BARTENDER, StaffRoles.CHEF, StaffRoles.WAITER]);

export const auth = (name: string, role: string) =>
    ax.post("staff/authenticate", {
        name,
        role,
    });
