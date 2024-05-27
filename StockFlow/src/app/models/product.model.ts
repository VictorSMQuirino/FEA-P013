export interface Product {
    id?: string;
    name: string;
    description: string;
    quantity: number;
    category: string;
    entryDate: Date;
    exitDate?: Date;
}
