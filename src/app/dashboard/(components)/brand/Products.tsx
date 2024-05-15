import React, { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import AddProduct from "../../(modals)/Brand/AddProduct";
import { API_HEAD } from "@/lib/utils";
import useSWR from "swr";
import ProductCard from "./ProductCardDash";

const Products = ({ userData }: { userData: any }) => {
  const [openAddProduct, setOpenAddProduct] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allProducts,
    error,
    isLoading,
  } = useSWR(`${API_HEAD}/product/user?userId=${userData?._id}`, fetcher);



  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-start gap-8 items-center">
          <h2 className="text-xl font-bold">Products</h2>

          <div onClick={() => setOpenAddProduct(true)} className="flex justify-start items-center gap-4 cursor-pointer px-4 py-1 bg-gray-200 rounded-full text-sm">
            Add Product
            <FiPlus
              className=" h-5 w-5 text-gray-600"
              
            />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4 gap-y-8 w-full">
          {allProducts?.map((product: any, index: number) => (
              <ProductCard key={index} product={product} inDashboard={true}/>
            ))}
        </div>
      </div>

      {openAddProduct && (
        <div className="absolute">
          <AddProduct
            open={openAddProduct}
            setOpen={setOpenAddProduct}
            user={userData}
          />
        </div>
      )}

    </>
  );
};

export default Products;
