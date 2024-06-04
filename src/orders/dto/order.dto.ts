import { IsEmail, IsNotEmpty, Length, isString } from 'class-validator';

export class AddOrderDto {
  @IsNotEmpty()
  public value: number;

  @IsNotEmpty()
  public name: string;
}

export class AddOrderLineDto {
  @IsNotEmpty()
  public orderId: string;

  @IsNotEmpty()
  public productId: string;
}

export class AddOrderLineAnOrderdDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public productId: string;
}
