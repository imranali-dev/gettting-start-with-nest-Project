export declare class CreateUserDto {
    name: string;
    username: string;
    email: string;
    password: string;
    isVerified?: boolean;
    verifyCode?: number;
    verifyCodeExpiry?: Date;
}
