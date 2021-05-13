import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const handleClick = (setAnime, anime, history) => {
    setAnime(anime)
    history.push('/anime-view')
}

const AnimeCard = ({ animeList, index, setAnime, history }) => {
    if (index >= animeList.length) {
        return <Card className="anime-card"></Card>
    }
    const anime = animeList[index]
    return (<Card tag="a" onClick={() => handleClick(setAnime, anime, history)} style={{ cursor: "pointer" }} className="anime-card">
                <Card.Img variant="top" src={anime.image_url}></Card.Img>
                <Card.Body>
                    <Card.Title>{anime.title.length > 40 ? anime.title.slice(0, 37) + '...'
                                                            : anime.title}</Card.Title>
                    <Card.Text>
                        {anime.synopsis.length > 140 ? anime.synopsis.slice(0, 137) + "..."
                                                        : anime.synopsis}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Rating: {anime.score}/10 ⭐
                </Card.Footer>
            </Card>)
}

const Results = ({ animeList, currentSearch, setAnime, history }) => {
    if (currentSearch.length < 3) {
        history.push('/')
    }
    return (<div className="results">
        <div className="cards-container">
            <h2 className="resultsFor">Search results for "{currentSearch}"...</h2>
            <CardDeck className="anime-row">
                <AnimeCard animeList={animeList} index={0} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={1} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={2} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={3} setAnime={setAnime} history={history}/>
            </CardDeck>
            <CardDeck className="anime-row">
                <AnimeCard animeList={animeList} index={4} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={5} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={6} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={7} setAnime={setAnime} history={history}/>
            </CardDeck>
            <CardDeck className="anime-row">
                <AnimeCard animeList={animeList} index={8} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={9} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={10} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={11} setAnime={setAnime} history={history}/>
            </CardDeck>
            <CardDeck className="anime-row">
                <AnimeCard animeList={animeList} index={12} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={13} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={14} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={15} setAnime={setAnime} history={history}/>
            </CardDeck>
            <CardDeck className="anime-row">
                <AnimeCard animeList={animeList} index={16} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={17} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={18} setAnime={setAnime} history={history}/>
                <AnimeCard animeList={animeList} index={19} setAnime={setAnime} history={history}/>
            </CardDeck>
        </div>
    </div>)
}

export default Results