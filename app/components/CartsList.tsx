import React from "react";
import { ProductSchema } from "./ProductList";
import RemoveIcon from "../../assets/images/icon-remove-item.svg";
import Image from "next/image";

interface CartsListComponentProps {
  cartsList: ProductSchema[];
  totalAmount: string;
  setCartsList: React.Dispatch<React.SetStateAction<ProductSchema[]>>
}
const CartsList: React.FC<CartsListComponentProps> = ({
  cartsList,
  totalAmount,
  setCartsList
}) => {


    const RemoveFromCart= (caIt: ProductSchema)=>{
        const cartLists = [...cartsList]
        const productExistsInCart = cartsList.find((cartItem)=>cartItem.productName === cartItem.productName  )
        
        if(productExistsInCart){
            setCartsList((prev) =>(
                prev.filter(item=> item.productName !== caIt.productName)
            ))
        }
       
    }

  return (
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
                  onClick={()=>RemoveFromCart(cartItem)}
                  alt="remove icon"
                />
              </div>
            </div>
            <div className="flex flex-row">
              <span>{cartItem.quantity}x </span>
              <p className="ml-2 text-gray-400">@${price.toFixed(2)}</p>
              <p className="ml-2 text-gray-500">@${totalPrice.toFixed(2)}</p>
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
                <h1 className="pr-[4%] text-[25px] font-bold">
                  ${totalAmount}
                </h1>
              </div>
            </div>
            <button className="w-[90%] mt-4 mb-[10px] bg-pink-100 px-10 py-2 rounded-lg">
              This is a <span className="font-bold">carbon-neutral </span>{" "}
              delivery
            </button>
            <button className="w-[90%] mt-4 mb-[10%] bg-orange-700 text-white px-10 py-2 rounded-[20px]">
              Confirm Order
            </button>
    </div>
  );
};

export default CartsList;
