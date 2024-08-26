import React from 'react'
import { ProductSchema } from './ProductList'
import Image from 'next/image'
import IconOrderConfirmed from "../../assets/images/icon-order-confirmed.svg";
interface OrderListComponentProps{
    cartsList: ProductSchema[]
    totalAmount: string
}

const ConfirmedList: React.FC<OrderListComponentProps> = ({cartsList, totalAmount}) => {
  return (
    <div className="w-[25%] rounded-[20px] pl-[2%] pt-[3%] absolute left-[35%] top-[20%] bg-white ">
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
  </div>
  )
}

export default ConfirmedList
