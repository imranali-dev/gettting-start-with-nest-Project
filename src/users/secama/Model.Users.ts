import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// here the meaning of decorater is the the decoration , we use them i contrller file so in the contrller file
//  its say i am the Contrller
// in service file it says i am the service
// so actuallly it define the behavior
// they are applied in class method
export type UserDocument = Users & Document; //UserDocument is a TypeScript type that represents a Mongoose document based on the Users class.
@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  username: string;
  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  })
  email: string;
  @Prop({ required: [true, 'Password is required'] })
  password: string;
  @Prop({ default: false })
  isVerified: boolean;
  @Prop({ required: [true, 'Verify Code is required'] })
  verifyCode: number;
  @Prop()
  verifyCodeExpiry: Date;
}

export const UsersModel = SchemaFactory.createForClass(Users);
