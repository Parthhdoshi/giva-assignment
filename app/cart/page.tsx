"use client";
import { useRecoilState } from 'recoil';
import cartStates from '../store/cartStates';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
  const [cart, setCart] = useRecoilState(cartStates);

  const removeFromCart = (id:string) => {
    setCart(cart.filter((item:any) => item.id !== id));
  };

  const totalPrice = cart.reduce((acc:unknown, product:any) => acc + product?.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link href="/">
            <div className="text-blue-500">Go back to products</div>
          </Link>
        </div>
      ) : (
        <div>
          {cart.map((item:any) => (
            <div key={item.id} className="flex justify-between border p-4 mb-2 rounded-md">
              <Image src={item.image} alt={item.title} className="h-10" />
              <p>{item?.title}</p>
              <p>${item?.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}