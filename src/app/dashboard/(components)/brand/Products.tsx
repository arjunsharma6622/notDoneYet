import React, { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import AddProduct from "../../(modals)/Brand/AddProduct";

const Products = ({ userData }: { userData: any }) => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Products</h2>

          <div className="flex justify-start items-center gap-4">
            <FiPlus
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenAddProduct(true)}
            />
            <FiEdit3
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenEditProduct(true)}
            />
          </div>
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
