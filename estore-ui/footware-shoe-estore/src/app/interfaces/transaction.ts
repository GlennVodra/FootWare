import { Shoe } from "./shoe";

export interface Transaction {
    id?: string;
    price: number;
    shoes: Shoe[];
}