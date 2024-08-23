import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useState } from "react";

const BasicVenueDetails = ({
  register,
  watch,
  socialFields,
  removeSocial,
  errors,
  appendSocial
}: any) => {

    const socialLinkNames = [
        "facebook",
        "instagram",
        "x",
        "youtube",
        "website",
        "whatsapp",
      ]
    const filteredLinks = socialLinkNames.filter((name) => !socialFields?.some((field: any) => field.name === name))
      const [selectedValue, setSelectedValue] = useState<string>("Add Social Link")
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Basic Details</h1>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-6 items-start">
            <div className="w-full">
              <Label htmlFor="venueName">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                id="venueName"
                {...register("name", { required: true })}
                error={errors?.name?.message}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="uniqueName">Unique Name</Label>

              <span className="ml-2 text-xs text-gray-500">
                https://notdoneyet.in/venue/
                {watch("uniqueName")}
              </span>
              <Input
                type="text"
                placeholder="Unique Name"
                id="uniqueName"
                {...register("uniqueName", { required: true })}
                error={errors?.uniqueName?.message}
              />
            </div>
          </div>
          <div className="flex justify-between gap-6 items-start">
            <div className="w-full">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="string"
                placeholder="Phone"
                inputMode="number"
                maxLength={10}
                id="phone"
                {...register("phone", { required: true })}
                error={errors?.phone?.message}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                {...register("email", { required: true })}
                error={errors?.email?.message}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="venueDescription">Description</Label>
            <Textarea
              aria-invalid={true}
              placeholder="Description"
              id="venueDescription"
              className="border rounded-md px-3 py-2 w-full focus:outline-none"
              {...register("description", { required: true })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Social Links</h1>


{ filteredLinks.length > 0 &&
        <Select
              onValueChange={(value) => {appendSocial({ name: value, link: "" }); setSelectedValue("Add Social Link")}}
              value={selectedValue}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Add Social Link"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Add Social Link" disabled>
                  Add Social Link
                </SelectItem>
                {filteredLinks.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
}

        <div className="grid grid-cols-2 gap-4">
          {socialFields.map((field: any, index: number) => (
            <div key={field.id} className="">
              <Label htmlFor="socialLinks">
                {field.name}
                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="text-red-500 text-xs ml-2"
                >
                  Remove
                </button>
              </Label>

              <Input
                type="text"
                placeholder={field.name}
                {...register(`socialLinks.${index}.link`)}
                error={errors?.socialLinks?.[index]?.link?.message}
              />
            </div>
          ))}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default BasicVenueDetails;
