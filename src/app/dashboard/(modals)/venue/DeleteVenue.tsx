import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { toast } from "sonner";

const DeleteVenue = ({
  open,
  setOpen,
  user,
  venueDetails,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  venueDetails: any;
  user: any;
}) => {
  const [enterredName, setEnterredName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteVenue = async ({ venueId }: { venueId: string }) => {
    try {
      setLoading(true);
      await axios.delete(`${API_HEAD}/venue/${venueId}`);
      setLoading(false);
      toast.success("Venue deleted successfully");
      setOpen(false);
    } catch (err) {
      setLoading(false);
      setOpen(false);
      console.log(err);
      toast.error("Venue delete failed");
    }
  };

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="flex  items-center gap-4">
                <h1 className="text-2xl font-bold">Delete Venue</h1>

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
            <div className="flex flex-col gap-6 overflow-scroll">
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="">
                  <p className="text-lg font-semibold">
                    Are you sure you want to delete this Venue?
                  </p>
                  <p className="text-sm text-gray-500">
                    This action will delete all data related to this Venue. This
                    cannot be undone.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm">
                    Please type your venue name `
                    <span className="text-base font-bold">
                      {venueDetails?.name}
                    </span>
                    ` to confirm
                  </p>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                    onChange={(e) => setEnterredName(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleDeleteVenue({ venueId: venueDetails?._id })
                    }
                    disabled={enterredName !== venueDetails?.name}
                    className={`w-fit  text-white px-4 py-2 rounded-md flex items-center gap-2 ${enterredName !== venueDetails?.name ? "bg-red-300 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                    ) : (
                      <FiAlertTriangle className="w-5 h-5 text-white" />
                    )}
                    <span>Delete Venue</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default DeleteVenue;
