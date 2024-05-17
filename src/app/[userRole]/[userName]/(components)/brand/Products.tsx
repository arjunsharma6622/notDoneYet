import ProductCard from "@/components/client/ProductCard";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Products = async ({ userData }: { userData: any }) => {
  const allProducts = await axios
    .get(`${API_HEAD}/product/user?userId=${userData?._id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Products</h2>
            <Link
              href={`/brand/${userData?.userName}/products`}
              className="flex text-sm items-center gap-0 text-blue-500"
            >
              View shop <FiArrowUpRight className="w-5 h-5"/>
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4 gap-y-8 w-full">
          {allProducts?.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
