import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePrismaDto } from './dto/create-prisma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prisma } from './entities/prisma.entity';
import { hashPassword } from 'src/utils/hash.util';

@Injectable()
export class PrismaService {
  constructor(
    @InjectRepository(Prisma)
    private readonly usersRepositry: Repository<Prisma>,
  ) {}
  private async handleErrors(error: any): Promise<void> {
    if (error.code === 23505) {
      throw new BadRequestException('User with this email already exists');
    }
    if (error.errors) {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message,
      );
      throw new BadRequestException(messages);
    }
    throw new InternalServerErrorException(
      'An error occurred while processing the request',
    );
  }
  async create(payload: CreatePrismaDto): Promise<Prisma> {
    try {
      const existingUser = await this.usersRepositry.findOne({
        where: { email: payload.email },
      });
      if (existingUser) {
        throw new BadRequestException('email is already taken and verified');
      }
      const hashedPassword = await hashPassword(payload.hash);
      const newUser = this.usersRepositry.create({
        email: payload.email,
        hash: hashedPassword,
      });
      return await this.usersRepositry.save(newUser);
    } catch (error) {
      await this.handleErrors(error);
    }
  }
  async findOneByEmail(email: string): Promise<Prisma | undefined> {
    return this.usersRepositry.findOne({ where: { email } });
  }
}
