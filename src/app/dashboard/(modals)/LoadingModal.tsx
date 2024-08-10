import ModalLayout from '@/components/ModalLayout'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const LoadingModal = () => {
    return (
        <ModalLayout>
            <div className="w-[95%] md:w-[40%] max-h-[90%] h-64 bg-white rounded-md flex items-center justify-center">
                <LoaderCircle strokeWidth={1.7} className='animate-spin w-10 h-10'/>
            </div>
        </ModalLayout>
    )
}

export default LoadingModal