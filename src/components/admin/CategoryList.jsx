import React, { useState } from 'react';

function CategoryList() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets' },
    { id: 2, name: 'Clothing', description: 'Apparel and accessories' },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  const addCategory = () => {
    if (newCategory.name.trim() === '') return;
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setNewCategory({ name: '', description: '' });
  };

  const updateCategory = () => {
    if (!editingCategory || editingCategory.name.trim() === '') return;
    setCategories(categories.map(cat => cat.id === editingCategory.id ? editingCategory : cat));
    setEditingCategory(null);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
        <input
          type="text"
          placeholder="Category Name"
          className="border p-2 mr-2"
          value={editingCategory ? editingCategory.name : newCategory.name}
          onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, name: e.target.value}) : setNewCategory({...newCategory, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2"
          value={editingCategory ? editingCategory.description : newCategory.description}
          onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, description: e.target.value}) : setNewCategory({...newCategory, description: e.target.value})}
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
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.description}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditingCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;