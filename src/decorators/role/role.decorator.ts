import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/guards/role/role.guard';

export const ROLES_KEY = 'roles';
export const Roles = (role: Role[]) => SetMetadata(ROLES_KEY, role);
