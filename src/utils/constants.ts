import { Res } from '@nestjs/common';
import { Request } from 'express';

export const jwtSecret = process.env.JWT_SECRET;

export const response = (status: string, message: string, data: any) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
