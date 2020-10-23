import React from 'react';
import './EndGame.scss';

function EndGame(props) {
    return (
        <section className='end-game'>
            <h1>Поздравляем!</h1>
            <p>Вы прошли викторину и набрали <span>{props.score}</span> из <span>30</span> возможных баллов</p>
            <hr></hr>
            {props.score === 30?
                <div className='end-game__img'>
                    <img src={require(`../../assets/images/win.jpg`)} alt="" />
                </div>
            :
            <button onClick={()=> props.resetState()} className='btn'>Попробовать еще раз!</button>}
        </section>
    );
}

export default EndGame;