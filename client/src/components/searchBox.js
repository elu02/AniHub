import React from 'react'
import 'react-router-dom'
import axios from 'axios'

const maxQueries = 20

async function getAnimeSearch(currentSearch, setAnimeList) {
  if (currentSearch.length < 3) {
    setAnimeList([])
  }
  await axios.get(`https://api.jikan.moe/v4/anime?q=${currentSearch}&limit=${maxQueries}`)
    .then((response) => {
      setAnimeList(response.data.data)
    })
    .catch(() => {
      console.log("error getting search results")
    })
}

const Searchbox = ({ currentSearch, setCurrentSearch, setAnimeList, history }) => {
  const gotoResults = (e) => {
    getAnimeSearch(currentSearch, setAnimeList)
    e.preventDefault()
    history.push('/results')
  }
  return (<center>
            <form className="searchbox-form" onSubmit={gotoResults}>
              <input placeholder="Search for an anime..." className="searchbox"
                value={currentSearch} onChange={e => setCurrentSearch(e.target.value)}/>
              <button className="submit-button" type="submit">Search</button>
            </form>
          </center>)
}

  export default Searchbox