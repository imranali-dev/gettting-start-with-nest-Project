import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './secama/Model.Users';
import { Model } from 'mongoose';
import { SignIN } from './dto/signIn-user.dto';
import * as bcrypt from 'bcryptjs';
// import { AuthToken } from './auth.service';

@Injectable()
export class UsersService {
  //InjectModel here we inject the model from @nestjs/mongoose
  // what is the model kis cheez ka model hai
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
    // @Injectable(private readonly authservicea:AuthToken),
  ) {}
  //Promise <Users> this basically only return whatever its saving
  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const hasingpassword = await bcrypt.hashSync(createUserDto.password);
      const model = new this.userModel();
      model.name = createUserDto.name;
      model.verifyCodeExpiry = createUserDto.verifyCodeExpiry;
      model.username = createUserDto.username;
      model.email = createUserDto.email;
      model.password = hasingpassword;
      model.isVerified = createUserDto.isVerified;
      model.verifyCode = createUserDto.verifyCode;
      return await model.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User with this email already exists');
      } else if (error.errors) {
        // This block is for Mongoose validation errors
        // dto service mein jo layer bnai hai us ko fulfill kry ga
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

  async findAll(): Promise<Users[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching users',
      );
    }
  }

  async findOne(id: string): Promise<Users> {
    try {
      const user = await this.userModel.findById(id).exec();
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel
        .findOne(
          { _id: id },
          {
            name: updateUserDto.name,
            verifyCodeExpiry: updateUserDto.verifyCodeExpiry,
            username: updateUserDto.username,
            email: updateUserDto.email,
            password: updateUserDto.password,
            isVerified: updateUserDto.isVerified,
            verifyCode: updateUserDto.verifyCode,
          },
          { new: true },
        )
        .exec();
      console.log(id);
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException('Invalid user ID');
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the user',
      );
    }
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    try {
      const result = await this.userModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { deleted: true };
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException('Invalid user ID');
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the user',
      );
    }
  }
  // ____________________________________________________________
  // ____________________________SiGnIN__________________________
  async SigIn(payload: SignIN): Promise<Users> {
    try {
      const user = await this.userModel
        .findOne({ email: payload.email })
        .exec();
      if (!user.email) {
        throw new BadRequestException('User with this email not found');
      }
      if (!user.isVerified) {
        throw new BadRequestException(
          'Please verify your account before logging in',
        );
      }
      const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      // const token = await
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while signing in',
      );
    }
  }
}
