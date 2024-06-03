import { IsEmail, IsNotEmpty, Length, isString } from 'class-validator';

export class AddOrderDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public value: string;
}
