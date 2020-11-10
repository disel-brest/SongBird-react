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
      score: 0,             //очки(прибавляются сразу)
      step: 0,              //шаг (очки определяются)
      gameEnd: false,       //конец игры
      select: false,        //был вариант
      winRound: false,      //выигран 1 раунд
      checklist: ['', '', '', '', '', ''],  //состояния классов списка птичек
      birdsFotoPage: [],        //массив foto ответ сервера для текущего page
      birdsNamePage: [],         //массив с именами птиц nameEng для текущего page
      birdsAudioPage: []         //массив со звуком птиц  для текущего page
    }
  }

  callSound(file){
    const sound = document.getElementById('audio');
    sound.setAttribute('src', file);
    sound.play();
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
        step: 0,
        birdsNamePage: this.helperGetListBirdName(this.state.page +1),
        birdsAudioPage: this.helperGetListBirdPhoto(this.state.page +1)
      });
  
      this.randomNumber();
      this.requestsServerPhoto3(this.helperGetListBirdName(this.state.page +1));

    }
  }

  itemSelected(id) {
    this.setState({
      select: true,
      id: id
    })

    if(!this.state.winRound){   //если не угадана птичка

      const newCheckList = [...this.state.checklist];             

      if(this.state.random===id){                                  //если угадана и без класса
        newCheckList[id]='success';                                 //добавляем класс
        this.callSound('https://birds-quiz.netlify.app/static/media/win.a1e9e8b6.mp3');
        this.setState({
          winRound: true,
          checklist: newCheckList,
          score: this.state.score + (5 - this.state.step)
        })
  
      } else {
        this.callSound('https://birds-quiz.netlify.app/static/media/error.165166d5.mp3');
        if(this.state.checklist[id]==='') {                         //если не угадана и без класса
          newCheckList[id]='error';                                  //добавляем класс
          this.setState({
            step: this.state.step + 1,
            checklist: newCheckList
          })
        }
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

    this.setState({
      birdsNamePage: this.helperGetListBirdName(this.state.page),
      birdsAudioPage: this.helperGetListBirdPhoto(this.state.page)
    })

    this.requestsServerPhoto3(this.helperGetListBirdName(this.state.page))
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
      birdsNamePage: this.helperGetListBirdName(0),
      birdsAudioPage: this.helperGetListBirdPhoto(0)
    });
    this.randomNumber();
    this.requestsServerPhoto3(this.helperGetListBirdName(0));
  }

  // requestOnePhoto() {
  //   fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`, {     //fetch  импортировать не надо
  //     method: 'GET'
  //   })
  //     .then(otvetservera => otvetservera.json())    // метод json() внутри себя преобр. данные(объект respons) что-то типа data.JSON.parse и возвращаем promis с объектом
  //     .then(dannieservera => {
  //       console.log(dannieservera);
  //       console.log(dannieservera.photos.photo[0].url_m);
  //       // this.photoBird = `${dannieservera.photos.photo[5].url_m}`
  //       //this.props.propsFetchFilms(dannieservera.response)    //.then(users)        получили массив 
  //     })
  //     .catch((error) => console.log(error));
  // }

  // requestsServerPhoto() {
  //   const request = [
  //     fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`),
  //     fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`),
  //     fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`),
  //     ()=>fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`),
  //     ()=>fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`),
  //     ()=>fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Diomedea exulans`),
  //   ]

  //   Promise.all(request)
  //     .then(otvetservera => otvetservera)
  //     .then(dannieservera => {
  //       console.log(dannieservera);
  //     })
  //     .catch((error) => console.log(error));
    
  // }

  // requestsServerPhoto2() {
  //   let urls = [
  //     `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Corvus corax`,
  //     `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Corvus corax`,
  //     `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=Delichon urbicum`
  //   ]

  //   let requests = urls.map(url => fetch(url));

  //   Promise.all(requests)
  //     .then(otvetservera => Promise.all(otvetservera.map(r=> r.json())))
  //     .then(dannieservera => {
  //       let list = dannieservera.map(bird=> bird.photos.photo[0].url_m);
  //       this.setState({
  //         birdsFotoPage: list
  //       })
  //       console.log(dannieservera.map(bird=> bird.photos.photo[0].url_m));
  //     })
  //     .catch((error) => console.log(error));
    
  // }

  requestsServerPhoto3(massive) {
    
    const requests = massive.map( birdName => fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tag_mode=all&extras=url_m&format=json&nojsoncallback=1&tags=${birdName}`));

    Promise.all(requests)
      .then(otvetservera => Promise.all(otvetservera.map(r=> r.json())))
      .then(dannieservera => {
        let list = dannieservera.map(bird=> bird.photos.photo[0].url_m);
        this.setState({
          birdsFotoPage: list
        })
        console.log(dannieservera.map(bird=> bird.photos.photo[0].url_m));
      })
      .catch((error) => console.log(error));
    
  }

  helperGetListBirdName(page){
    const curentPage = apiBird.find( item => item.page === page);
    if(curentPage){
      return curentPage.list.map( bird => bird.nameEng)
    }
    return [] //чтоб ошибки не было
  }

  helperGetListBirdPhoto(page){
    const curentPage = apiBird.find( item => item.page === page);
    if(curentPage){
      return curentPage.list.map( bird => bird.audio)
    }
    return [] //чтоб ошибки не было
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
          <RandomBird randomBirdName={this.state.birdsNamePage[this.state.random]} 
                      randomBirdFoto={this.state.birdsFotoPage[this.state.random]}
                      randomBirdAudio={this.state.birdsAudioPage[this.state.random]}
                      winRound={this.state.winRound}/>
          <section className="guess-bird">
            <ListBird page={this.state.page} 
                      apiBird={apiBird}    
                      itemSelected={this.itemSelected.bind(this)}
                      checklist={this.state.checklist}/>
            <InfoBird select={this.state.select} 
                      id={this.state.id} 
                      page={this.state.page} 
                      apiBird={apiBird}
                      fotoBird={this.state.birdsFotoPage[this.state.id]}
                      audioBird={this.state.birdsAudioPage[this.state.id]}/>
                      
          </section>
          {/* <button onClick={this.nextRound} className='btn'>Next level</button> */}
          <button disabled={!this.state.winRound}                             //доступность кнопки
                  onClick={this.nextRound.bind(this)} 
                  className={!this.state.winRound?'btn':'btn next-level'}>    {/*подсветка кнопки*/}
                  Next level
          </button>
          <audio id='audio' scr=''></audio>     {/*для звуков, невидимый потомучто без controls*/}
        </>}

      </div>
    );
  }
}

export default App;