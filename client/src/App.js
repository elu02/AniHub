import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.js'
import Searchbox from './components/searchBox.js'
import Results from './components/results.js'
import AnimeView from './components/animeView.js'
import Login from './components/login.js'
import About from './components/about.js'
import MyList from './components/myList.js'

const App = () => {
  const history = useHistory()
  const [ currentSearch, setCurrentSearch ] = useState("")
  const [ animeList, setAnimeList ] = useState([])
  const [ anime, setAnime ] = useState(null)
  const [ userid, setUserid ] = useState(-1)

  useEffect(() => {
    const id = localStorage.getItem('userID')
    if (id !== "undefined") {
      setUserid(JSON.parse(id))
    }
  })

  useEffect(() => {
    document.title = "Anihub"
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Searchbox currentSearch={currentSearch} setCurrentSearch={setCurrentSearch} 
              animeList={animeList} setAnimeList={setAnimeList} history={history}/>
          </Route>
          <Route exact path="/results">
            <Results animeList={animeList} currentSearch={currentSearch} setAnime={setAnime} history={history}/>
          </Route>
          <Route exact path="/anime-view">
            <AnimeView anime={anime} setAnime={setAnime} history={history} userid={userid}/>
          </Route>
          <Route exact path="/my-list">
            <MyList userid={userid} history={history}/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login userid={userid} setUserid={setUserid} tab="login"/>
          </Route>
          <Route exact path="/register">
            <Login userid={userid} setUserid={setUserid} tab="register"/>
          </Route>
          <Route exact path="/logout">
            <Login userid={userid} setUserid={setUserid} tab="logout"/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
