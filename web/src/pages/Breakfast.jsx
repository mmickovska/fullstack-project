import axios from "axios";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import "../style/Categories.css";

export const Breakfast = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        axios.get('http://127.0.0.1:10003/api/v1/auth/recipes/category', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": token ? `Bearer ${token}` : ""  
            }
        })
        .then(res => {
            let arr = [];
            for (let i = 0; i < res.data.rs.length; i++) {
                if(res.data.rs[i].category === 'breakfast') {
                    arr.push(res.data.rs[i]);
                }
            }
            setCategory(arr);
            console.log(res.data.rs);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <>
        <Header />
        <div className="all-categories-body">
            <div className="all-categories-wrapper">
                <div className="all-categories-title breakfast-title">
                    <h1>Breakfast</h1>
                </div>
                <div className="all-categories-content">
                    {category.map(c => {
                        const imagePaths = c?.recipe_image?.split("\\");
                        return (
                            <Card 
                                title={c.title}
                                imageUrl={imagePaths?.length && `/images/${imagePaths[imagePaths.length-1]}`}
                                shortDesc={c.description}
                                longDesc={c.full_recipe}
                                courseType={c.category}
                                stars={c.stars}
                                persons={c.num_of_people}
                                time={c.preparation_time}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
};