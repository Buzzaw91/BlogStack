import React from 'react';
import axios from 'axios'


const Post = ({title, url, body}) => {
    console.log('url: ',url)

    return (
        <div className='container mx-auto flex-col justify-center items-center my-4 border max-w-xl'>
            <img src={url} alt='post' className='w-72 h-36 ml-24' />
            <h1 className='font-robotoSlab text-2xl flex justify-center'>{title}</h1>
            <div className='font-sans text-md flex justify-center py-4 px-4'>{body}</div>
        </div>
    )
}

export default Post