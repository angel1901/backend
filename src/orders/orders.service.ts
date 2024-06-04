import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { DataOrder, DataOrderLine, DataProduct } from 'src/auth/interfaces';
import { Request, Response } from 'express';
import { response } from 'src/utils/constants';
import {
  AddOrderDto,
  AddOrderLineAnOrderdDto,
  AddOrderLineDto,
} from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async index(res: Response) {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          status: true,
        },
        include: {
          OrderLine: {
            where: {
              status: true,
            },
          },
        },
        orderBy: [{ created_at: 'desc' }],
      });
      return res.send(response('success', 'success', orders));
    } catch (error) {
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async show(id: string, res: Response) {
    try {
      const order = await this.prisma.order.findMany({
        where: {
          id: id,
          status: true,
        },
        include: {
          OrderLine: {
            where: {
              status: true,
            },
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException();
      }

      return res.send(response('success', 'success', order));
    } catch (error) {
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async add(dto: AddOrderDto, req: Request, res: Response) {
    try {
      const { value, name } = dto;
      const userInfo = req?.user as { id: string; email: string };

      const dataOrder: DataOrder = {
        value,
        name,
        user_creator_id: userInfo?.id ?? '2312',
      };

      const order = await this.prisma.order.create({
        data: dataOrder,
      });

      return res.send(response('success', 'Order Created', order));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async update(id: string, dto: AddOrderDto, res: Response) {
    try {
      const validateOrder = await this.validateOrder(id);
      if (!validateOrder) {
        throw new NotFoundException('Product doesnt exist');
      }

      //   const product = await this.prisma.products.update({
      //     where: {
      //       id: id,
      //       status: true,
      //     },
      //     data: {
      //       ...dto,
      //     },
      //   });

      //   return res.send(response('success', 'Product Updated', product));
    } catch (error) {
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async delete(id: string, res: Response) {
    try {
      const order = await this.validateOrder(id);

      console.log(order);

      if (!order) {
        return res.send(response('Error', 'Product doesnt Exist', []));
      }

      await this.prisma.order.update({
        where: {
          id: id,
          status: true,
        },
        data: {
          status: false,
        },
      });

      return res.send(response('success', 'Order deleted', []));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async deleteOrderLine(id: string, res: Response) {
    try {
      await this.prisma.orderLine.update({
        where: {
          id: id,
          status: true,
        },
        data: {
          status: false,
        },
      });

      return res.send(response('success', 'Order deleted', []));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async addProductToOrder(dto: AddOrderLineDto, req: Request, res: Response) {
    try {
      const { orderId, productId } = dto;
      const userInfo = req?.user as { id: string; email: string };

      const validateOrder = await this.validateProduct(productId);
      if (!validateOrder) {
        throw new NotFoundException('Product doesnt exist');
      }

      const dataOrderLine: DataOrderLine = {
        orderId,
        productId,
        user_creator_id: userInfo?.id ?? '2312',
        value: 1190,
        quantity: 1,
      };

      const orderLine = await this.prisma.orderLine.create({
        data: dataOrderLine,
      });

      return res.send(response('success', 'Order Updated', orderLine));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async addOrderAndLines(
    dto: AddOrderLineAnOrderdDto,
    req: Request,
    res: Response,
  ) {
    try {
      const { name, productId } = dto;
      const userInfo = req?.user as { id: string; email: string };

      const dataOrder: DataOrder = {
        value: 0,
        name,
        user_creator_id: userInfo?.id ?? '2312',
      };

      const order = await this.prisma.order.create({
        data: dataOrder,
      });

      const validateProduct = await this.validateProduct(productId);
      if (!validateProduct) {
        throw new NotFoundException('Product doesnt exist');
      }

      const dataOrderLine: DataOrderLine = {
        orderId: order.id,
        productId,
        user_creator_id: userInfo?.id ?? '2312',
        value: parseInt(validateProduct.value) ?? 0,
        quantity: 1,
      };

      const orderLine = await this.prisma.orderLine.create({
        data: dataOrderLine,
      });

      return res.send(response('success', 'Order Updated', orderLine));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async validateOrder(id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: id,
        status: true,
      },
    });

    if (!order) {
      return false;
    }

    return order;
  }

  async validateProduct(id: string) {
    const product = await this.prisma.products.findFirst({
      where: {
        id: id,
        status: true,
      },
    });

    if (!product) {
      return false;
    }

    return product;
  }
}
