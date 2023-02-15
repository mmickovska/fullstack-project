import axios from "axios";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import * as strings from "../pages/templates.json";
import "../style/Categories.css";

export const Brunch = () => {
    const {card_body} = strings;
    const bkgImgUrl = 'https://www.nourishedlife.co.uk/media/qm4js31t/pizza-beer-1200x628-facebook-1200x628.jpg?width=500&height=261.6666666666667';

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
                if(res.data.rs[i].category === 'brunch') {
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
                <div className="all-categories-title brunch-title">
                    <h1>Brunch</h1>
                </div>
                <div className="all-categories-content">
                    {category.map(c => (
                        <Card 
                            title={c.title}
                            imageUrl={bkgImgUrl}
                            body={card_body}
                            courseType={c.category}
                            stars={c.stars}
                            persons={c.num_of_people}
                            time={c.preparation_time}
                        />
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
};