import { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3001'

const Elements = ({ watchList }) => {
    return watchList.map((anime) => {
        return <li>{anime}</li>
    })
}

const MyList = () => {
    const [ watchList, setWatchList ] = useState([])

    useEffect(() => {
        axios.post(`${baseURL}/get-list`)
            .then((response) => {
                console.log(response)
                setWatchList(response.data)
            })
            .catch(() => {
                console.log("error getting watch list")
            })
    }, [])
    
    return (<div className="my-list">
        <h2>Plan-to-watch List:</h2>
        <ol>
            <Elements watchList={watchList}/>
        </ol>
    </div>)
}

export default MyList