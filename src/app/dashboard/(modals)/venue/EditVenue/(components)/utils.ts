import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import {z} from "zod"



const addVenueDefaultValues = {
  name: "",
  uniqueName: "",
  number: "",
  email: "",
  location: {
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
  googleMapsLink: "",
  timing: {
    startTime: "",
    endTime: "",
  },
  description: "",
  socialLinks: [
    { name: "Website", link: "" },
    { name: "Instagram", link: "" },
    { name: "WhatsApp", link: "" },
    { name: "Facebook", link: "" },
    { name: "X", link: "" },
    { name: "Youtube", link: "" },
  ],
  amenities: [],
  images: [],
  sports: [
    {
      name: "",
      description: "",
      price: 0,
      images: [],
      timing: {
        startTime: "",
        endTime: "",
        startDay: "",
        endDay: "",
      },
    },
  ],
}

const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export { addVenueDefaultValues, times, days}