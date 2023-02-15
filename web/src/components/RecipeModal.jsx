import closeBtn from '../pics/icon_close.svg';
import timeClock from '../pics/icon_time.svg';
import plate from '../pics/icon_plate.svg';
import star from '../pics/icon_star.svg';
import '../style/RecipeModal.css';

export const RecipeModal = ({setShow, title, category,time, persons, stars}) => {
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
                            src="https://th-thumbnailer.cdn-si-edu.com/4qYJ4Q0zQlEVqDfl0j3rPVKd1i8=/400x300/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/c5/d1/c5d13e71-f316-4b68-ac23-99b6384f4792/istock-602301816.jpg" alt="" 
                            className="modal-bkg-pic"/>
                        <div
                            className="left-body-title">
                            <h3>Best Served For</h3>
                            <span>{category}</span>
                        </div>
                        <div
                            className="left-body-text">
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.</p>
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
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.</p>
                            <p>Quisque blandit mattis risus, sed tincidunt ante finibus non. Nullam sit amet nunc lorem. Mauris lectus erat, accumsan quis nisl vel, feugiat rhoncus ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In at euismod leo.</p>
                            <p> Fusce sed volutpat risus, fermentum feugiat enim. Etiam mollis ante quis nisl imperdiet, id commodo ante tincidunt.</p>
                            <p> Duis bibendum scelerisque risus nec consectetur. Vivamus est elit, mollis vel malesuada non, porta id mauris.</p>
                            <p>Quisque a vehicula lorem. Praesent in auctor quam. Etiam magna quam, sollicitudin id nunc eget, porttitor pretium tellus.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>      
    )
};