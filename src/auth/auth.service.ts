import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ComparePasswords, DataUser, SignToken } from './interfaces';
import { jwtSecret } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthRegisterDto) {
    const { email, password, name, last_name } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (foundUser) {
      throw new BadRequestException('Mail is registered');
    }

    const hashedPassword = await this.hashPassword(password);

    const dataUser: DataUser = {
      email,
      hashed_password: hashedPassword,
      name,
      last_name,
    };

    await this.prisma.user.create({
      data: dataUser,
    });

    return { message: 'Signup was succesfull' };
  }

  async signin(dto: AuthLoginDto, req: Request, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong info');
    }

    const args: ComparePasswords = {
      hashed_password: foundUser.hashed_password,
      password,
    };

    const isValidatePasswords = await this.comparePasswords(args);

    if (!isValidatePasswords) {
      throw new BadRequestException('Wrong info');
    }

    const sign: SignToken = {
      id: foundUser.id,
      email: foundUser.id,
    };

    const token = await this.signToken(sign);

    if (!token) {
      throw new ForbiddenException('Token doesnt exist');
    }

    res.cookie('token', token);

    return res.send({ status: 'success', message: 'Logged in' });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Signout was succesfull' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: ComparePasswords) {
    return await bcrypt.compare(args.password, args.hashed_password);
  }

  async signToken(args: SignToken) {
    const payload = args;

    return this.jwt.signAsync(payload, {
      secret: jwtSecret,
    });
  }
}
