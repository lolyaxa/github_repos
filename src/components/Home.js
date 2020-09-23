import React, { useState, useEffect } from 'react';
import './Home.css';
import { Paginator } from './Paginator';
import { SearchBar } from './SearchBar';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState();
  const [activePage, setActivePage] = useState(1);
  const isLoading = response === undefined;
  useEffect(
    () => {
      async function f() {
        let url = 'https://api.github.com/search/repositories?q=';
        if (inputValue==='') {
          url += 'created:%3E2000-01-01&sort=stars&order=desc';
        } else {
          url += inputValue
        }
        try {
          let responses = await fetch(url);
          let commits = await responses.json();
          setResponse(commits.items);
        } catch (e) {
            return <div className='Error'>ОПА! ВАША МАТЬ ШЛЮХА</div>
        }
      }
      f();
    },
  [inputValue]);
  
  if(!isLoading) {
    const repList = [];
    let reposArr = response.slice(((activePage -1) * 10), (activePage * 10 - 1))
    for (let i in reposArr) {
      repList.push(
        <div className='ReposButtons'>
          <li><NavLink to={`/${reposArr[i].id}`}>{reposArr[i].name}</NavLink></li>
          <div className='ReposStars'>Рейтинг: {reposArr[i].stargazers_count}</div>
          <div className='ReposUpdate'>{reposArr[i].updated_at}</div>
          <a target="_blank" href={reposArr[i].html_url}>Ссылка на Github</a>     
        </div>)
    }
        return (
          <div>
            <SearchBar
              searchFilterOnChange={(e) =>
              {
                setInputValue(e.target.value)
              }}
              value={inputValue}
              onSearchClick={() =>
              console.log('[eq')}
            />

              <div>{repList}</div>

              <Paginator
                total={response.length}
                perPage={10}
                activePage={activePage}
                onSelect={(pageNumber) => {
                  setActivePage(pageNumber);
                }}
              />
          </div>
        );
  } else {
    return <div>Загрузка...</div>;
  }
}

export default Home;
