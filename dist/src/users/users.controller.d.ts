/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignIN } from './dto/signIn-user.dto';
import { Users } from './secama/Model.Users';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    AUth(payload: CreateUserDto): Promise<Users>;
    signinauth(payload: SignIN): Promise<Users>;
    create(createUserDto: CreateUserDto): Promise<Users>;
    findAll(): Promise<Users[]>;
    findOne(id: string): Promise<Users>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./secama/Model.Users").UserDocument> & Users & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    SignIn(SignintoDTO: SignIN): Promise<Users>;
}
