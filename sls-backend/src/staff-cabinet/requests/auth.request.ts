import { IsEnum } from 'class-validator';
import { StaffRoles } from 'src/shared/enums/staff-roles.enum';

export class AuthRequest {
    name: string;

    @IsEnum(StaffRoles)
    role: StaffRoles;
}
