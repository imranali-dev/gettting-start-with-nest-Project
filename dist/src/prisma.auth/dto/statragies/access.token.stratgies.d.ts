import { Strategy } from 'passport-jwt';
declare const ATjwt_base: new (...args: any[]) => Strategy;
export declare class ATjwt extends ATjwt_base {
    constructor();
    validate(payload: any): any;
}
export {};
