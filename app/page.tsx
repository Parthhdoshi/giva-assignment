"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Autocomplete, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";

export default function Home() {
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    let timeOut:any;
    const fetchProducts = async () => {
      setLoading(true);

      timeOut = window.setTimeout(async ()=>{
        try {
          const { data } = await axios.get("https://fakestoreapi.com/products");
          setProducts(data);
          setFilteredProducts(data);
        } catch (error) {
        } finally {
          setLoading(false); 
        }
      },3000);
    
    };
    fetchProducts();

    return() => {
      clearTimeout(timeOut);
    };

  }, []);

  const filterByCategory = (category: string) => {
    const filtered = products.filter(
      (product: any) => product.category === category
    );
    setFilteredProducts(filtered);
  };

  const sortByPrice = (order: any) => {
    const sorted = [...filteredProducts].sort((a: any, b: any) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  const paginateProducts = filteredProducts.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const categories = [
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelery", value: "jewelery" },
  ];

  const sortByPriceList = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];

  return (
    <div className="container mx-auto">
      <Grid container spacing={2} className="m-3 ">
        <Grid size={{ xs: 3, md: 3 }}>
          <Autocomplete
            disablePortal
            options={categories}
            fullWidth
            size="small"
            onChange={(event, newValue: any) => {
              filterByCategory(newValue?.value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Please Select Categories" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <h1 className="text-3xl text-center">Product Listing</h1>
        </Grid>
        <Grid size={{ xs: 3, md: 3 }}>
          <Autocomplete
            disablePortal
            options={sortByPriceList}
            fullWidth
            size="small"
            onChange={(event, newValue: any) => {
              sortByPrice(newValue?.value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Sort by Price" />
            )}
          />
        </Grid>
      </Grid>

      {loading ? (
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-3">
                   
          {Array(10).fill("").map((item,index) => (
            <Skeleton variant="rounded" height={300} key={index}/>
          ))}

        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-3">
            {paginateProducts.map((product: any) => (
              <motion.div whileHover={{ scale: 1.02 }} key={product.id}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              className="px-5"
            >
              {""}
              <FaLessThan
                className={`${
                  currentPage === 1 ? "text-gray-500 cursor-not-allowed" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setCurrentPage((page) => page + 1)}
              className="px-5"
            >
              {""}
              <FaGreaterThan />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
