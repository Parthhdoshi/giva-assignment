import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import cartStates from '../store/cartStates';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  const cart:any = useRecoilValue(cartStates);
  const cartCount = cart.length;

  return (
    <header className="flex justify-between items-center py-4 bg-blue-600 text-white px-5">
      <h1 className="text-xl font-bold ">
        <Link href="/">My E-commerce</Link>
      </h1>

      <div>
        <Link href="/cart">
          <div className="flex items-center space-x-2">
            <FaShoppingCart />
            <span>{cartCount}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}