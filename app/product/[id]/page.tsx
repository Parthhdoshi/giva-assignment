import AddCardButton from "@/app/components/AddCardButton";

const fetchProduct = async (id: any) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};

export default async function ProductDetail({ params }: any) {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className="container mx-auto ">
      <div className="m-5">
        <h1 className="text-3xl">{product.title}</h1>
        <img src={product.image} alt={product.title} className="h-60" />
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating.rate}</p>

        <AddCardButton product={product} />
      </div>
    </div>
  );
}
