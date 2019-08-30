export interface IToken {
    accessToken:string;
    type:string;
    refreshToken:string;
    issued:string;
    expires:string;
    expiresIn: number;
}