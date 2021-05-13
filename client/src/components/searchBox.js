import React from 'react'
import 'react-router-dom'

const Searchbox = ({ currentSearch, setCurrentSearch, history }) => {
  const gotoResults = (e) => {
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