import { useState } from 'react';
import API from '../api';

function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setAuth(true);
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
    <div className='flex flex-col items-center m-20 p-20 justify-center bg-gray-300  gap-5 w-[400px] h-[400px] rounded-3xl  border-2 border-gray-400'>
      <input className='p-1 rounded-sm w-full border-2 border-gray-400 outline-none' placeholder="Enter your Email" onChange={e => setEmail(e.target.value)} />
      <input className='p-1 rounded-sm w-full border-2 border-gray-400 outline-none' placeholder="Enter your Password" type="password" onChange={e => setPassword(e.target.value)} />
       <button className="bg-slate-700 p-2 rounded-lg text-white font-semibold" onClick={login}>Login</button>
    </div>
    </div>
  );
}

export default Login;

