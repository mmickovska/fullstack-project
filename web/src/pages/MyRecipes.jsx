import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RecipeLinkCard } from '../components/RecipeLinkCard';
import { HeaderTwo } from '../components/HeaderTwo';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import plusBtn from '../pics/icon_plus_white.svg';
import '../style/MyRecipes.css';

export const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        axios.get('http://127.0.0.1:10003/api/v1/auth/recipes/me', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",  
                "Authorization": token ? `Bearer ${token}` : ""
            }
        })
        .then(res => {
            console.log(res.data.mr);
            setMyRecipes(res.data.mr);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    return (
        <>
        <HeaderTwo />
        <div className='my-recipes-body'>
            <div className='my-recipes-wrapper'>
                <div className='my-recipes-title'>
                    <h1>My Recipes</h1>
                    <Link to='/my-recipes/create'>
                        <img src={plusBtn} alt="plus-btn" className='plus-btn'/>
                    </Link>
                </div>
                <div className='my-recipes-content'>
                    <div className='recipe-labels'>
                        <label htmlFor="recipe-name" className='recipe-name-label'>
                            Recipe Name
                        </label>
                        <label htmlFor="category" className='category-label'>
                            Category
                        </label>
                        <label htmlFor="created-on" className='created-on-label'>
                            Created On
                        </label>
                        <label htmlFor="trashcan-btn" className='delete-label'>
                            Delete
                        </label>
                    </div>
                    {myRecipes.map((recipe, index) => (
                        <React.Fragment key={`my-recipes-${index}`}>
                            <RecipeLinkCard 
                                title={recipe.title}
                                category={recipe.category}
                                date={recipe.published_on}
                                id={recipe._id}
                                num={index}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
};