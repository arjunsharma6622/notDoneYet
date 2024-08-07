"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { tabContent, tabs } from "../data";

const InteractiveSection = () => {
  const [activeTab, setActiveTab] = useState("athlete");

  return (
    <div className="container mx-auto px-4 py-10 md:px-10 md:py-16">
      <div className="flex justify-between items-center flex-col gap-10 md:gap-10 md:flex-row">
        <Image
          src="/static/images/network.svg"
          alt="Hero Image"
          width={500}
          height={500}
          className=""
        />

        <div className="flex flex-col gap-2 md:gap-4 ">
          <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">
            Which One of These Are You?
          </h2>
          <div className="hidden md:flex justify-center md:flex-wrap gap-y-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 mx-1 rounded-full ${activeTab === tab.key
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-black"
                  }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Select onValueChange={setActiveTab} defaultValue="athlete">
            <SelectTrigger className="w-full md:hidden">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.key} value={tab.key}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="bg-white shadow-md rounded-xl md:mt-2 p-2 md:p-6 flex flex-col items-center">
            <div className="flex justify-between w-full flex-col-reverse gap-2 items-center md:flex-row">
              <div className="w-full flex flex-col gap-4">
                <h3 className="text-base md:text-2xl font-semibold text-center md:text-left">
                  {tabContent[activeTab].headline}
                </h3>

                <ul className=" text-xs md:text-base">
                  {tabContent[activeTab].solutions.map(
                    (solution: string, index: number) => (
                        
                        <li key={index} className="text-gray-700">
                          <ArrowRight className="inline mr-2 w-4 h-4 md:w-6 md:h-6" />
                          {solution}
                        </li>
                    )
                  )}
                </ul>
              </div>

              <img
                src={`/static/images/${tabContent[activeTab].image}`}
                alt="Hero Image"
                className="w-16 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSection;
