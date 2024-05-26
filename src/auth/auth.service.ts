import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatSignIN, CreateAuthDto, VerifyUsers } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './model/model.auth';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private AuthModel: Model<AuthDocument>) {}
  async create(payload: CreateAuthDto): Promise<Auth> {
    try {
      const existingUsername = await this.AuthModel.findOne({
        username: payload.username,
        isVerified: (payload.isVerified = true),
      });
      if (existingUsername) {
        throw new BadRequestException(
          ` Username ${existingUsername.username} is already taken`,
        );
      }
      const ExistingEmail = await this.AuthModel.findOne({
        email: payload.email,
      });
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      if (ExistingEmail.isVerified) {
        if (ExistingEmail) {
          throw new BadRequestException(
            ` Username ${ExistingEmail.email} is already taken`,
          );
        } else {
          const hashingpassword = await bcrypt.hash(payload.password, 10);
          ExistingEmail.password = hashingpassword;
          // here getting the error Type 'string' is not assignable to type 'number'. ExistingEmail.verifyCode  also need to fix it
          ExistingEmail.verifyCode = verifyCode;
          ExistingEmail.verifyCodeExpiry = new Date(Date.now() + 36000);
          await ExistingEmail.save();
        }
        return ExistingEmail;
      }
      const users = new this.AuthModel(payload);
      return await users.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User with this email already exists');
      } else if (error.errors) {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        throw new BadRequestException(messages);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the user',
        );
      }
    }
  }
  //______________________________________________________________
  async findAll(): Promise<Auth[]> {
    try {
      return await this.AuthModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching users',
      );
    }
  }

  async findOne(id: string): Promise<Auth> {
    try {
      const user = await this.AuthModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException('Invalid user ID');
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the user',
      );
    }
  }

  async update(id: string, payload: UpdateAuthDto) {
    try {
      const user = await this.AuthModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      if (!user) {
        throw new NotFoundException(`user #${user} not found`);
      }
      return user;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException('Invalid user ID');
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the user',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async SignIn(payload: CreatSignIN) {
    try {
      const findUser = await this.AuthModel.findOne({
        $or: [{ email: payload.email }, { username: payload.username }],
      });
      if (!findUser) {
        throw new BadRequestException('No user found with this email');
      } else if (!findUser.isVerified) {
        throw new BadRequestException(
          'Please verify your account before logging in',
        );
      }
      const isPasswordCorrect = await bcrypt.compare(
        payload.password,
        findUser.password,
      );
      if (!isPasswordCorrect) {
        throw new BadRequestException('Incorrect password');
      }
      return findUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User with this email already exists');
      } else if (error.errors) {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        throw new BadRequestException(messages);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the user',
        );
      }
    }
  }

  async VerifyUser(payload: VerifyUsers) {
    try {
      const decodedUsername = decodeURIComponent(payload.username);
      const user = await this.AuthModel.findOne({
        username: decodedUsername,
      });
      if (!user) {
        throw new BadRequestException('no user found');
      }
      // here getting the error Type 'string' is not assignable to type 'number'.
      const isCodeValid = user.verifyCode === payload.verifyCode;
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
      if (isCodeValid && isCodeNotExpired) {
        user.isVerified = true;
        await user.save();
      } else if (!isCodeNotExpired) {
        throw new BadRequestException('expire code');
      } else {
        throw new BadRequestException('wrong code');
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User with this email already exists');
      } else if (error.errors) {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        throw new BadRequestException(messages);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the user',
        );
      }
    }
  }
}
