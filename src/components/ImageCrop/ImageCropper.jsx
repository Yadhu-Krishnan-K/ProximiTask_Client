import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

function ImageCropper({image, onCropDone, onCropCancel}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState(null)
  const aspectRatio = 1

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels)
  }

  return (
    <div className='fixed inset-0 z-50 bg-black'>
      <div className='relative w-full h-full'>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
         <div className="absolute bottom-4 w-full flex justify-around">
          <button
            type='button'
            className="bg-white text-black px-4 py-2 rounded"
            onClick={() => onCropDone(croppedArea)}
          >
            Crop
          </button>
          <button
            type='button'
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCropCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper