"use client";
import React from "react";
import { useRecoilState } from "recoil";
import cartStates from "../store/cartStates";
const AddCardButton = ({ product }: any) => {
  const [cart, setCart] = useRecoilState<any>(cartStates);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddCardButton;
