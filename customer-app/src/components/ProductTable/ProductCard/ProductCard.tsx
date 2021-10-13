import React from "react";

import { ProductModel } from "models";

import styles from "./ProductCard.module.css";

type Props = {
    product: ProductModel;
    onAddToCard: (ProductModelproduct: ProductModel) => void;
};

const getIconByProductType = (type: string) => {
    return type === "drink" ? "local_bar" : "lunch_dining";
};

export default function ProductCard(props: Props) {
    const { product, onAddToCard } = props;
    const {
        name,
        type,
        displayPrice,
        imageUrl = "https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg",
    } = product;
    const productIcon = getIconByProductType(type);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div
                    className={styles.top}
                    style={{
                        backgroundImage: `url(${imageUrl}) `,
                    }}
                >
                    <span className={`${styles.productPrice} neon text-white`}>{displayPrice}</span>
                    <span className={`${styles.productIcon} neon text-white`}>
                        <i className="material-icons">{productIcon}</i>
                    </span>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <div className={styles.details}>
                            <h3>{name}</h3>
                        </div>
                        <div
                            className={styles.buy}
                            onClick={() => onAddToCard(product)}
                        >
                            <i className="material-icons select-none">add_shopping_cart</i>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.done}>
                            <i className="material-icons">done</i>
                        </div>
                        <div className={styles.details}>
                            <h3>{name}</h3>
                            <p>Added to your cart</p>
                        </div>
                        <div className={styles.remove}>
                            <i className="material-icons">clear</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
