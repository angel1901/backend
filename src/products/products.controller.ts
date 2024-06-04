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
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/product.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  index(@Res() res: Response) {
    return this.productsService.index(res);
  }

  @Get(':id')
  show(@Param() params: { id: string }, @Res() res: Response) {
    return this.productsService.show(params.id, res);
  }

  @Post()
  add(@Body() dto: AddProductDto, @Req() req: Request, @Res() res: Response) {
    return this.productsService.add(dto, req, res);
  }

  @Put(':id')
  update(
    @Body() dto: AddProductDto,
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { id: string },
  ) {
    return this.productsService.update(params.id, dto, res);
  }

  @Delete(':id')
  delete(
    @Param() params: { id: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.productsService.delete(params.id, res);
  }
}
