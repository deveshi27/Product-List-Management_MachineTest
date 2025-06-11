import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function ProductDetail({ isAuth }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const handleDelete = async () => {
    await API.delete(`/products/${id}`);
    navigate('/');
  };

  if (!product) return <p>Loading...</p>;
return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <p>₹{product.price}</p>
      <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      {product.image && <img src={`http://localhost:5000/uploads/${product.image}`} alt='' width="200" />}
      {isAuth && (
        <>
         <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default ProductDetail;


