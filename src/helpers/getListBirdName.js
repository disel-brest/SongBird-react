import {apiBird} from '../API/apiBird';

//in APP
function getListBirdName(page){
    const curentPage = apiBird.find( item => item.page === page);
    if(curentPage){
      return curentPage.list.map( bird => bird.nameEng)
    }
    return [] //чтоб ошибки не было
}

export default getListBirdName;