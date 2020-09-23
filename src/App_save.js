/* import React, { useState, useEffect } from 'react';
import './App.css';
import { Paginator } from './components/Paginator';
import { SearchBar } from './components/SearchBar';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const RepoPage = () => {
  return (
    <div>
      <h2>сука</h2>
    </div>
  )
};

function App() {
  const [response, setResponse] = useState();
  const [activePage, setActivePage] = useState(1);
  const isLoading = response === undefined;
  useEffect(
    () => {
      async function f() {
        let url = 'https://api.github.com/search/repositories?q=created:%3E2000-01-01&sort=stars&order=desc';
        let responses = await fetch(url);
        let commits = await responses.json();
        setResponse(commits.items);
      }
      f();
    },
  []);
  
  if(!isLoading) {
    const repList = [];
    let reposArr = response.slice(((activePage -1) * 10), (activePage * 10 - 1))
    for (let i in reposArr) {
      repList.push(<div className='ReposButtons'>
        <BrowserRouter history={history}>
          <li><NavLink to={`/${reposArr[i].name}`}>{reposArr[i].name}</NavLink></li>
          <Route exact path={`/${reposArr[i].name}`} component={RepoPage}/>
          <div className='ReposStars'>{reposArr[i].stargazers_count}</div>
          <div className='ReposUpdate'>{reposArr[i].updated_at}</div>
          <div className='ReposUrl'>{reposArr[i].html_url}</div>  
        </BrowserRouter>      
        </div>)
    }
        return (
          <div>

            <SearchBar/>

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

export default App;
*/