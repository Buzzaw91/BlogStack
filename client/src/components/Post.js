import React from 'react';


const Post = ({title, url, body}) => {


    return (
        <div className='container mx-auto flex-col justify-center items-center my-4'>

            <h1 className='font-robotoSlab text-2xl flex justify-center'>{title}</h1>
            <div className='font-sans text-md flex justify-center py-4 px-4'>{body}</div>
        </div>
    )
}

export default Post