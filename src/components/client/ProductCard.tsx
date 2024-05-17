import Image from "next/legacy/image";
import Link from "next/link";
import { BiSolidStar } from "react-icons/bi";

const ProductCard = ({ product,  }: any) => {
  return (
    <Link href={`/brand/${product.brandUserName}/products/${product._id}`} className=" w-full overflow-hidden flex flex-col gap-2">
      <div className="overflow-hidden relative rounded-lg  cursor-pointer">
        <img
          src={product?.images[0]}
          alt=""
          loading="lazy"
          className="hover:scale-105 transform transition duration-500 "
        />
        <div className="z-[20] flex text-xs items-center gap-1 absolute bottom-2 left-2 bg-white/90 px-2 py-2 rounded-md">
          <div className="flex justify-center items-center gap-1">
            <span>4.5</span>
            <BiSolidStar className="w-4 h-4 text-green-500" />
          </div>
          |<div>3.2k</div>
        </div>

        <div className=" absolute bottom-0 w-full z-[10] h-24 bg-gradient-to-t from-black/60 from-5% to-transparent to-90%">

        </div>
      </div>
      <div className="flex flex-col gap-0">
        <div>
          <p className=" font-medium">{product?.name}</p>
        </div>
        <p className="text-xs text-gray-500">{product?.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium">
            Rs.{product?.pricing.presentPrice}
          </span>
          <span className="text-xs line-through text-gray-500">
            Rs.{product?.pricing.originalPrice}
          </span>
          <span className="text-xs text-red-500">
            ({product?.pricing?.discount}% off)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
