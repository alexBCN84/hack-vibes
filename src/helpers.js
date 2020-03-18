import axios from 'axios';

export function parseUrl(url){
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;
    return hostname.slice(0,3) === 'www' ? hostname.slice(4) : hostname;
 }

 export function parseElapsedTime(publishedUnixTime){
    const publishedDate = new Date(publishedUnixTime * 1000);
    const currentDate = Date.now();
    const elapsed =  currentDate - publishedDate;
    let seconds = Math.floor(elapsed / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    return seconds < 60 ? `less than one minute ago` : minutes < 60 ? `${minutes} minutes ago` : `${hours} hours ago`;
  }

  export function hideItem(_id, items, setItems){
    setItems(items.filter(({id}) => id !== _id))
  }