import axios from 'axios';
import { Link } from 'react-router-dom';
import trashBtn from '../pics/icon_trashcan.svg';
import '../style/MyRecipes.css';

export const RecipeLinkCard = ({title, category, date, id, num}) => {
    let rcpId = id;

    const removeRecipeHandler = () => {
        const token = localStorage.getItem('jwt');
        axios.delete(`http://127.0.0.1:10003/api/v1/auth/recipes/${rcpId}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",  
                "Authorization": token ? `Bearer ${token}` : ""
            }
        })
        .then(() => {
            alert('Recipe has been deleted!');
            document.getElementsByClassName('item-list')[num].remove();
            console.log(`Successfully deleted the recipe ${num}!`);
        })
        .catch(err => {
            console.error(err);
        });
    };

    return (
        <div className='item-list'>
            <Link to={'/my-recipes/' + rcpId} className='card-link'>
                <div className='recipe-links-rectangle'>
                    <span className='recipe-name recipe-item'>{title}</span>
                    <span className='category recipe-item'>{category}</span> 
                    <span className='created-on recipe-item'>{date}</span>
                </div>
            </Link>
            <img 
                src={trashBtn} 
                alt="trashcan-btn" 
                className='trashcan-btn recipe-item' 
                onClick={removeRecipeHandler}/>
        </div>
    )
};