import React, { Component } from 'react';
import './ListBird.scss';

class ListBird extends Component {

    render(){
        return (
            <ul className="bird-list">
    
                {this.props.apiBird.map( item => {
                    return item.page!==this.props.page ? null: item.list.map( name => {
                        return <li onClick={()=> this.props.itemSelected(name.id)} 
                                   key={name.id} 
                                   className={`bird-list__item ${this.props.checklist[name.id]}`}>
                            <span className='li-btn'></span>
                            {name.nameRus}
                        </li>
                    })
                })}
    
                {/* <li className='bird-list__item'>
                        <span className='li-btn'></span>Воробей
                    </li> */}
            </ul>
        );
    }
}

export default ListBird;