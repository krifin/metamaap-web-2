import React from 'react'
import './UploadAsset.css'
import FilePicker from '../components/FilePicker'

const UploadAsset = () => {
    const [dragging, setDragging] = React.useState({
        model: false,
        image: false
    })

    const [state, setState] = React.useState({
        model: null,
        image: null
    })

    return (
        <div className='upload-asset-container'>
            <div className='upload-asset-text'>UPLOAD ASSET</div>
            <div className='upload-assets'>
                <div className={`upload-asset${dragging.model ? ' dragging' : ''}`} onDragOver={
                    (e) => {
                        e.preventDefault()
                        setDragging(val => {
                            return { ...val, model: true }
                        })
                    }
                }
                    onDragLeave={
                        (e) => {
                            e.preventDefault()
                            setDragging(val => {
                                return { ...val, model: false }
                            })
                        }
                    }
                    onDrop={
                        (e) => {
                            e.preventDefault()
                            setDragging(val => {
                                return { ...val, model: false }
                            })
                            const files = e.dataTransfer.files
                            if (files.length > 0) {
                                setState(val => {
                                    return { ...val, model: files[0] }
                                })
                            }
                        }
                    }
                >
                    <div className='upload-text'>Drag & Drop 3D Model Here</div>
                    <div className='upload-text' style={{ fontSize: '16px' }}>Or</div>
                    <FilePicker onChange={(file) => {
                        setState(val => {
                            return { ...val, model: file }
                        })
                    }}>
                        <div className='select-file-button'>Select File</div>
                    </FilePicker>
                </div>
                <div className={'upload-asset' + (dragging.image ? ' dragging' : '')}
                    onDragOver={
                        (e) => {
                            e.preventDefault()
                            setDragging(val => {
                                return { ...val, image: true }
                            })
                        }
                    }
                    onDragLeave={
                        (e) => {
                            e.preventDefault()
                            setDragging(val => {
                                return { ...val, image: false }
                            })
                        }
                    }
                    onDrop={
                        (e) => {
                            e.preventDefault()
                            setDragging(val => {
                                return { ...val, image: false }
                            })
                            const files = e.dataTransfer.files
                            if (files.length > 0) {
                                if (!files[0].type.includes('image')) {
                                    alert('Please upload an image')
                                }
                                else {
                                    setState(val => {
                                        return { ...val, image: files[0] }
                                    })
                                }
                            }
                        }
                    }
                >
                    <div className='upload-text'>Drag & Drop Image Here</div>
                    <div className='upload-text' style={{ fontSize: '16px' }}>Or</div>
                    <FilePicker accept="image/*" onChange={
                        (file) => {
                            setState(val => {
                                return { ...val, image: file }
                            })
                        }
                    }>
                        <div className='select-file-button'>Select File</div>
                    </FilePicker>
                </div>
            </div>
            <div className='upload-button'>Upload</div>
        </div>
    )
}

export default UploadAsset