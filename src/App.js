import React, { Component } from 'react';
import './App.scss';

import ListBird from './components/ListBird/ListBird';
import Header from './components/Header';
import InfoBird from './components/InfoBird/InfoBird';
import RandomBird from './components/RandomBird/RandomBird';
import EndGame from './components/EndGame';

import getListBirdName from './helpers/getListBirdName';
import getRandomNumber from './helpers/getRandomNumber';

import {apiBird} from './API/apiBird';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,                //id птички которую выбираю из списка
      random: 0,            //рандомное число равное id
      page: 0,              //страница   
      score: 0,             //очки(прибавляются сразу)
      step: 0,              //шаг (очки определяются)
      gameEnd: false,       //конец игры
      select: false,        //был вариант
      winRound: false,      //выигран 1 раунд
      checklist: ['', '', '', '', '', ''],  //состояния классов списка птичек
      birdsFotoPage: [],        //массив foto ответ сервера для текущего page
      birdsNamePage: [],         //массив с именами птиц nameEng для текущего page (нужно для запр на сервер)
    }
  }

  componentDidMount() {
    this.setState({
      random: getRandomNumber(),
      birdsNamePage: getListBirdName(this.state.page),
    })

    this.requestsServerPhoto(getListBirdName(this.state.page))
  }

  callSound(file){         //звук ответа передается в тэг audio(невидимый)
    const sound = document.getElementById('audio');
    sound.setAttribute('src', file);
    sound.play();         
  }

  itemSelected(id) {

    if(!this.state.winRound){   

      const newCheckList = [...this.state.checklist];             

      if(this.state.random===id){                                  //если угадана
        newCheckList[id]='success';                                
        this.callSound('https://birds-quiz.netlify.app/static/media/win.a1e9e8b6.mp3');
        this.setState({
          winRound: true,
          checklist: newCheckList,
          score: this.state.score + (5 - this.state.step)
        })
  
      } else {
        this.callSound('https://birds-quiz.netlify.app/static/media/error.165166d5.mp3');
        if(this.state.checklist[id]==='') {                         //если не угадана
          newCheckList[id]='error';                                  
          this.setState({
            step: this.state.step + 1,
            checklist: newCheckList
          })
        }
      }
    }

    this.setState({
      select: true,
      id: id
    })
  }

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
        step: 0,
        birdsNamePage: getListBirdName(this.state.page +1),    
        random: getRandomNumber()
      });
  
      this.requestsServerPhoto(getListBirdName(this.state.page +1)); 
    }
  }

  resetState(){        
    this.setState({
      id: 0,                
      page: 0,              
      score: 0,            
      step: 0,          
      gameEnd: false,       
      select: false,     
      winRound: false,   
      checklist: ['', '', '', '', '', ''],
      birdsFotoPage: [],
      birdsNamePage: getListBirdName(0),
      random: getRandomNumber()
    });
    
    this.requestsServerPhoto(getListBirdName(0));
  }

  requestsServerPhoto(birdNames) {
    
    const requests = birdNames.map( birdName => fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=${birdName}`));

    Promise.all(requests)
      .then(response => Promise.all(response.map(item=> item.json())))
      .then(data => {
        let list = data.map(bird=> bird.photos.photo[0].url_m);
        this.setState({
          birdsFotoPage: list
        })
        console.log(data.map(bird=> bird.photos.photo[0].url_m));
      })
      .catch((error) => console.log(error));
    
  }

  render() {

    const randomBird = apiBird[this.state.page].list[this.state.random];
    const curentPageBirds = apiBird[this.state.page].list;
    const selectedBird = apiBird[this.state.page].list[this.state.id];

    return (
      <div className='wrapper'>
        <Header page={this.state.page} 
                score={this.state.score} 
                apiBird={apiBird}/>

        {this.state.gameEnd? <EndGame score={this.state.score}      
                                      resetState={this.resetState.bind(this)}/> :                
        <>
          <RandomBird randomBird={randomBird}
                      randomBirdFoto={this.state.birdsFotoPage[this.state.random]}
                      winRound={this.state.winRound}/>
          <section className="guess-bird">
            <ListBird curentPageBirds={curentPageBirds}
                      itemSelected={this.itemSelected.bind(this)}
                      checklist={this.state.checklist}/>
            <InfoBird select={this.state.select} 
                      selectedBird={selectedBird}
                      fotoBird={this.state.birdsFotoPage[this.state.id]}/>
          </section>
          <button disabled={!this.state.winRound}                             //доступность кнопки
                  onClick={this.nextRound.bind(this)} 
                  className={!this.state.winRound?'btn':'btn next-level'}>    
                  Next level
          </button>
          <audio id='audio' scr=''></audio>     {/*для звуков, невидимый потомучто без controls*/}
        </>}

      </div>
    );
  }
}

export default App;