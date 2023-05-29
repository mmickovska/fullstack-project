import axios from 'axios';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as strings from '../pages/templates.json';
import '../style/Login.css';

export const Login = () => {
    const {login_page_paragraph} = strings;

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        axios
          .post('http://127.0.0.1:10002/api/v1/auth/login', {
            email: email,
            password: password,
          })
          .then((res) => {
            localStorage.setItem('jwt', res.data.token);
            alert(`User log in OK! Token: ${res.data.token}`);
            console.log(`User log in OK! Token: ${res.data.token}`);
            navigate('/my-profile');
          })
          .catch((err) => {
            console.error(err);
            alert('User credentials not OK!');
          });
      };
      

    return (
        <>
        <Header />
        <div className='login-body'>
            <div className='login-wrapper'>
                <div className='login-title'>
                    <h1>Log In</h1>
                </div>
                <div className='login-content'>
                    <div className='login-left-content'>
                        <h1>
                            <span style={{color: "#F0972A"}}>Welcome to </span>
                            <span style={{color: "#626262"}}>Baby's</span>
                        </h1>
                        <p>{login_page_paragraph}</p>
                    </div>
                    <div className='login-right-content'>
                        <label htmlFor="">Email</label>
                        <br />
                        <input 
                            type="email" 
                            name="email" 
                            className='email-input' 
                            placeholder='user@domain.com' 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            required
                        />
                        <br />
                        <label htmlFor="">Password</label>
                        <br />
                        <input 
                            type="password" 
                            name="password" 
                            className='password-input' 
                            placeholder='********' 
                            onChange={e => setPassword(e.target.value)}
                            value={password} 
                            required
                        />
                        <br />
                        <button className='login-button' onClick={handleSubmit}>
                            LOG IN
                        </button>
                    </div>
                </div> 
            </div>
        </div>
        <Footer />
        </>
    )
};