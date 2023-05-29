import closeBtn from '../pics/icon_close.svg';
import timeClock from '../pics/icon_time.svg';
import plate from '../pics/icon_plate.svg';
import star from '../pics/icon_star.svg';
import '../style/RecipeModal.css';

export const RecipeModal = ({setShow, recipeImage, title, category, time, persons, stars, shortBody, longBody}) => {

    const closedModal = () => {
        setShow(false);
    };

    return (
        <>
        <div className="modal">
            <div 
                onClick={closedModal}
                className="overlay"></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button 
                        onClick={closedModal}
                        className='close-btn'>
                        <img src={closeBtn} alt='close' />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="left-body">
                        <img 
                            src={recipeImage} alt="recipe-img" 
                            className="modal-bkg-pic"/>
                        <div
                            className="left-body-title">
                            <h3>Best Served For</h3>
                            <span>{category}</span>
                        </div>
                        <div
                            className="left-body-text">
                            <p>{shortBody}</p>
                        </div>
                        <div
                            className="left-body-facilities">
                            <img src={timeClock} alt="clock" className="clock-img-modal"/>
                            <span>{time} min</span>
                            <img src={plate} alt="plate" className="plate-img-modal"/>
                            <span>{persons} persons</span>
                            <img src={star} alt="stars" className="star-img-modal"/>
                            <span>{stars}</span>
                        </div>
                    </div>
                    <div className="right-body">
                        <h3>Recipe Details</h3>
                        <div>
                            <p>{longBody}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>      
    )
};