import { JwtServices } from './jwt.service';
import { SignUpDto } from './dto/signup.dto';
export declare class JwtController {
    private readonly jwtService;
    constructor(jwtService: JwtServices);
    create(createJwtDto: SignUpDto): Promise<import("../typesorms/entities/typesorm.entity").Typesorm>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
