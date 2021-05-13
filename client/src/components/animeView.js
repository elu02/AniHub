import { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3001'

const AnimeView = ({ anime, setAnime, history, userid }) => {
    const [ added, setAdded ] = useState(false)
    
    useEffect(() => {
        axios.get(`https://api.jikan.moe/v3/anime/${anime.mal_id}`)
            .then((response) => {
                setAnime(response.data)
            })
            .catch(() => {
                console.log("error finding anime with id: ")
                
            })
    }, [ anime.id, anime.mal_id, setAnime ])

    useEffect(() => {
        if (anime.title !== undefined) return;
        const curAnime = localStorage.getItem('anime')
        if (curAnime) {
            setAnime(JSON.parse(curAnime))
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem("anime", JSON.stringify(anime))
    })

    const addToList = () => {
        if (userid === -1) {
            history.push('/login')
        } else {
            axios.post(`${baseURL}/add`, {
                "user": userid,
                "anime": anime.title
            }).then((res) => {
                if (res.status === 200) {
                    setAdded(true)
                }
            })
        }
    }

    return (<div className="anime-view">
        <div className="flex-container">
            <div className="row">
                <div className="col1">
                    <div >
                        <img className="av-image" src={anime.image_url} alt="anime cover"></img>
                    </div>
                    <div className="av-rating">
                        ⭐ Score: {anime.score}/10 
                    </div>
                    <div className="av-episodes">
                        🎥 Episodes: {anime.episodes}
                    </div>
                    <div className="av-airing">
                        ✈️ Status: {anime.status}
                    </div>
                    <div className="av-rated">
                        🌚 Rated: {anime.rating}
                    </div>
                    <button className="back-button" onClick={(() => { history.push('/results')} )}>
                        Go Back
                    </button>
                    <button className="add-to-list" onClick={addToList}>
                        {added ? "Added!" : "Add to List"}
                    </button>
                </div>
                <div className="col2">
                    <div className="av-title">
                        {anime.title}
                    </div>
                    <div className="av-synopsis">
                        <b>Synopsis: </b>
                        {anime.synopsis}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default AnimeView