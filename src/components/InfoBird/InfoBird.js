import React from 'react';
import './InfoBird.scss';

function InfoBird(props) {
    return (
        <div className="bird-info">
            {props.select===false?
            <>
                Послушайте плеер.<br></br>
                Выберите птицу из списка
            </>
            :
            <div className="bird">
                <div className='bird__main'>
                    <div className='bird__foto'>
                        <img src={props.fotoBird} alt="" />
                    </div>
                    <div className='bird__details'>
                        <div className='bird__title'><h4>{props.apiBird[props.page].list[props.id].nameRus}</h4></div>
                        <div className='bird__view'>{props.apiBird[props.page].list[props.id].nameEng}</div>
                        <div className='bird__audio'>
                            <audio 
                                src={props.audioBird}
                                controls>
                            </audio>
                        </div>
                    </div>
                </div>
                <div className='bird__description'>{props.apiBird[props.page].list[props.id].describe}</div>
            </div>}
        </div>
    );
}

export default InfoBird;