import timeClock from '../pics/icon_time.svg';
import plate from '../pics/icon_plate.svg';
import star from '../pics/icon_star.svg';
import nextArrows from '../pics/icon_arrows_white.svg';
import { RecipeModal } from './RecipeModal';
import { useState } from 'react';
import '../style/Card.css';

export const Card = ({title, imageUrl, body, courseType, persons, stars, time}) => {
    const [showModal, setShowModal] = useState(false);

    const cardClick = () => {
        setShowModal(prevState => !prevState)
    };

    return (
        <>
        <div className="card-container" onClick={cardClick}>
            <div className="image-container">
                <span>{courseType}</span>
                <img src={imageUrl} alt='coverImg' />
            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                <p>{body}</p>
            </div>
            <div className='card-facilities'>
                <img src={timeClock} alt='clock' className='clock-img'/>
                <span className='time-text'>{time} min</span>
                <img src={plate} alt='plate' className='plate-img'/>
                <span className='persons-text'>{persons} persons</span>
                <img src={star} alt='stars' className='stars-img'/>
                <span className='stars-text'>{stars}</span>
                <button className='next-arrows-btn'>
                    <img src={nextArrows} alt='nextArrows' />
                </button>
            </div>
        </div>
        {showModal && <RecipeModal
            title={title}
            category={courseType}
            time={time}
            persons={persons}
            stars={stars}
            setShow={setShowModal}
        />}
        </>
    )
};