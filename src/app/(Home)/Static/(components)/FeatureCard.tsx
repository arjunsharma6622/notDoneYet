import React from 'react'

const FeatureCard = ({ feature, iconMapping }: { feature: any, iconMapping: any }) => {
    return (
        <div key={feature.title} className="z-[1] flex items-center gap-4 md:relative text-center p-4 md:p-6 bg-white rounded-b-xl shadow-md">
            <div
                className={`w-14 h-14 md:w-14  md:h-14 flex items-center justify-center bg-gradient-to-b from-white ${feature.color} rounded-full md:absolute md:right-1/2 md:translate-x-1/2 md:-translate-y-1/2 md:-top-4 shadow-md`}
            >
                {React.createElement(iconMapping[feature.icon], { className: 'w-6 h-6 md:w-8 md:h-8', strokeWidth: 1.5 })}
            </div>
            <div className='flex-[1] text-left md:text-center w-fit'>
            <h3 className="text-lg md:text-xl font-bold text-black">{feature.title}</h3>
            <p className="mt-1 text-gray-600 text-[13px] md:text-sm">{feature.description}</p>
            </div>
        </div>
    )
}

export default FeatureCard