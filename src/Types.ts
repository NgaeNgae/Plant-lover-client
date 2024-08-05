export type ProductType ={
    _id : string;
    name : string;
    images : string[];
    price : number;
    count : number;
    discount : number;
    description : string;
    createdAt : Date;
    updatedAt : Date;
}
export interface UserType{
    _id? : string;
    name? : string | undefined;
    email? : string;
    address? : string;
    createAt? : Date;
    updatedAt? : Date;
}