import { UserRolesEnum } from './../../shared/enums/user-roles.enum';
import { IsEnum } from 'class-validator';

export class UserDto {
  email: string;

  password: string;

  firstName: string;

  lastName: string;

  @IsEnum(UserRolesEnum, { each: true })
  role: UserRolesEnum;
}
