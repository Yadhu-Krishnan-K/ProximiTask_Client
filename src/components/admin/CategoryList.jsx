import React, { useEffect, useState, useRef } from 'react';
import instance from '../../helper/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgCropper from '../../helper/ImageCropper';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [original, setOriginal] = useState('');
  const [image, setImage] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [cropped, setCropped] = useState(false);
  const [originalFile, setOriginalFile] = useState(null); // Store original image file
  const [croppedFile, setCroppedFile] = useState(null); // Store cropped image file

  let ref = useRef(null);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    instance.get('/category')
      .then((res) => {
        setCategories(res.data.cateList);
      })
      .catch(error => handleError('Error fetching categories:', error));
  };

  const addCategory = () => {
    if (newCategory.name.trim() === '') return;
    console.log('origianl ==== ', originalFile, ' cropped = ====',croppedFile)
    const formData = new FormData();
    formData.append('categoryName', newCategory.name);
    if (originalFile) formData.append('originalImage', originalFile);
    if (croppedFile) formData.append('croppedImage', croppedFile);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    instance.post('/category', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.data.success) {
          getCategory();
          setNewCategory({ name: '' });
          setOriginal('');
          setImage('');
          setCropped(false)
          setOriginalFile(null);
          setCroppedFile(null);
        }
      })
      .catch(error => handleError('Error adding category:', error));
  };

  const updateCategory = () => {
    if (!editingCategory || editingCategory.categoryName.trim() === '') return;

    const formData = new FormData();
    formData.append('cateName', editingCategory.categoryName);
    if (originalFile) formData.append('originalImage', originalFile);
    if (croppedFile) formData.append('croppedImage', croppedFile);

    // console.log('formData ====================',formData)

    instance.put(`/category/${editingCategory._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.data.success) {
          getCategory();
          setEditingCategory(null);
          setOriginal('');
          setImage('');
          setOriginalFile(null);
          setCroppedFile(null);
        }
      })
      .catch(error => handleError('Error updating category:', error));
  };

  const deleteCategory = (id) => {
    if (window.confirm("Do you really want to delete this category?")) {
      instance.delete(`/category/${id}`)
        .then(response => {
          if (response.data.success) {
            getCategory();
          }
        })
        .catch(error => handleError('Error deleting category:', error));
    }
  };

  const handleError = (message, error) => {
    console.error(message, error);
    toast.error(`${message} ${error.response ? error.response.data.message : error.message}`);
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const fileType = (file.type.split('/')[1]).toLowerCase();
    const typeExpected = ['png', 'jpg', 'jpeg'];

    if (typeExpected.includes(fileType)) {
      setOriginal(fileUrl);
      setImage(fileUrl);
      setOriginalFile(file); // Store the original file
      setCropped(false);
    } else {
      console.log('Rejected file type');
    }
  };

  return (
    <>
      {(!cropped && image.length) && (
        <ImgCropper
          imageURL={image}
          setImage={setImage}
          setCropped={setCropped}
          setCroppedFile={setCroppedFile}
        />
      )}
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
              onClick={() => setEditingCategory(null)}
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
                    onClick={() => setEditingCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Toast container to show toast messages */}
        <ToastContainer />
      </div>
    </>
  );
}

export default CategoryList;
