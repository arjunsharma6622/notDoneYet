"use client";

import ModalLayout from "@/components/ModalLayout";
import ProductCard from "@/components/client/ProductCard";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { toast } from "sonner";

const DeleteProduct = ({ open, setOpen, user, product }: any) => {
  const [enterredName, setEnterredName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleProductDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_HEAD}/product/${product._id}`);
      setLoading(false);
      toast.success("Product deleted successfully");
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Error deleting product");
      setLoading(false);
    }
  };
  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="flex  items-center gap-4">
                <h1 className="text-2xl font-bold">Delete Product</h1>

                <div className="flex items-center gap-2">
                  <FiAlertTriangle className="w-6 h-6 text-red-500" />
                  <span className="text-red-500 text-base">Danger Zone</span>
                </div>
              </div>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-6">
                <div className="">
                  <p className="text-lg font-semibold">
                    Are you sure you want to delete this product?
                  </p>
                  <p className="text-sm text-gray-500">
                    This action will delete all data related to this product.
                    This cannot be undone.
                  </p>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-64">
                    <ProductCard product={product} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm">
                      Please type your product name `
                      <span className="text-base font-bold">
                        {product?.name}
                      </span>
                      ` to confirm
                    </p>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                      onChange={(e) => setEnterredName(e.target.value)}
                    />
                    <button
                      onClick={handleProductDelete}
                      disabled={enterredName !== product?.name}
                      className={`w-fit  text-white px-4 py-2 rounded-md flex items-center gap-2 ${enterredName !== product?.name ? "bg-red-300 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        <FiAlertTriangle className="w-5 h-5 text-white" />
                      )}
                      <span>Delete Product</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ModalLayout>
      )}
    </div>
  );
};

export default DeleteProduct;
