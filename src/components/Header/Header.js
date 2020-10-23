import React from 'react';
import './Header.scss';

function Header(props) {
    return (
        <header>
            <div className="header__top">
                <h1>Song<span>Bird</span></h1>
                <div className="header__score">Score: {props.score}</div>
            </div>
            <ul className="header__pagination">
                {/* <li className='active'>Разминка</li>
                <li>Воробьиные</li>
                <li>Лесные птицы</li>
                <li>Певчие птицы</li>
                <li>Хищные птицы</li>
                <li>Морские птицы</li> */}
                {props.apiBird.map( (item, index)=> {
                    return index!==props.page ? <li key={item.page}>{item.type}</li> : <li key={item.page} className='active'>{item.type}</li>;
                })}
            </ul>
        </header>
    );
}

export default Header;