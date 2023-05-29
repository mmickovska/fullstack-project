import axios from 'axios';
import { useState } from 'react';
import { HeaderTwo } from '../components/HeaderTwo';
import { Footer } from '../components/Footer';
import '../style/MyProfile.css';

export const MyProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const shouldDisableSubmit = (!password || !repeatPassword) || (password !== repeatPassword);

    const refreshPage = () => {
        window.location.reload();
    };

    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('birthday', birthday);
        formData.append('password', password);
        formData.append('password2', repeatPassword);
        
        axios.put('http://127.0.0.1:10002/api/v1/auth/update-user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert("User info successfully updated!");
            refreshPage();
        })
        .catch(err => {
            alert("Error! Couldn't update user info!");
            console.error(err);
        })
    };

    return (
        <>
        <HeaderTwo />
        <div className='my-profile-body'>
            <div className='my-profile-wrapper'>
                <div className='my-profile-title'>
                    <h1>My Profile</h1>
                </div>
                <div className='my-profile-content'>
                    <div className='my-profile-left-content'>
                        <img src="https://st.depositphotos.com/1052233/2885/v/600/depositphotos_28850541-stock-illustration-male-default-profile-picture.jpg" alt="avatar-pic"/>
                        <br />
                        <input type='file' accept='image/*' onChange={handleAvatarChange} />
                        <br />
                        <button className='avatar-pic-btn'>CHANGE AVATAR</button>
                    </div>
                    <div className='my-profile-right-content'>
                        <div className='left-column'>
                            <label htmlFor="">First Name</label>
                            <br />
                            <input type="text" placeholder='John' onChange={e => setFirstName(e.target.value)} value={firstName} required/>
                            <br />
                            <label htmlFor="">Email</label>
                            <br />
                            <input type="email" placeholder='john@smith.com' onChange={e => setEmail(e.target.value)} value={email} required/>
                            <br />
                            <label htmlFor="">Password</label>
                            <br />
                            <input type="password" placeholder='********' onChange={e => setPassword(e.target.value)} value={password} required/>
                            <br />
                            <button className='save-button' onClick={handleSubmit} disabled={shouldDisableSubmit}>SAVE</button>
                        </div>
                        <div className='right-column'>
                            <label htmlFor="">Last Name</label>
                            <br />
                            <input type="text" placeholder='Smith' onChange={e => setLastName(e.target.value)} value={lastName} required/>
                            <br />
                            <label htmlFor="">Birthday</label>

                            <br />
                            <input 
                                type="date" 
                                max='2023-01-01' 
                                required 
                                pattern="(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})" 
                                className='input-date'
                                onChange={e => setBirthday(e.target.value)}
                                value={birthday}
                            />
                            <br />
                            <label htmlFor="">Repeat Password</label>
                            <br />
                            <input type="password" placeholder='********' onChange={e => setRepeatPassword(e.target.value)} value={repeatPassword} required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
};