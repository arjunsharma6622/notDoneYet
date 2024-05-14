"use client"

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

const Filters = () => {

  const [priceRange, setPriceRange] = useState({ min: '0', max: '10000' });

  const handlePriceChange = (value: number | number[], type: 'min' | 'max') => {
    if (typeof value === 'number') {
      setPriceRange((prevRange) => ({
        ...prevRange,
        [type]: value.toString()
      }));
    }
  };


  return (
    <div className="border rounded-lg px-4 py-2">
    <h3 className='text-lg font-medium'>Filter Products</h3>


<div className='flex flex-col gap-3'>
    <div className="filter-section text-sm">
      <label htmlFor="minPrice">Min Price: <span>Rs.{parseInt(priceRange.min)}</span>
</label>
      <Slider
      
        trackStyle={{ backgroundColor: 'rgb(59 130 246)' }}
        handleStyle={{
          borderColor: "rgb(59 130 246)",
          backgroundColor: "rgb(59 130 246)",
          boxShadow: "0 0 6px rgb(59, 130, 246, 0.6)"
        }}
        min={0}
        max={10000} // Set your desired max price here
        value={parseInt(priceRange.min)}
        onChange={(value) => handlePriceChange(value, 'min')}
      />
    </div>


    <div className="filter-section text-sm">
      <label htmlFor="maxPrice">Max Price: <span>Rs.{parseInt(priceRange.max)}</span>
</label>
      <Slider
        trackStyle={{ backgroundColor: 'rgb(59 130 246)' }}
        handleStyle={{
          borderColor: "rgb(59 130 246)",
          backgroundColor: "rgb(59 130 246)",
          boxShadow: "0 0 6px rgb(59, 130, 246, 0.6)"
        }}
        min={0}
        max={10000} // Set your desired max price here
        value={parseInt(priceRange.max)}
        onChange={(value) => handlePriceChange(value, 'max')}
      />
    </div>

    </div>

  </div>
  );
};

export default Filters;