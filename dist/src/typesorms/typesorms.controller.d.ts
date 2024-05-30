import { TypesormsService } from './typesorms.service';
import { CreateTypesormDto } from './dto/create-typesorm.dto';
import { UpdateTypesormDto } from './dto/update-typesorm.dto';
import { SignInDto } from 'src/jwt/dto/signin.dto';
export declare class TypesormsController {
    private readonly typesormsService;
    constructor(typesormsService: TypesormsService);
    create(createTypesormDto: CreateTypesormDto): Promise<import("./entities/typesorm.entity").Typesorm>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    findAll(): Promise<import("./entities/typesorm.entity").Typesorm[]>;
    findOne(id: string): Promise<import("./entities/typesorm.entity").Typesorm>;
    update(id: string, updateTypesormDto: UpdateTypesormDto): Promise<import("./entities/typesorm.entity").Typesorm>;
    remove(id: string): Promise<string>;
}
