import { IsEmail, IsNotEmpty, Length, isString } from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public value: string;
}

export class AuthLoginDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Length(8, 12, { message: 'Password has to be between 8 - 12 characters' })
  public password: string;
}
