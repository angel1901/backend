import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AddProductDto } from './dto/product.dto';
import { DataProduct } from 'src/auth/interfaces';
import { Request, Response } from 'express';
import { response } from 'src/utils/constants';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async index(res: Response) {
    try {
      const products = await this.prisma.products.findMany({
        where: {
          status: true,
        },
        orderBy: [{ created_at: 'desc' }],
      });
      return res.send(response('success', 'success', products));
    } catch (error) {
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async show(id: string, res: Response) {
    try {
      const product = await this.prisma.products.findFirst({
        where: {
          id: id,
          status: true,
        },
      });

      if (!product) {
        throw new NotFoundException();
      }

      return res.send(response('success', 'success', product));
    } catch (error) {
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async add(dto: AddProductDto, req: Request, res: Response) {
    try {
      const { name, description, value } = dto;
      const userInfo = req?.user as { id: string; email: string };

      const dataProduct: DataProduct = {
        name,
        description,
        value,
        user_creator_id: userInfo?.id ?? '2312',
      };

      const product = await this.prisma.products.create({
        data: dataProduct,
      });

      return res.send(response('success', 'Product Created', product));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async update(id: string, dto: AddProductDto, res: Response) {
    try {
      const validateProduct = await this.validateProduct(id);
      if (!validateProduct) {
        throw new NotFoundException('Product doesnt exist');
      }

      const product = await this.prisma.products.update({
        where: {
          id: id,
          status: true,
        },
        data: {
          ...dto,
        },
      });

      return res.send(response('success', 'Product Updated', product));
    } catch (error) {
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
  }

  async delete(id: string, res: Response) {
    try {
      const product = await this.validateProduct(id);
      if (!product) {
        return res.send(response('Error', 'Product doesnt Exist', []));
      }

      await this.prisma.products.update({
        where: {
          id: id,
          status: true,
        },
        data: {
          status: false,
        },
      });

      return res.send(response('success', 'Product deleted', []));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(response('error', 'Internal server error', []));
    }
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

    return true;
  }
}
