import React, { useEffect, useState } from "react";

import { ProductModel } from "models";
import ProductCard from "./ProductCard";
import { getAvailableProducts } from "api/customer-api";

type Props = {
    onAddProductToCard: (product: ProductModel) => void;
};

export default function ProductTable(props: Props) {
    const { onAddProductToCard } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await getAvailableProducts();

                setProducts(products as any);
            } finally {
                setIsLoaded(true);
            }
        };

        loadProducts();
    }, []);

    if (!isLoaded)
        return (
            <div
                className="spinner icon-spinner-3 spinner-lg text-center"
                aria-hidden="true"
            ></div>
        );

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-12">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCard={onAddProductToCard}
                    />
                ))}
            </div>
        </div>
    );
}
