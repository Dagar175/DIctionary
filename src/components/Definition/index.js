import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import {Stack,Typography,IconButton,Box,Divider,CircularProgress, Button} from '@material-ui/core'
import {ArrowBack as BackIcon, BookmarkBorder as BookmarkIcon ,Bookmark as BookmarkedIcon, PlayArrow as PlayIcon} from '@material-ui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Definition = ({

bookmark,
addBookmark,
removeBookmark

}) => {
  const {word} = useParams();
  const navigate =useNavigate();
  const [definitions , setDefinitions] = useState([])
  const [loading , setLoading] = useState(true)
  const [audio, setAudio] =useState(false)
  const [exist , setExist] = useState(true)

  const isBookmarked = Object.keys(bookmark).includes(word);

 
  useEffect(() => {
    const fetchDefiniton = async () => {
      try{
      const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      // console.log(resp.data);
      setDefinitions(resp.data);
      const phonetics = resp.data[0].phonetics
      if(!phonetics.length) return;
       const url = phonetics[0].audio.replace('//ssl' , 'http://ssl');
       setAudio(new Audio(url));
      setLoading(false);
      } catch(err){
        setExist(false);
      }
    }
         fetchDefiniton();
  }, [])

  if(!exist) return(
    <Box style={{display:'flex', alignItems:'center',justifyContent:'center',marginTop:'20%'}}> 
       <Typography style={{fontWeight:'800' , marginRight:'8px'}}> Word not Found </Typography>
          
         <Button variant="outlined" onClick={() => navigate(-1)} >Go Back</Button>
  </Box>

  )

  if(loading) return (

    <Box style={{display:'flex', alignItems:'center',justifyContent:'center',marginTop:'20%'}}> 
      <CircularProgress/>
    </Box>
  )
 

  return (
    <>
     <Stack direction="row" justifyContent="space-between">
             <IconButton onClick={() => navigate(-1)}>
                <BackIcon/>
             </IconButton>

             <IconButton onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word ,definitions)} >
              { isBookmarked ?
               <BookmarkedIcon/> : <BookmarkIcon/>}
             </IconButton>
     </Stack>
     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
     <Stack style={{backgroundColor:'lightblue', width:'60%'}} direction="row" justifyContent="space-between" sx={{
         mt:3,
         boxShadow:'0px 10px 20px rgba(19, 23, 71 ,0.25)',
         px:4,
         py:5,
         color:'black',
         borderRadius: 2,
     }}>
      <Typography style={{fontWeight:'800',textTransform:'capitalize'}}variant='h4'>{word} </Typography>
        {audio && <IconButton onClick={() => audio.play()}style={{ backgroundColor:'tomato', borderRadius:'4px', color:'whitesmoke'}}> <PlayIcon/> </IconButton>}

             
     </Stack>
     </div>
     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
     <div style={{width:'60%'}}>

     {definitions.map((def, idx)  => 
      <Fragment key={idx}>
            <Divider sx={{my:3}}/>
      {def.meanings.map(meaning => 
         <Box  key={Math.random()} sx={{
         boxShadow:'0px 10px 25px rgba(0,0,0,0.05)',
         backgroundColor:'#fff',
         p:2,
         borderRadius: 2,
         mt:3,
        

         }}>

      <Typography sx={{ textTransform:'capitalize', fontWeight:'800'}} variant="subtitle1">{meaning.partOfSpeech}</Typography>
      {meaning.definitions.map((definition ,idx) => <Typography variant='body1' color='black' key={definition.definition}> {definitions.length>1 && `${idx +1}.`} {definition.definition}</Typography>)}

         </Box>
        )}

      </Fragment>
     
     )}
    
    </div>
    </div>
    </>
  )
}

export default Definition;