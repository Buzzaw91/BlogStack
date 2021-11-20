import React from 'react';


const Loader = () => {

    return (
        <>
            <div className='bg-white flex space-x-2 p-2 rounded-full justify-center items-center max-h-6'>
                <div class='bg-gray-500 p-1 w-2 h-2 rounded-full animate-bounce gray-circle-1'></div>
                <div class='bg-gray-600 p-1 w-2 h-2 rounded-full animate-bounce gray-circle-2'></div>
                <div class='bg-gray-700 p-1 w-2 h-2 rounded-full animate-bounce gray-circle-3'></div>
            </div>
        </>
    )
}

export default Loader