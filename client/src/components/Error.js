import React from 'react';

const Error = ({error}) => {

    return (
        <>
            <div className='container mx-auto py-2 px-2 flex justify-center'>
                <h2 className='text-red-500'>{error ? error : 'Input is invalid'}</h2>
            </div>
        </>
    )
}

export default Error