import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { toast } from "sonner";

const useFormSubmit = (url: string, method: "patch" | "post" | "put" = "patch") => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any, onSuccess?: (updatedData: any) => void) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance[method](url, data);
      if ( response.data.success) {
        toast.success(response.data.message);
        onSuccess?.(response.data.data); // Pass the updated data to the onSuccess callback
      }
    } catch (err : any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};

export default useFormSubmit;