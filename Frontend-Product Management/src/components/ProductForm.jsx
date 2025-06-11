import  { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true,
    image: null
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/products/${id}`).then(res => {
        const { name, price, category, inStock, image } = res.data;
        setProduct({ name, price, category, inStock, image }); // prefill without file
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in product) {
      if (key === 'image') {
        if (product.image instanceof File) {
          formData.append('image', product.image);
        }
      } else {
        formData.append(key, product[key]);
      }
    }

    try {
      if (id) {
        await API.put(`/products/${id}`, formData);
      } else {
        await API.post('/products', formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product.');
    }
  };

  return (
    <div className='flex justify-center items-center'>
    <form className="flex flex-col justify-center w-[500px] h-[500px] rounded-2xl border-2 border-gray-500 items-center gap-4 m-20 bg-gray-300"onSubmit={handleSubmit}>
      <input 
        className='p-1 rounded-sm w-[300px] border-2 border-gray-400 outline-none'
        name="name"
        value={product.name}
        onChange={handleChange}
        required
        placeholder="Name"
      />
      <input
        className='p-1 rounded-sm w-[300px] border-2 border-gray-400 outline-none'
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        required
        placeholder="Price"
      />
      <input
      className='p-1 rounded-sm w-[300px] border-2 border-gray-400 outline-none'
        name="category"
        value={product.category}
        onChange={handleChange}
        required
        placeholder="Category"
      />
      <label className="text-gray-700 font-medium">
        In Stock: 
        <input
         className=" m-2 w-5 h-5 accent-slate-600 cursor-pointer"
          type="checkbox"
          name="inStock"
          checked={product.inStock}
          onChange={handleChange}
        />
      </label>
      <input className="text-gray-700 font-medium " type="file" name="image" onChange={handleImage} />
      <button className="bg-slate-700 p-2 rounded-lg text-white font-semibold" type="submit">{id ? 'Update' : 'Create'} Product</button>
    </form>
    </div>
  );
}

export default ProductForm;
