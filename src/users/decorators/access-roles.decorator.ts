import { SetMetadata } from '@nestjs/common';

export const AccessRoles = (...args: string[]) => SetMetadata('access-roles', args);
