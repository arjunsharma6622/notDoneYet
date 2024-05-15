import { productSizes } from '@/lib/utils'
import React from 'react'
import { FiCheck } from 'react-icons/fi'

const SizeQty = ({category, sizes, setSizes, stock, setStock} : any) => {
    const handleSizeClick = (size: string) => {
        if (sizes.includes(size)) {
          setSizes((prevSizes : string[]) => prevSizes.filter((s) => s !== size));
          setStock((prevStock : { size: string; quantity: number }[]) => prevStock.filter((item) => item.size !== size));
        } else {
          setSizes((prevSizes: string[]) => [...prevSizes, size]);
          setStock((prevStock: { size: string; quantity: number }[]) => [
            ...prevStock,
            { size, quantity: 0 },
          ]);
        }
      };
    
      const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, size: string) => {
        const newStock = stock.map((item : { size: string; quantity: number }) =>
          item.size === size ? { ...item, quantity: parseInt(e.target.value) || 0 } : item
        );
        setStock(newStock);
      };
  return (
    <div className="flex justify-between gap-6 items-start border px-4 py-2 rounded-lg">
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-wrap items-center gap-4">
        {productSizes[category].map((size, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`relative flex items-center cursor-pointer rounded-full ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-50"}`}
              onClick={() => handleSizeClick(size)}
            >
              {sizes.includes(size) && (
                <div className="absolute -top-1 -right-1 text-white rounded-full px-[2px] py-[2px] bg-green-500">
                  <FiCheck strokeWidth={4} className="w-3 h-3 font-medium" />
                </div>
              )}
              <input
                type="text"
                value={size}
                className="hidden"
                readOnly
              />
              <label
                className="text-center cursor-pointer gap-2 w-10 h-10 px-2 py-2 rounded-md"
              >
                {size}
              </label>
            </div>
            {sizes.includes(size) && (
              <input
                type="number"
                placeholder="Qty"
                min={0}
                className="w-14 text-sm placeholder:text-sm border outline-none py-1 px-2 rounded-md"
                value={stock.find((item : { size: string; quantity: number }) => item.size === size)?.quantity || 0}
                onChange={(e) => handleQuantityChange(e, size)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>  )
}

export default SizeQty