import { OrdersService } from './orders.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {
  AddOrderDto,
  AddOrderLineAnOrderdDto,
  AddOrderLineDto,
} from './dto/order.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get()
  index(@Res() res: Response) {
    return this.ordersService.index(res);
  }

  @Get(':id')
  show(@Param() params: { id: string }, @Res() res: Response) {
    return this.ordersService.show(params.id, res);
  }

  @Post()
  add(@Body() dto: AddOrderDto, @Req() req: Request, @Res() res: Response) {
    return this.ordersService.add(dto, req, res);
  }

  @Post('lines')
  addProductToOrder(
    @Body() dto: AddOrderLineDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.ordersService.addProductToOrder(dto, req, res);
  }

  @Post('orders-lines')
  addOrderAndLines(
    @Body() dto: AddOrderLineAnOrderdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.ordersService.addOrderAndLines(dto, req, res);
  }

  @Put(':id')
  update(
    @Body() dto: AddOrderDto,
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { id: string },
  ) {
    return this.ordersService.update(params.id, dto, res);
  }

  @Delete(':id')
  delete(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.ordersService.delete(params.id, res);
  }
  @Delete('order-line/:id')
  deleteOrderLine(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.ordersService.deleteOrderLine(params.id, res);
  }
}
