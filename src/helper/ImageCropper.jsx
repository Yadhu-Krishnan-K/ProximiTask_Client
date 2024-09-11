import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './cropImgUtil'

const ImgCropper = ({imageURL,cropInit,zoomInit,setImage,setCropped, setCroppedFile}) => {
    if(zoomInit == null){
        zoomInit = 1
    }
    if(cropInit == null){
        cropInit = {x:0, y:0}
    }
  const [crop, setCrop] = useState(cropInit)
  const [zoom, setZoom] = useState(zoomInit)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    console.log(croppedArea, croppedAreaPixels)
  }

  const onCropChange =(crop)=>{
    setCrop(crop)
  }

  const onZoomChange=(zoom)=>{
    setZoom(zoom)
  }

  async function croppedImage() {
    const imgBlob = await getCroppedImg(imageURL, croppedAreaPixels);
    console.log('image from getCroppedImg = ', imgBlob);
  
    // Convert the blob URL to a Blob object
    const response = await fetch(imgBlob);
    const blob = await response.blob();
  
    // Convert the Blob to a File object
    const file = new File([blob], 'croppedImage.jpg', { type: blob.type });
  
    // setImage(imgBlob);
    setCroppedFile(file);  // Set the cropped file as the File object
    setCropped(true);
  }
  
  return (
    <>
        <div className='w-screen bg-zinc-700 flex justify-center'>
            <Cropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
            />
        </div>
        <div
          className='fixed top-3 right-3 w-56 h-11 bg-red-100 rounded-3xl flex justify-evenly'
        >
            <button className='text-fuchsia-900 ' onClick={croppedImage}>crop</button>
            <button className='text-red-500' onClick={()=>{setImage('')}}>cancel</button>
        </div>
    </>
  )
}

export default ImgCropper