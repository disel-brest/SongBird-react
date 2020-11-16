import React from 'react';
import './RandomBird.scss';

function RandomBird(props) {
    return (
        <section className="random-bird">
            <div className="bird">
                <div className='bird__main'>
                    <div className='bird__foto'>
                        {props.winRound?
                        <img src={props.randomBirdFoto} alt="" />
                        :
                        <img src={require(`../../assets/images/random-bird.jpg`)} alt="" />}
                    </div>
                    <div className='bird__details'>
                    {props.winRound? 
                    <div className='bird__title'><h3>{props.randomBird.nameRus}</h3></div>
                    :
                    <div className='bird__title'><h3>*******</h3></div>} 
                        <div className='bird__audio'>
                            <audio src={props.randomBird.audio} controls></audio>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RandomBird;