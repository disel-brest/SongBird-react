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
                        <img src={require(`../../assets/images/random-bird.jpg`)} alt="" />
                    </div>
                    <div className='bird__details'>
                        <div className='bird__title'><h4>{props.apiBird[props.page].list[props.id].nameRus}</h4></div>
                        <div className='bird__view'>{props.apiBird[props.page].list[props.id].nameEng}</div>
                        <div className='bird__audio'></div>
                    </div>
                </div>
                <div className='bird__description'>Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает только звук «кур».</div>
            </div>}
        </div>
    );
}

export default InfoBird;