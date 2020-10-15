import React from 'react';
import './GuessBird.scss';

function GuessBird() {
    return (
        <section className="guess-bird">
            <div className='guess-bird__main'>
                <ul className="bird-list">
                    <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li>
                    <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li>
                    <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li>
                    <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li>
                    <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li>
                    <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li>
                </ul>
                <div className="bird-info">
                     {/* <div className="bird-info">
                        Послушайте плеер.<br></br>
                        Выберите птицу из списка
                    </div> */
                    }

                    <div className="bird">
                        <div className='bird__main'>
                            <div className='bird__foto'>
                                <img src={require(`../../assets/images/random-bird.jpg`)} alt="" />
                            </div>
                            <div className='bird__details'>
                                <div className='bird__title'><h4>Журавль</h4></div>
                                <div className='bird__view'>Grus grus</div>
                                <div className='bird__audio'></div>
                            </div>
                        </div>
                        <div className='bird__description'>Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает только звук «кур».</div>
                    </div>

                </div>
            </div>
            <button className='btn'>Next level</button>
        </section>
    );
}

export default GuessBird;