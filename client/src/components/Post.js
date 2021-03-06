import React from 'react'


const Post = ({title, url, body}) => {

    return (
        <div className='container mx-auto flex-col my-4 shadow max-w-xl hover:bg-blue-100 pt-4'>
            <img src={url} alt='post' className='w-72 h-36 ml-32 mt-6 flex justify-center mb-2' />
            <h1 className='font-robotoSlab text-2xl flex justify-center mt-4'>{title}</h1>
            <div className='font-sans text-md flex justify-center py-4 px-4'>{body}</div>
        </div>
    )
}

export default Post