import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AuthDocument = Auth & Document;
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true })
  name: string;
  @Prop({
    required: [true, 'username is required'],
    unique: [true, 'username is alrady taken'],
  })
  username: string;
  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email is alrady taken'],
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
export const AuthModel = SchemaFactory.createForClass(Auth);

AuthModel.pre<AuthDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
