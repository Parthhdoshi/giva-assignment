import Link from "next/link";
import AddCardButton from "./AddCardButton";
import Image from "next/image";

export default function ProductCard({ product }: any) {
  return (
    <div className="border p-4 rounded-md  text-center">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain"
        />
        <h2 className="text-lg font-bold text-center">{product.title}</h2>
        <p>{product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating.rate} / 5</p>
      </Link>

      <AddCardButton product={product} />

      <Link href={`/product/${product.id}`}>
        <div className="text-blue-500">View Details</div>
      </Link>
    </div>
  );
}
