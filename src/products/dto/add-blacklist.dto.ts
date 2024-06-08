import { IsNotEmpty } from 'class-validator';
export class AddToBlacklistsDto {
  @IsNotEmpty()
  id: number;
}
