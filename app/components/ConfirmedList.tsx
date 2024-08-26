import React from 'react'
import { ProductSchema } from './ProductList'
import Image from 'next/image'
import IconOrderConfirmed from "../../assets/images/icon-order-confirmed.svg";
interface OrderListComponentProps{
    cartsList: ProductSchema[]
    totalAmount: string
    setCartsList: React.Dispatch<React.SetStateAction<ProductSchema[]>>;
    setConfirmed: React.Dispatch<React.SetStateAction<boolean>>
    productList : ProductSchema[],
    setProductList: React.Dispatch<React.SetStateAction<ProductSchema[]>>;
}

const ConfirmedList: React.FC<OrderListComponentProps> = ({cartsList, totalAmount,productList, setProductList, setCartsList, setConfirmed}) => {
  
    const startNewOrder = () => {
        // Clone the product list to avoid mutating the original state directly
        const updatedProductList = productList.map((product) => {
          // Check if the product is in the cart and has a quantity greater than 0
          const cartItem = cartsList.find(
            (cartItem) => cartItem.productName === product.productName
          );
          if (cartItem && product.quantity > 0) {
            // Reset the quantity to 0
            return { ...product, quantity: 0 };
          }
          return product;
        });
      
        // Update the state with the modified product list
        setProductList(updatedProductList);
        // Clear the cart list
        setCartsList([]);
        // Set the confirmed status to false
        setConfirmed(false);
      };
      
    return (
    <div className="w-[25%] rounded-[20px] pl-[2%] pt-[2%] absolute left-[35%] top-[20%] bg-white ">
    <div className="flex flex-col gap-[10px]">
      <Image src={IconOrderConfirmed} alt="Icon order confirmed" />
      <h1 className="font-bold text-[20px]">Order Confirmed</h1>
      <span className="text-gray-400">We hope you enjoy your food!</span>

      <div className="bg-pink-50 pl-[2%] w-[90%] mt-[4%] rounded-lg">
        {cartsList.map((p, index) => {
          return (
            <div key={index}>
              <div className="flex flex-row gap-3 pt-[5%]">
                <div>
                  <Image
                    className="h-[50px] w-[100px]"
                    src={p.productImage}
                    alt={p.productDescription}
                  />
                </div>
                <div className="flex flex-col w-[80%]">
                  <p>{p.productName}</p>
                  <div className="flex flex-row gap-3 items-center">
                    <p className="text-[10px] text-orange-700">
                      {p.quantity}x
                    </p>
                    <p className="text-[15px] text-gray-500">
                      @{p.productPrice}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end  w-[40%] mr-[10px]">
                  <span className="text-gray-600 font-bold">
                    {p.productPrice}
                  </span>
                </div>
              </div>
              <hr className="w-[90%] text-gray-200 mt-[2%]" />
            </div>
          );
        })}

        <div className="flex flex-row justify-between pt-[5%]">
          <p>Order Total</p>
          <p className="text-gray-500 font-bold mr-[2%] mb-[5%]">
            ${totalAmount}
          </p>
        </div>
      </div>
    </div>
    <button onClick={startNewOrder} className='mx-auto px-8 border-none focus:border-none  bg-orange-600 mb-[5%] text-white w-[90%] py-2 rounded-[20px] mt-[5%]'>Start New Order</button>
  </div>
  )
}

export default ConfirmedList
