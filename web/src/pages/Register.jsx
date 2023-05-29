import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import * as strings from '../pages/templates.json';
import '../style/Register.css';

export const Register = () => {
    const {register_page_paragraph} = strings;
    const {date_pattern} = strings;

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const shouldDisableSubmit = (!password || !repeatPassword) || 
    (password !== repeatPassword);

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:10002/api/v1/auth/create-account', {
            first_name : firstName,
            last_name : lastName, 
            email : email,
            birthday : birthday,
            password : password,
            password2 : repeatPassword
        })
        .then(() => {
            navigate('/login');
        })
        .catch(err => {
            console.error(err);
        })           
    }; 

    return (
        <>
        <Header />
        <div className='register-body'>
            <div className='register-wrapper'>
                <div className='register-title'>
                    <h1>Create Account</h1>
                </div>
                <div className='register-content'>
                    <div className='register-left-content'>
                        <h1>
                            <span style={{color: '#F0972A'}}>Create your </span>
                            <span style={{color: '#626262'}}>account</span>
                        </h1>
                        <p>{register_page_paragraph}</p>
                    </div>
                    <div className='register-right-content'>
                        <div className='left-column'>
                            <label htmlFor="">First Name</label>
                            <br />
                            <input 
                                type="text" 
                                placeholder='John' 
                                onChange={e => setFirstName(e.target.value)} 
                                value={firstName} 
                                required
                            />
                            <br />
                            <label htmlFor="">Email</label>
                            <br />
                            <input 
                                type="email" 
                                placeholder='john@smith.com' 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                required
                            />
                            <br />
                            <label htmlFor="">Password</label>
                            <br />
                            <input 
                                type="password" 
                                placeholder='********' 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                required
                            />
                            <br />
                            <button 
                                className='register-button' 
                                onClick={handleSubmit} 
                                disabled={shouldDisableSubmit}>
                                CREATE ACCOUNT
                            </button>
                        </div>
                        <div className='right-column'>
                            <label htmlFor="">Last Name</label>
                            <br />
                            <input 
                                type="text" 
                                placeholder='Smith' 
                                onChange={e => setLastName(e.target.value)} 
                                value={lastName} 
                                required
                            />
                            <br />
                            <label htmlFor="">Birthday</label>
                            <br />
                            <input 
                                type="date" 
                                max='2023-01-01' 
                                pattern={date_pattern} 
                                className='input-date'
                                onChange={e => setBirthday(e.target.value)}
                                value={birthday} 
                                required 
                            />
                            <br />
                            <label htmlFor="">Repeat Password</label>
                            <br />
                            <input 
                                type="password" 
                                placeholder='********' 
                                onChange={e => setRepeatPassword(e.target.value)} 
                                value={repeatPassword}
                                required 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
};