import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeaderTwo } from '../components/HeaderTwo';
import { Footer } from '../components/Footer';
import returnBtn from '../pics/icon_back_white.svg';
import * as strings from '../pages/templates.json';
import '../style/CreateRecipe.css';

export const CreateRecipe = () => {
    const { short_recipe_desc } = strings;
    const { long_recipe_desc } = strings;
    const { recipe_bkg_img } = strings;

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [description, setDescription] = useState('');
    const [fullRecipe, setFullRecipe] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const shouldDisableSubmit = (
        !title ||
        !category ||
        !prepTime ||
        !numOfPeople ||
        !description ||
        !fullRecipe
    );

    const handleSubmit = () => {
        const token = localStorage.getItem('jwt');
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:10003/api/v1/auth/recipes/create',
            data: {
                title: title,
                category: category,
                preparation_time: prepTime,
                num_of_people: numOfPeople,
                description: description,
                full_recipe: fullRecipe,
                stars: 0,
                recipe_image: fileName
            },
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": token ? `Bearer ${token}` : ""
            }
        })
            .then(() => {
                alert('Your recipe has been successfully created and added to the list!');
                navigate('/my-recipes');
            })
            .catch(err => {
                console.error(err);
            })
    };

    const storeFile = async (file, fileName) => {
        let formData = new FormData();
        formData.append('photo', file, fileName);
        const token = localStorage.getItem('jwt');
        const resultUpload = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:10001/api/v1/storage',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Authorization": token ? `Bearer ${token}` : ""
          }
        })
        .then(res => {
          const imagePaths = res.data.filename.split("\\");
          const filePath = (imagePaths?.length &&
            `/images/${imagePaths[imagePaths.length - 1]}`
          );
          setFileName(res.data.filename);
          console.log(res.data.filename);
          return filePath;
        })
        .catch(err => {
          console.error(err);
        });
        console.log(resultUpload);
        return resultUpload;
      };
      

      const handleImageChange = async (e) => {
        const filePath = await storeFile(e.target.files[0], e.target.files[0].name);
        setFile(filePath);
    };

    return (
        <>
            <HeaderTwo />
            <div className='create-recipe-body'>
                <div className='create-recipe-wrapper'>
                    <div className='create-recipe-title'>
                        <h1>My Recipes</h1>
                        <Link to='/my-recipes'>
                            <img src={returnBtn} alt="return-btn" className='return-btn' />
                        </Link>
                    </div>
                    <div className='create-recipe-content'>
                        <div className='create-recipe-left-content'>
                            <label htmlFor="">Recipe Image</label>
                            <br />
                            {fileName &&
                                <img
                                    src={file}
                                    alt="recipe-img"
                                />
                            }
                            {!fileName &&
                                <img
                                    src={recipe_bkg_img}
                                    alt="recipe-img"
                                />
                            }
                            <br />
                            <input
                                name='recipe_image'
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                required
                            />
                            <label className='upload-img-btn'>
                                Upload Image
                            </label>
                        </div>
                        <div className='create-recipe-middle-content'>
                            <div className='first-row'>
                                <label htmlFor="">Recipe Title</label>
                                <br />
                                <input
                                    type="text"
                                    placeholder='Homemade Pizza'
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                    required />
                            </div>
                            <div className='second-row'>
                                <div>
                                    <label htmlFor="">Category</label>
                                    <br />
                                    <select
                                        className="recipe-category-selector"
                                        onChange={e => setCategory(e.target.value)}
                                        value={category}
                                        required>
                                        <option value="breakfast">breakfast</option>
                                        <option value="brunch">brunch</option>
                                        <option value="lunch">lunch</option>
                                        <option value="dinner">dinner</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Preparation Time</label>
                                    <br />
                                    <input
                                        type="number"
                                        placeholder='45'
                                        onChange={e => setPrepTime(e.target.value)}
                                        value={prepTime}
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="">No. People</label>
                                    <br />
                                    <input
                                        type="number"
                                        placeholder='4'
                                        onChange={e => setNumOfPeople(e.target.value)}
                                        value={numOfPeople}
                                        required />
                                </div>
                            </div>
                            <div className='third-row'>
                                <label htmlFor="">Short Description</label>
                                <br />
                                <textarea
                                    placeholder={short_recipe_desc}
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                    required>
                                </textarea>
                                <br />
                                <button
                                    className='save-button'
                                    onClick={handleSubmit}
                                    disabled={shouldDisableSubmit}>
                                    SAVE
                                </button>
                            </div>
                        </div>
                        <div className='create-recipe-right-content'>
                            <label htmlFor="">Recipe</label>
                            <br />
                            <textarea
                                type="text"
                                placeholder={long_recipe_desc}
                                onChange={e => setFullRecipe(e.target.value)}
                                value={fullRecipe}
                                required>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};