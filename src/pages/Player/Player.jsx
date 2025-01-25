import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  const [apiData, setapiData] = useState({
    name:"",
    key: "",
    published_at: "",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODg2MjFlMmE2MmU1NTk2ODNmNDY4YjliNDJkNWMxYyIsIm5iZiI6MTczNzAyNjUyMC45NDMsInN1YiI6IjY3ODhlYmQ4OTQ3YjE5Zjc4Yjk3ODIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qFUu1gi3dzcwojjsDdt6dj2-SL_4d4ms28sZQN5P9e0'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setapiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  
  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={() => {navigate(-2) }}/>
      <iframe width='90%' height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name }</p>
        <p>{ apiData.type}</p>
      </div>
    </div>
  )
}

export default Player 
