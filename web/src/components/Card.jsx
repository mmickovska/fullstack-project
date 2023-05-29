import timeClock from '../pics/icon_time.svg';
import plate from '../pics/icon_plate.svg';
import star from '../pics/icon_star.svg';
import nextArrows from '../pics/icon_arrows_white.svg';
import { RecipeModal } from './RecipeModal';
import { useState } from 'react';
import * as strings from "../pages/templates.json";
import "../style/Card.css";


export const Card = ({ title, imageUrl, shortDesc, longDesc, courseType, persons, stars, time }) => {
    const { card_body } = strings;

    const [showModal, setShowModal] = useState(false);
    const [liked, setLiked] = useState(false);
    const [starsCount, setStarsCount] = useState(stars);

    const cardClick = () => {
        setShowModal(prevState => !prevState)
    };

    const handleStarClick = () => {
        if (liked) {
            setLiked(false);
            setStarsCount(starsCount - 1);
        } else {
            setLiked(true);
            setStarsCount(starsCount + 1);
        }
    }

    return (
        <>
            <div className="card-container" >
                <div className="image-container">
                    <span>{courseType}</span>
                    <img src={imageUrl} alt='cover-img' />
                </div>
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
                <div className="card-body">
                    <p>{card_body}</p>
                </div>
                <div className='card-facilities'>
                    <img src={timeClock} alt='clock' className='clock-img' />
                    <span className='time-text'>{time} min</span>
                    <img src={plate} alt='plate' className='plate-img' />
                    <span className='persons-text'>{persons} persons</span>
                    <img src={star} alt='stars' id='zvezda' className='stars-img' onClick={handleStarClick} />
                    <span className='stars-text'>{starsCount}</span>
                    <button className='next-arrows-btn' onClick={cardClick}>
                        <img src={nextArrows} alt='nextArrows' />
                    </button>
                </div>
            </div>
            {showModal && <RecipeModal
                recipeImage={imageUrl}
                title={title}
                category={courseType}
                time={time}
                persons={persons}
                stars={starsCount}
                shortBody={shortDesc}
                longBody={longDesc}
                setShow={setShowModal}
            />}
        </>
    )
};
