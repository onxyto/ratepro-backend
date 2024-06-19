import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches, IsEnum } from 'class-validator';
import { UserRolesEnum } from 'src/shared/enums/user-roles.enum';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  password: string;

  firstName: string;

  lastName: string;

  @IsNotEmpty()
  @IsEnum(UserRolesEnum, { each: true })
  role: UserRolesEnum;
}
