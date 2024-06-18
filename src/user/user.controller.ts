import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signup(@Body() userRequest: UserDto) {
    return this.userService.createUser(userRequest);
  }

  @Post('/signin')
  signin(@Body() userRequest: UserDto) {
    return this.userService.createUser(userRequest);
  }
}
