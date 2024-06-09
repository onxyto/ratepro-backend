import { IsNotEmpty } from 'class-validator';
export class AddToFavoritesDto {
  @IsNotEmpty()
  id: number;
}
