import React from 'react';
import './Header.scss';

function Header() {
    return (
        <header>
            <div className="header__top">
                <h1>Song<span>Bird</span></h1>
                <div className="header__score">Score: 1</div>
            </div>
            <ul className="header__pagination">
                <li className='active'>Разминка</li>
                <li>Воробьиные</li>
                <li>Лесные птицы</li>
                <li>Певчие птицы</li>
                <li className='active'>Хищные птицы</li>
                <li>Морские птицы</li>
            </ul>
        </header>
    );
}

export default Header;