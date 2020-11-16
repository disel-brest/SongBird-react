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
                {props.apiBird.map( (item, index)=> {
                    return <li key={item.page} className={index===props.page?'active': ''}>{item.type}</li> 
                })}
            </ul>
        </header>
    );
}

export default Header;