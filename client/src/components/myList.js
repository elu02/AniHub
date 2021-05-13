import { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3001'

const Elements = ({ watchList }) => {
    if(watchList.length === 0) {
        return <div>You have no anime on your plan-to-watch list</div>;
    }
    return watchList.map((a) => {
        return <li key={a.id}>{a.anime}</li>
    })
}
const MyList = ({ userid }) => {
    const [ watchList, setWatchList ] = useState([])

    useEffect(() => {
        axios.post(`${baseURL}/get-list`, { "user": userid })
            .then((response) => {
                setWatchList(response.data)
            })
            .catch((er) => {
                console.log(er)
            })
    }, [userid])
    
    return (<div className="my-list">
        <h2>Plan-to-watch List:</h2>
        <ol>
            <Elements watchList={watchList} />
        </ol>
    </div>)
}

export default MyList