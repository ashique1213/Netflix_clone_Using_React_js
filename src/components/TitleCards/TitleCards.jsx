import React, { useEffect ,useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {  

  const [apiData,setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };
  
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  }

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category])
  
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-container">
        <button className="scroll-btn left" onClick={scrollLeft}>{'<'}</button>
        <div className='card-list' ref={cardsRef}>
          {apiData.map((card) => {
            return <Link to={`/player/${card.id}`} className='card' key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.original_title} />
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>{'>'}</button>
      </div>
    </div>
  )
}

export default TitleCards
