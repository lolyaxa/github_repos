import './RepositoryPage.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, useParams } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

function RepositoryPage() {
  let { id } = useParams();
  const [response, setResponse] = useState();
  const isLoading = response === undefined;
  useEffect(
    () => {
      async function f() {
        const responses = await fetch(
          `https://api.github.com/repositories/${id}`, )
        let commits = await responses.json();
        setResponse(commits);
      }
      f();
    },
  []);
  console.log(response);

  if (!isLoading) {
    return (
      <div>
        <li><NavLink to={`/`}>Вернуться на главную</NavLink></li>
        <div className='Background'>
          <div>{response.name}</div>
          <div>Рейтинг: {response.stargazers_count}</div>
          <div>Последнее обновление: {response.updated_at}</div>
          <img src={response.avatar_url}></img>
          <a target="_blank" href={response.owner.html_url}>{response.owner.login}</a>
          <div>Языки: {response.language}</div>
        </div>
      </div>
    )
  } else {
    return <div>Загрузка...</div>;
  }
}

export default RepositoryPage;