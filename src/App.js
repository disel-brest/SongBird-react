import React, { Component } from 'react';
import './App.scss';
import ListBird from './components/ListBird/ListBird';
import Header from './components/Header';
import InfoBird from './components/InfoBird/InfoBird';
import RandomBird from './components/RandomBird/RandomBird';
import EndGame from './components/EndGame';

import {apiBird} from './API/apiBird';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,                //id птички которую выбираю из списка
      random: 0,            //рандомное число равное id
      page: 0,              //страница   
      score: 0,            //очки(прибавляются сразу)
      step: 0,              //шаг (очки определяются)
      gameEnd: false,       //конец игры
      select: false,        //был вариант
      winRound: false,      //выигран 1 раунд
      checklist: ['', '', '', '', '', '']  //состояния классов списка птичек
    }
  }

  // nextRound=()=>{
  // }
  nextRound() {

    if(this.state.page === 5){        

      this.setState({
        gameEnd: true
      });

    } else {

      this.setState({
        page: this.state.page + 1,
        winRound: false,
        select: false,
        checklist: ['', '', '', '', '', ''],
        step: 0
      });
  
      this.randomNumber();

    }
  }


  itemSelected(id) {
    this.setState({
      select: true,
      id: id
    })

    if(!this.state.winRound){   //если не угадана птичка

      const newCheckList = [...this.state.checklist];             

      if(this.state.random===id && this.state.checklist[id]===''){  //если угадана и без класса
        newCheckList[id]='success';                                 //добавляем класс
        this.setState({
          winRound: true,
          checklist: newCheckList,
          score: this.state.score + (5 - this.state.step)
        })
  
      } else if(this.state.checklist[id]==='') {                   //если не угадана и без класса
        newCheckList[id]='error';                                  //добавляем класс
        this.setState({
          step: this.state.step + 1,
          checklist: newCheckList
        })
      }

    }
  }

  randomNumber(){
    this.setState({
      random: Math.floor(Math.random() * Math.floor(6))
    })
  }

  componentDidMount() {
    this.randomNumber();
  }

  resetState(){
    this.setState({
      id: 0,                
      random: 0,            
      page: 0,              
      score: 0,            
      step: 0,          
      gameEnd: false,       
      select: false,     
      winRound: false,   
      checklist: ['', '', '', '', '', ''] 
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <Header page={this.state.page} 
                score={this.state.score} 
                apiBird={apiBird}/>

        {this.state.gameEnd? <EndGame score={this.state.score}      //проверка на конец игры
                                      resetState={this.resetState.bind(this)}/> :                
        <>
          <RandomBird random={this.state.random}/>
          <section className="guess-bird">
            <ListBird page={this.state.page} 
                      apiBird={apiBird} 
                      itemSelected={this.itemSelected.bind(this)}
                      checklist={this.state.checklist}/>
            <InfoBird select={this.state.select} 
                      id={this.state.id} 
                      page={this.state.page} 
                      apiBird={apiBird}/>
          </section>
          {/* <button onClick={this.nextRound} className='btn'>Next level</button> */}
          <button disabled={!this.state.winRound}                             //доступность кнопки
                  onClick={this.nextRound.bind(this)} 
                  className={!this.state.winRound?'btn':'btn next-level'}>    {/*подсветка кнопки*/}
                  Next level
          </button>
        </>}

      </div>
    );
  }
}

export default App;