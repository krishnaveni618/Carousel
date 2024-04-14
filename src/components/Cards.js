import React, { useState, useEffect } from 'react'
import './Card.css'
import Card from './Card';
import useInfiniteScroll from '../Hooks/UseInfinite.js'
import { FaSpinner } from 'react-icons/fa';

const Cards = () => {
  const [lands, setLands] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);


  const fetchLands = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${page}&page_size=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data.results)
      setLands(data.results);
      setPage(prevPage => prevPage + 1);
      setPageSize(pre => pre + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLands();
  }, []);

  useInfiniteScroll(fetchLands)

  return (
    <>
      <div className="lands-container">
        {lands.length > 0 && <>
          {lands.map((land, index) => (
            <Card id={land.id | index} data={land} />
          ))}
        </>}
        {loading && <div><FaSpinner className='spinner' style={{color: "yellow"}}/></div>}
      </div>
    </>
  )
}

export default Cards
