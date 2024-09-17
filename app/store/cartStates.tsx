import { atom } from 'recoil';

const getCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const cartState = atom({
  key: 'cartState', 
  default: getCartFromLocalStorage(), 
});

export default cartState;