import type { Product } from "../types/product";

export const groupByCategory = (products: Product[]): Record<string, Product[]> => {
    return products.reduce<Record<string, Product[]>>((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});
}
