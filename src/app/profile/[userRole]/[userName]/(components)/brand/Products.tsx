import ProductCard from "@/components/client/ProductCard";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";

const Products = async ({ userData }: { userData: any }) => {

  const allProducts = await axios.get(`${API_HEAD}/product/user?userId=${userData?._id}`).then((res) => res.data).catch((err) => console.error("Error", err));


  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Products</h2>
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
