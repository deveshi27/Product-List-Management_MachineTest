import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link, useNavigate } from 'react-router-dom';

function ProductList({ isAuth }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>

      <div className='flex flex-wrap  bg-gray-200 h-[500px] rounded-3xl  justify-evenly mt-10 ml-10 mr-10 items-center border-solid border-2 border-gray-500'>
        {products.map(product => (
          <div key={product._id} className='flex flex-col justify-center  font-medium text-gray-600 w-[200px] h-[400px] gap-3 bg-transparent p-10 rounded-2xl border-solid border-2 border-gray-400'>
            <h3 className='text-xl text-gray-700'>{product.name}</h3>
            <p className='italic'>{product.category}</p>
            <p>Price: ₹{product.price}</p>
            {product.image && <img src={`http://localhost:5000/uploads/${product.image}`} alt='' width="100" />}
            
            {isAuth && (
              <>
                <button className="bg-slate-700 p-2  rounded-lg text-white " onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
                <button className="bg-slate-700 p-2 rounded-lg text-white " onClick={() => handleDelete(product._id)}>Delete</button>
              </>
            )}

          </div>

        ))}

      </div>
      <div className='flex  flex-col items-end p-4'>

        {isAuth && <Link className="bg-slate-600 text-white px-4 py-2 m-10 rounded-full hover:bg-slate-700" to="/create">Create Product</Link>}
      </div>
    </div>
  );
}
export default ProductList;
