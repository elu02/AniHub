import { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = 'https://anihub-a9g4.onrender.com/'

const AnimeView = ({ anime, setAnime, history, userid }) => {
    const [ added, setAdded ] = useState(false)
    useEffect(() => {
        if (!anime) {
            const curAnime = localStorage.getItem('anime')
            if (curAnime) {
                setAnime(JSON.parse(curAnime))
            }
        }
    }, [])
    
    useEffect(() => {
        if (anime) localStorage.setItem("anime", JSON.stringify(anime))
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
                    <div>
                        <img className="av-image" src={anime ? anime.images.jpg.image_url : "Loading"} alt="anime cover"></img>
                    </div>
                    <div className="av-rating">
                        ⭐ Score: {anime ? anime.score : "Loading"}/10 
                    </div>
                    <div className="av-episodes">
                        🎥 Episodes: {anime ? anime.episodes : "Loading"}
                    </div>
                    <div className="av-airing">
                        ✈️ Status: {anime ? anime.status : "Loading"}
                    </div>
                    <div className="av-rated">
                        🌚 Rated: {anime ? anime.rating : "Loading"}
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
                        {anime ? anime.title : ""}
                    </div>
                    <div className="av-synopsis">
                        <b>Synopsis: </b>
                        {anime ? anime.synopsis : ""}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default AnimeView