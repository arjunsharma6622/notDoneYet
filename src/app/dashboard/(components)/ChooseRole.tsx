"use client";

import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/legacy/image";
import { useState } from "react";
import { toast } from "sonner";

const ChooseRole = ({ userData, className }: any) => {
  const [choosenRole, setChoosenRole]: any = useState(null);
  const rolesData = [
    { value: "athlete", label: "Athlete", icon: "roleAthlete" },
    { value: "doctor", label: "Doctor", icon: "roleDoctor" },
    { value: "venue", label: "Venue", icon: "roleVenue" },
    { value: "brand", label: "Brand", icon: "roleBrand" },
  ];

  const handleRoleSave = async () => {
    try {
      const response = await axiosInstance.patch(`${API_HEAD}/user/`, {
        role: choosenRole,
      });
      toast.success("Role updated successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error updating role");
    }
  };

  return (
    <div className={`max-w-md w-full border shadow-md rounded-md mx-auto ${className}`}>
      <div className="p-4 flex flex-col gap-4">
        <p>Welcome {userData?.name}</p>
        <h1 className="text-2xl font-bold">Choose Your Role</h1>
        <div className="flex flex-col gap-4 px-6 py-4">
          {rolesData.map((role, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer ${choosenRole === role.value ? "bg-gray-200" : ""} gap-6 border rounded-md px-4 py-2`}
              onClick={() => setChoosenRole(role.value)}
            >
              <Image
                width={48}
                height={48}
                layout="intrinsic"
                src={`/images/${role.icon}.png`}
                alt=""
                className=""
              />
              <span className="font-medium">{role.label}</span>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2"
            onClick={handleRoleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
