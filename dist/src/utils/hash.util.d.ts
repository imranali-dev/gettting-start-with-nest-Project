export declare function hashPassword(password: string): Promise<string>;
export declare function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
