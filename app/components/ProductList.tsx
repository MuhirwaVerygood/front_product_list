    "use client";

    import React, { useState } from "react";
    import Waffle from "../../assets/images/image-waffle-desktop.jpg";
    import CremeBluree from "../../assets/images/image-creme-brulee-desktop.jpg";
    import Macaron from "../../assets/images/image-macaron-desktop.jpg";
    import Tiramisu from "../../assets/images/image-tiramisu-desktop.jpg";
    import Baklava from "../../assets/images/image-baklava-desktop.jpg";
    import Pie from "../../assets/images/image-meringue-desktop.jpg";
    import Cake from "../../assets/images/image-cake-desktop.jpg";
    import Brownie from "../../assets/images/image-brownie-desktop.jpg";
    import Panna from "../../assets/images/image-panna-cotta-desktop.jpg";
    import Image, { StaticImageData } from "next/image";
    import AddToCartIcon from "../../assets/images/icon-add-to-cart.svg";
    import AdditionIcon from "../../assets/images/icon-increment-quantity.svg";
    import RemoveIcon from "../../assets/images/icon-decrement-quantity.svg";
    import CartsList from "./CartsList";
    export interface ProductSchema {
    productName: string;
    productDescription: string;
    productPrice: string;
    productImage: StaticImageData;
    quantity: number;
    isClicked: boolean // Quantity in the product list
    }

    const ProductList: React.FC = () => {
    const [productLists, setProductLists] = useState<ProductSchema[]>([
        {
        productName: "Waffle",
        productDescription: "Waffle with Berries",
        productPrice: "$6.50",
        productImage: Waffle,
        quantity: 0,
        isClicked:false
        },
        {
        productName: "Creme Bluree",
        productDescription: "Vanilla Bean Creme Bluree",
        productPrice: "$7.00",
        productImage: CremeBluree,
        quantity: 0
        ,
        isClicked:false
        },
        {
        productName: "Macaron",
        productDescription: "Macaron mix of Five",
        productPrice: "$8.00",
        productImage: Macaron,
        quantity: 0
        ,
        isClicked:false
        },
        {
        productName: "Tiramisu",
        productDescription: "Classic Tiramisu",
        productPrice: "$5.50",
        productImage: Tiramisu,
        quantity: 0
        ,
        isClicked:false
        },
        {
        productName: "Baklava",
        productDescription: "Pistachio Baklava",
        productPrice: "$4.00",
        productImage: Baklava,
        quantity: 0
        ,
        isClicked:false
        },
        {
        productName: "Pie",
        productDescription: "Lemon Meringue Pie",
        productPrice: "$5.00",
        productImage: Pie,
        quantity: 0
        ,
        isClicked:false
        },
        {
        productName: "Cake",
        productDescription: "Red Velvet Cake",
        productPrice: "$4.50",
        productImage: Cake,
        quantity: 0,
        isClicked:false
        },
        {
        productName: "Brownie",
        productDescription: "Salted Caramel Brownie",
        productPrice: "$5.50",
        productImage: Brownie,
        quantity: 0,
        isClicked:false
        },
        {
        productName: "Panna Cotta",
        productDescription: "Vanilla Panna Cotta",
        productPrice: "$6.50",
        productImage: Panna,
        quantity: 0,
        isClicked:false
        },
    ]);

    const [cartsList, setCartsList] = useState<ProductSchema[]>([]);
    const [confirmed, setConfirmed] = useState<boolean>(false)
    const incrementProductCount = (index: number) => {
        const updatedProducts = [...productLists];

        if (index >= 0 && index < updatedProducts.length) {
        updatedProducts[index].quantity += 1;
        setProductLists(updatedProducts);
        updateCart(updatedProducts[index]);
        }
    };

    const decrementProductCount = (index: number) => {
        const updatedProducts = [...productLists];

        if (
        index >= 0 &&
        index < updatedProducts.length &&
        updatedProducts[index].quantity > 0
        ) {
        updatedProducts[index].quantity -= 1;
        setProductLists(updatedProducts);
        updateCart(updatedProducts[index]);
        }
    };

    // Update the cart whenever a product's quantity changes
    const updateCart = (product: ProductSchema) => {
        const existingProductInCart = cartsList.find(
        (cartItem) => cartItem.productName === product.productName
        );

        if (existingProductInCart) {
        if (product.quantity === 0) {
            // Remove the product from the cart if the quantity is zero
            setCartsList((prev) =>
            prev.filter(
                (cartItem) => cartItem.productName !== product.productName
            )
            );
        } else {
            // Update the existing product in the cart
            setCartsList((prev) =>
            prev.map((cartItem) =>
                cartItem.productName === product.productName
                ? {
                    ...cartItem,
                    quantity: product.quantity,
                    productPrice: `$${parseFloat(
                        product.productPrice.replace("$", "")
                    ).toFixed(2)}`,
                    isClicked: true
                    }
                : cartItem
            )
            );
        }
        } else {
        // Add the product to the cart if it's not already there and has a quantity > 0
        if (product.quantity > 0) {
            setCartsList((prev) => [...prev, { ...product }]);
        }
        }
    };

    const addToCart = (product: ProductSchema, index: number) => {
        const updatedProducts = [...productLists];
        
        // Set isClicked to true for the clicked product
        updatedProducts[index].isClicked = true;
        
        setProductLists(updatedProducts);
        incrementProductCount(index);
      };
      

    const totalQuantity = cartsList.reduce(
        (acc, cartItem) => acc + (cartItem.quantity || 0),
        0
    );
    const totalAmount = cartsList
        .reduce(
        (acc, cartItem) =>
            acc +
            parseFloat(cartItem.productPrice.replace("$", "")) *
            (cartItem.quantity || 0),
        0
        )
        .toFixed(2);

    return (
        <div className={`w-full  `}>
        <h1 className="font-bold text-[30px]">Desserts</h1>
        <div className="flex lg:flex-row ss:flex-col">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 ss:grid-cols-1 md:w-[95%] lg:w-[70%] ss:w-full">
            {productLists.map((p, index) => {
                return (
                <div key={index} className="md:w-[95%] ss:w-[90%]  pt-[5%] cursor-pointer">
                    <Image
                    src={p.productImage}
                    alt={p.productDescription}
                    className={p.isClicked ?" ss:w-full border-[2px] border-orange-500 rounded-lg  mt-4 mb-[-2%]": "ss:w-full rounded-lg mt-4 mb-[-2%] "}
                    />
                    {p.quantity > 0 ? (
                    <button className="flex flex-row  bg-orange-700 gap-10 items-center lg:px-8 lg:py-2 md:py-3 ss:py-2 ss:px-16  md:px-16  rounded-[20px] relative ss:top-[-2%] sm:top-[-1%]  md:top-[-4%]   border-none  ss:mx-auto   ">
                        <Image
                        src={RemoveIcon}
                        className="border-orange-300 border-[1px] w-[20px] h-[20px]  p-1 px-1 rounded-[50%]"
                        onClick={() => decrementProductCount(index)}
                        alt="Subtraction icon"
                        />
                        <span className="text-white">{p.quantity}</span>
                        <Image
                        className="border-orange-300 border-[1px] w-[20px] h-[20px] px-1 p-1 rounded-[50%]"
                        src={AdditionIcon}
                        onClick={() => incrementProductCount(index)}
                        alt="Addition icon"
                        />
                    </button>
                    ) : (
                    <button
                        className=" bg-white lg:px-8 lg:py-2 md:py-3 ss:py-2 ss:px-16  md:px-16 flex flex-row rounded-[20px] relative ss:top-[-2%] sm:top-[-1%]  md:top-[-4%]   border-[1px] border-orange-900 ss:mx-auto"
                        onClick={() => addToCart(p, index)}
                    >
                        <Image
                        src={AddToCartIcon}
                        alt="Add to cart"
                        className="mr-[10px]"
                        />
                        <span>Add To Cart</span>
                    </button>
                    )}
                    <p className="text-gray-500">{p.productName}</p>
                    <h3 className="font-bold">{p.productDescription}</h3>
                    <p className="text-orange-600">{p.productPrice}</p>
                </div>
                );
            })}
            </div>

            <div className="bg-white md:w-[50%] lg:w-[25%] md:mt-5 ss:w-[90%] md:pt-[2%] ss:pt-[5%] ss:mt-[5%] md:mt-0 pl-[2%] rounded-lg h-fit">
            <h1 className=" text-[20px] mb-3 font-bold text-orange-700">
                Your Cart ({totalQuantity})
            </h1>
            <CartsList cartsList={cartsList} confirmed={confirmed}  setConfirmed={setConfirmed} totalQuantity={totalQuantity} productList={productLists} setProductList={setProductLists} totalAmount={totalAmount} setCartsList={setCartsList}/>
            </div>
        </div>
        </div>
    );
    };

    export default ProductList;
