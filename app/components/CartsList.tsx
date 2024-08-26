import React, { useState } from "react";
import { ProductSchema } from "./ProductList";
import RemoveIcon from "../../assets/images/icon-remove-item.svg";
import Image from "next/image";
import NoCartItems from "../../assets/images/illustration-empty-cart.svg";
import NeutralCarbo from "../../assets/images/icon-carbon-neutral.svg";
import ConfirmedList from "./ConfirmedList";
interface CartsListComponentProps {
  cartsList: ProductSchema[];
  totalAmount: string;
  setCartsList: React.Dispatch<React.SetStateAction<ProductSchema[]>>;
  productList: ProductSchema[];
  setProductList: React.Dispatch<React.SetStateAction<ProductSchema[]>>;
  totalQuantity: number;
}
const CartsList: React.FC<CartsListComponentProps> = ({
  cartsList,
  totalAmount,
  setCartsList,
  productList,
  setProductList,
  totalQuantity,
}) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const RemoveFromCart = (caIt: ProductSchema) => {
    const cartLists = [...cartsList];
    const productExistsInCart = cartsList.find(
      (cartItem) => cartItem.productName === cartItem.productName
    );

    if (productExistsInCart) {
      setCartsList((prev) =>
        prev.filter((item) => item.productName !== caIt.productName)
      );
    }

    //check in the product list
    const productsLists = [...productList];
    const productExists = productsLists.find(
      (p) => p.productName === caIt.productName
    );
    if (productExists) {
      if (productExists.quantity > 0) {
        productExists.quantity = 0;
      }
      setProductList(productsLists);
    }
  };

  return (
    <div>
      {totalQuantity > 0 ? (
        <div>
          {cartsList.map((cartItem, index) => {
            const price = parseFloat(cartItem.productPrice.replace("$", ""));
            const totalPrice = price * (cartItem.quantity || 0);
            return (
              <div key={index} className="flex flex-col mb-4 ">
                <div className="flex flex-row justify-between items-center w-[90%]">
                  <div>
                    <p className="text-gray-950 font-bold mb-1">
                      {cartItem.productDescription}{" "}
                    </p>
                  </div>

                  <div>
                    <Image
                      className="border-[1px] w-[20px] rounded-[10px]"
                      src={RemoveIcon}
                      onClick={() => RemoveFromCart(cartItem)}
                      alt="remove icon"
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <span>{cartItem.quantity}x </span>
                  <p className="ml-2 text-gray-400">@${price.toFixed(2)}</p>
                  <p className="ml-2 text-gray-500">
                    @${totalPrice.toFixed(2)}
                  </p>
                </div>
                <hr className="w-[90%] mt-2" />
              </div>
            );
          })}

          <div className="flex flex-row items-center justify-between w-[90%]">
            <div>
              <h1>Order Total</h1>
            </div>

            <div>
              <h1 className="pr-[4%] text-[25px] font-bold">${totalAmount}</h1>
            </div>
          </div>
          <button className="w-[90%] mt-4  flex flex-row gap-1 mb-[10px] bg-pink-100 px-6 py-2 rounded-lg">
            <Image src={NeutralCarbo} alt="neutral carbon" />
            <span>
              This is a <span className="font-bold">carbon-neutral </span>{" "}
              delivery
            </span>
          </button>

          <button
            onClick={() => setConfirmed(true)}
            className="w-[90%] mt-4 mb-[10%] bg-orange-700 text-white px-10 py-2 rounded-[20px]"
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <div className=" pt-[5%] pb-[10%] flex flex-col items-center ">
          <div>
            <Image
              src={NoCartItems}
              className="mx-auto mb-[4%]"
              alt="No cart items found"
            />
            <span className="text-gray-400  ">
              Your cart items will appear here{" "}
            </span>
          </div>
        </div>
      )}

      {confirmed && (
        <div>
            <ConfirmedList  cartsList={cartsList} totalAmount={totalAmount}/>
        </div>
      )}
    </div>
  );
};

export default CartsList;
