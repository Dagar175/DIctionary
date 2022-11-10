import React, { useState } from 'react'
import {  Typography, FilledInput, IconButton, Button, Box } from '@material-ui/core'
import { Search as searchIcon, Bookmark } from '@material-ui/icons'
import myimg from '../Assets/Books.png'
import { useNavigate } from 'react-router-dom'




const Home = () => {
  const [word, setWord] = useState("")

  function getWord(val) {
    setWord(val.target.value);
  }

  const navigate = useNavigate()

  const handleBookmark = () => {
    let path1 = `/bookmarks`
    navigate(path1);
  }


  const handleSubmit = () => {
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(' ').length > 1) return 1;
    let path = `/search/${word}`
    navigate(path);
    setWord("");
  }
  return (

    <div style={{ marginLeft:'auto',
      marginRight: 'auto',
      display: 'table' }}>

      <div >
         <div>
        <Box >   <img src={myimg} /> </Box>
        <div> <Typography variant='h6' style={{fontWeight:'700',fontFamily:'sans-serif'}}> Finding Meaning and Bookmark for Quick Reference </Typography></div>
        <div style={{ marginLeft: '10%', marginTop: '3%' }}>
          <form onSubmit={handleSubmit}>
            <input type="text"
              onChange={getWord}


              placeholder='Search Word'
              style={{
                border: 'none', width: '50%', height: '40px',
                borderRadius: '4px'
              }} />
            <Button style={{ height: '40px' }} variant="outlined" onClick={handleSubmit}>Search</Button>
          </form>
        </div>

        <div style={{ marginLeft: '34%', marginTop: '2%' }}> <IconButton onClick={handleBookmark} style={{ backgroundColor: 'maroon', borderRadius: '4px', color: 'whitesmoke' }}>  <Bookmark /> </IconButton></div>





       </div>
      </div>

    </div>
  )
}

export default Home;