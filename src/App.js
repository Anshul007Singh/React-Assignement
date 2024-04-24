import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Pagination from './components/Pagination';
import './App.css'

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage,itemsPerPage,searchTerm]);

  const fetchData = async (page) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}&q=${searchTerm}`);
      setData(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(Math.ceil(totalCount / 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    
  };

  const onKeyPressHandler = (e) => {
    console.log('event')
    if (e.key === 'Enter') {
      fetchData(currentPage);
    }
  }
  
  const handleUserCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count >= 1 && count <= 10) {
      setItemsPerPage(count);
    }
  }

  const handleDataInput = (e) => {
    if (e.key === 'Enter') {
      handleUserCountChange(e);
    }
  }

  return (
    <div className='container'>
      <h1>Table of Content</h1>
      <input
        type="text"
        id='searchInput'
        placeholder="Search title, email"
        value={searchTerm}
        onChange={handleSearch}
        onKeyPress={onKeyPressHandler}

      />
      {isLoading ? <div className="spinner"></div> : <Table data={data} />}
      
      <div>
        <label>Number of Users to display (1-10):</label>
        <input
          id="userInput"
          type="number"
          min="1"
          max="10"
          value={itemsPerPage}
          onChange={handleUserCountChange}
         onKeyPress={handleDataInput}
        />
      </div>
      {data.length > 0 ? <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> : <div>No data available to show</div>
        }
      
    </div>
  );
};

export default App;
