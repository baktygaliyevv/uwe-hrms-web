import { useCallback, useEffect, useMemo, useState } from "react";
import { Product, Restaurant, StorageItem } from "../../../types/domain";
import { productsGet } from "../../../api/products/productsGet";
import { storageGet } from "../../../api/storage/storageGet";

type ReturnType = {
    product: Product;
    count: number;
}[];

export const useStorage = (restaurantId: Restaurant['id']) => {
    const [products, setProducts] = useState<Product[]>();
    const [storage, setStorage] = useState<StorageItem[]>();

    const refetch = useCallback(() => {
        storageGet().then(({ data }) => setStorage(data.payload));
    }, []);

    useEffect(() => {
        productsGet().then(({ data }) => setProducts(data.payload));
        refetch();
    }, []);

    const data = useMemo(() => {
        if(!storage || !products) return [];

        const restorage = storage.filter(({ restaurant }) => restaurant.id === restaurantId);
        return products.reduce((acc, product) => {
            const count = restorage.find((item) => item.product.id === product.id)?.count;

            if(count) return [
                ...acc,
                { 
                    product,
                    count
                }
            ];

            return [
                ...acc,
                {
                    product,
                    count: 0
                }
            ]
        }, [] as ReturnType);
    }, [storage, products, restaurantId]);

    return {
        data,
        refetch
    };
}