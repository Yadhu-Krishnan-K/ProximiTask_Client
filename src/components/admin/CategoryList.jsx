import React, { useEffect, useState, useRef } from 'react';
import instance from '../../helper/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgCropper from '../../helper/ImageCropper';
import showErrorPopup from '../../Common/ShowErrorPopup';

// Custom Modal Component
const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [original, setOriginal] = useState('');
  const [image, setImage] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [cropped, setCropped] = useState(false);
  const [originalFile, setOriginalFile] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  let ref = useRef(null);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    instance.get('/category')
      .then((res) => {
        setCategories(res.data.cateList);
      })
      .catch(err=>{
        console.log('Error fetching categories: ',err)
      })
    };

  const addCategory = () => {
    if (newCategory.name.trim() === ''){
      showErrorPopup("Please enter category and image")
      return
    }
    const formData = new FormData();
    formData.append('categoryName', newCategory.name);
    if (originalFile) formData.append('originalImage', originalFile);
    if (croppedFile) formData.append('croppedImage', croppedFile);

    instance.post('/category', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.data.success) {
          getCategory();
          resetForm();
        }
      })
      .catch(error => {console.log('Error adding category:',error)});
  };

  const updateCategory = () => {
    if (!editingCategory || editingCategory.categoryName.trim() === '') return;

    const formData = new FormData();
    formData.append('cateName', editingCategory.categoryName);
    if (originalFile) formData.append('originalImage', originalFile);
    if (croppedFile) formData.append('croppedImage', croppedFile);

    instance.put(`/category/${editingCategory._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.data.success) {
          getCategory();
          resetForm();
        }
      })
      .catch(error =>{console.log("error adding category :",error)});
  };

  const deleteCategory = () => {
    if (!categoryToDelete) return;

    instance.delete(`/category/${categoryToDelete._id}`)
      .then(response => {
        if (response.data.success) {
          getCategory();
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }
      })
      .catch(error => {console.log('Error deleting category: ',error);
      });
  };

  // const handleError = (message, error) => {
  //   console.error(message, error);
  //   toast.error(`${message} ${error.response ? error.response.data.message : error.message}`);
  // };

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const fileType = (file.type.split('/')[1]).toLowerCase();
    const typeExpected = ['png', 'jpg', 'jpeg'];

    if (typeExpected.includes(fileType)) {
      setOriginal(fileUrl);
      setImage(fileUrl);
      setOriginalFile(file);
      setCropped(false);
    } else {
      console.log('Rejected file type');
    }
  };

  const resetForm = () => {
    setNewCategory({ name: '' });
    setOriginal('');
    setImage('');
    setCropped(false);
    setOriginalFile(null);
    setCroppedFile(null);
    setEditingCategory(null);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setOriginal(category.originalImgURL);
    setImage(category.croppedImgURL);
    setCropped(true);
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {(!cropped && image.length) ? (
        <ImgCropper
          imageURL={image}
          setImage={setImage}
          setCropped={setCropped}
          setCroppedFile={setCroppedFile}
        />
      ):
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
          {cropped ? (
            <img
              src={image}
              className='rounded-full cursor-pointer mb-2'
              width={80}
              onClick={() => {
                setImage(original);
                setCropped(false);
              }}
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImg}
            />
          )}
          <input
            type="text"
            placeholder="Category Name"
            className="border p-2 mr-2"
            value={editingCategory ? editingCategory.categoryName : newCategory.name}
            onChange={(e) => editingCategory ? setEditingCategory({ ...editingCategory, categoryName: e.target.value }) : setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={editingCategory ? updateCategory : addCategory}
          >
            {editingCategory ? 'Update' : 'Add'}
          </button>
          {editingCategory && (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className='px-4 py-2 text-left'>Image</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b hover:bg-gray-100">
                <td className='px-4 py-2'><img src={category.croppedImgURL} width={25} className='rounded-full' alt="img" /></td>
                <td className="px-4 py-2 text-center">{category.categoryName}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => openDeleteModal(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteCategory}
          message={`Are you sure you want to delete the category "${categoryToDelete?.categoryName}"?`}
        />

         
      </div>
}
    </>
  );
}

export default CategoryList;