import React, {useRef, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)
    const [uploading, setUploading] = useState(false)

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)

    }

    return (
        <div className='file-uploader'>
            <input type='file' onChange={uploadFileHandler} />
            <button onClick={e => fileInput.current && fileInput.current.click()} className= 'bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded py-2 px-4' />
        </div>

    )
}

export default FileUploader
