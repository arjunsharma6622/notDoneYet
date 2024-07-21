import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import {z} from "zod"

const linkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const AddVenueSchema = z.object({
  name: z.string()
      .min(1, "Name is required"),

  uniqueName: z.string()
      .min(1, "This is required")
      .refine(async (uniqueName) => {
        if(!uniqueName) return true;
        const res = await axios.get(`${API_HEAD}/checkVenueName?uniqueName=${uniqueName}`);
        return res.data?.available;
      }, {
        message: "Name not available, please choose another",
      }),

  number : z.string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number")
      .regex(/^\d{10}$/, "Invalid phone number"),

  email: z.string()
      .email("Invalid email"),
      
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string()
        .min(6, "Invalid zip code")
        .max(6, "Invalid zip code")
        .regex(/^\d{6}$/, "Invalid zip code"),
  }),

  googleMapsLink: z.string()
      .min(1, "Google Maps link is required"),

  timing: z.object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  }),

  description: z.string(),
  
  socialLinks: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    link: z.string()
      .min(1, "Link is required")
      .regex(linkRegex, "Invalid link"),
  })),

  amenities: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    icon : z.string().min(1, "Icon is required"),
  })).min(4, "Select at least 4 amenities"),

  images: z.array(z.string()).min(1, "Add at least 1 image"),
  
  sports: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    price: z.number().min(1, "Price is required"),
    images: z.array(z.string()).min(1, "Image is required"),
    timing: z.object({
      startTime: z.string().min(1, "Start time is required"),
      endTime: z.string().min(1, "End time is required"),
      startDay: z.string().min(1, "Start day is required"),
      endDay: z.string().min(1, "End day is required"),
    })
  })).min(1, "Add at least 1 sport"),
})

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

export {AddVenueSchema, addVenueDefaultValues, times, days}