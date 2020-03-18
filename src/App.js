import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {parseUrl, parseElapsedTime, hideItem} from './helpers';
import Pagination from './components/Pagination';

function App() {
  const [topStoriesIds, setTopStoriesIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);   
  const [firstPageItem, setFirstPageItem] = useState(0);
  
  const itemsPerPage = 30;

  const endpoint = 'https://hacker-news.firebaseio.com/v0/';
  const itemAPI = `${endpoint}item/`;

  useEffect(() => {
    const fetchTopStoriesIds = async () => {
      const topStories = 'topstories.json';
      const result = await axios(
        `${endpoint}${topStories}`,
      );
        
      setTopStoriesIds(result.data);
    };

    fetchTopStoriesIds();
  },[]);

  useEffect(() => {
    const _stories = topStoriesIds.slice(firstPageItem,firstPageItem + itemsPerPage).map((story, index) => {
      return axios(`${itemAPI}${story}.json`)
        .then(res => {
          const storyItem = {...res.data, positionInList: firstPageItem + index + 1};
          return storyItem
        })
        .catch(e => console.error(e))});

      Promise.all(_stories).then(res => setStories(res));
  },[topStoriesIds, itemAPI, firstPageItem]);

  function requestComments(comments = []){
    const _comments = comments.map(comment => {
      return axios(`${itemAPI}${comment}.json`)
        .then(res => res.data).catch(e => console.error(e))
    });

    Promise.all(_comments).then(res => setSelectedComments(res))
  }


  return (
    <main>
     {stories.map( ({id, title, url, score, by: author, time, descendants: commentCount, kids: comments, positionInList}, key) => {
       return (
        <div key={key}>
          <section>
            <h1>{positionInList} {title} {url && <span>(<a href={url}>{parseUrl(url)}</a>)</span>}</h1>
             <h4>{score} points by {author} {parseElapsedTime(time)} | <span onClick={() => hideItem(id, stories, setStories)}>hide</span> | <span onClick={()=> requestComments(comments)}>{commentCount} comments</span></h4>
          </section>
          <section>
            {selectedComments.length > 0 && selectedComments.map(({by: author, text, time}, key) => (
              <article key={key}>
                <h1>{author} || {parseElapsedTime(time)}</h1>
                <p>{text}</p>
              </article>
            ))}
          </section>
        </div>
       )
     })}
      {stories.length > 0 && 
      <Pagination 
        totalItems={topStoriesIds.length} 
        firstItemIndex={firstPageItem} 
        setFirstItemIndex={setFirstPageItem}
        itemsPerPage={itemsPerPage}
      />}
    </main>
  );
}
export default App;
