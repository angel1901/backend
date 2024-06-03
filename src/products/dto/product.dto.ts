import { IsEmail, IsNotEmpty, Length, isString } from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public value: string;

  @IsNotEmpty()
  public url_image: string;
}
