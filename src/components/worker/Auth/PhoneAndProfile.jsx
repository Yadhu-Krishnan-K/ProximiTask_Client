import React, { useRef, useState } from 'react'
import TextInput from '../../Form/InputText'
import FileInput from '../../Form/FileInput'
import ImageCropper from '../../ImageCrop/ImageCropper'
import {useFormikContext} from 'formik'


function PhoneAndProfile() {
  const inputRef = useRef()
  const [image, setImage] = useState("")
  const [currentPage, setCurrentPage] = useState("choose-img")
  const [imageAfterCrop, setImageAfterCrop] = useState("")
  const {setFieldValue} = useFormikContext()
  
  //on image selected
  const onChooseImage = () => {
    inputRef.current.click()
    setCurrentPage("crop-img")
  }

  //on crop done
  const onCropDone = (imageCroppedArea) => {
    //canvas element to show image
    const canvasEle = document.createElement("canvas")
    canvasEle.width = imageCroppedArea.width
    canvasEle.height = imageCroppedArea.height

    const context = canvasEle.getContext("2d")

    //load the selected image
    let imageObj1 = new Image()
    imageObj1.src = image
    imageObj1.onload = function(){
      //draw the cropped part to the canvas
      context.drawImage(
        imageObj1,
        imageCroppedArea.x,
        imageCroppedArea.y,
        imageCroppedArea.width,
        imageCroppedArea.height,
        0,
        0,
        imageCroppedArea.width,
        imageCroppedArea.height
      )
      //convert canvasEle to data url (jpeg format...)
      const dataUrl = canvasEle.toDataURL('image/jpeg');
      canvasEle.toBlob((blob) => {
        if (blob) {
          // Create a File object from blob to make it more compatible with form handling
          const file = new File([blob], "profile-photo.jpg", { type: "image/jpeg" });
          setFieldValue("profilePhoto", file);
          console.log("Profile photo saved to Formik field");
        } else {
          console.error("Failed to create blob from canvas");
        }
      }, 'image/jpeg', 0.9); // Better quality JPEG
      setImageAfterCrop(dataUrl)
      setCurrentPage("img-cropped")
    }
  }

  //on crop cancel
  const onCropCancel = () => {
    setCurrentPage("choose-img")
    setImage("")
  }

  const onImageSelected = (selectedImage) => {
    setImage(selectedImage)
  }
  return (
    <>
      <h3 className='text-center text-2xl font-bold'>Phone & Profile Photo</h3>
      <TextInput 
        name="phone"
        type="number"
        placeholder="phone number"
        className="border-b-2 border-b-blue-500 placeholder-blue-400 text-blue-500 w-full focus:outline-none mt-16"
      />
      <FileInput
        name='profilePhoto'
        className='hidden'
        ref={inputRef}
        accept="image/*"
        onImageSelected={onImageSelected}
      />
      {
        currentPage=='choose-img'
          ?(<button className='button cursor-pointer' onClick={onChooseImage}>Select Image</button>)
          :(
            currentPage == 'crop-img'
            ?(
              <ImageCropper
                image={image}
                onCropDone={onCropDone}
                onCropCancel={onCropCancel}
              />
             )
            :(
              <div>
                <img src={imageAfterCrop} onClick={onChooseImage} alt="imageAfterCrop" />
              </div>
            )
          )
      }
    </>
  )
}

export default PhoneAndProfile