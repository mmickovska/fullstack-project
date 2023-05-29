import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../style/Main.css";

export const Main = () => {
    const [freshRecipes, setFreshRecipes] = useState([]);
    const [popularRecipes, setPopularRecipes] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        axios.get('http://127.0.0.1:10003/api/v1/auth/recipes', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": token ? `Bearer ${token}` : "" 
            }
        })
        .then(res => {
            setFreshRecipes(res.data.fn);
            setPopularRecipes(res.data.mpr);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <>
        <Header />
        <div className="main-body">
            <div className="main-wrapper">
                <div className="main-fresh-and-new-title">
                    <h1>Fresh & New</h1>
                </div>
                <div className="main-fresh-and-new-content">
                    {freshRecipes.map((recipe, index) => {
                        const imagePaths = recipe?.recipe_image?.split("\\");
                        return (
                            <React.Fragment key={`fresh-and-new-recipe-${index}`}>
                                <Card
                                    title={recipe.title}
                                    imageUrl={imagePaths?.length && `/images/${imagePaths[imagePaths.length-1]}`}
                                    shortDesc={recipe.description}
                                    longDesc={recipe.full_recipe}
                                    courseType={recipe.category}
                                    stars={recipe.stars}
                                    persons={recipe.num_of_people}
                                    time={recipe.preparation_time}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="main-most-popular-recipes-title">
                    <h1>Most Popular Recipes</h1>
                </div>
                <div className="main-most-popular-recipes-content">
                    {popularRecipes.map((recipe, index) => {
                        const imagePaths = recipe?.recipe_image?.split("\\");
                        return (
                            <React.Fragment key={`most-popular-recipe-${index}`}>
                                <Card
                                    title={recipe.title}
                                    imageUrl={imagePaths?.length && `/images/${imagePaths[imagePaths.length-1]}`}
                                    shortDesc={recipe.description}
                                    longDesc={recipe.full_recipe}
                                    courseType={recipe.category}
                                    stars={recipe.stars}
                                    persons={recipe.num_of_people}
                                    time={recipe.preparation_time}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div> 
        </div>
        <Footer />
        </>        
    )
};