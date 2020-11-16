import React from 'react';
import './ListBird.scss';

function ListBird(props) {
    return (
        <ul className="bird-list">
            {props.curentPageBirds.map(name => {
                return <li onClick={() => props.itemSelected(name.id)}
                    key={name.id}
                    className={`bird-list__item ${props.checklist[name.id]}`}>
                    <span className='li-btn'></span>
                    {name.nameRus}
                </li>
            })}
        </ul>
    );

}

export default ListBird;