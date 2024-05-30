export declare class BcryptService {
    hash(data: string): Promise<string>;
    compare(data: string, encrypted: string): Promise<boolean>;
}
