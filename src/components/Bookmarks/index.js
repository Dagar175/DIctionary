import React from 'react'
import {Stack, IconButton ,Typography ,Box} from '@material-ui/core'
import { ArrowBack as BackIcon }from '@material-ui/icons'
import { useNavigate ,Link } from 'react-router-dom'

const Bookmarks = ( { bookmark }) => {
const navigate = useNavigate();

  return (
   <>
   
   
   <Stack direction='row' alignItems='center'>

    <IconButton onClick={() => navigate(-1)} sx={{
     color:'black',
     mr: 1

    }}>
        <BackIcon/>
    </IconButton>

    <Typography  style={{ fontWeight:'800'} } variant="h5"> Bookmarks </Typography>

   </Stack>
   {
    Object.keys(bookmark).map (b => 

      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
       <Box  style={{ width:'60%'}}key ={b} to ={`/search/${b} `} component= {Link} sx={{
         p:2,
         cursor:'pointer',
         backgroundColor:'whitesmoke',
         borderRadius:1,
         textTransform:'capitalize',
         mb : 2,
         fontWeight:800,
         fontSize:'26px',
         display:'block',
         color:'black',
         textDecoration:'none'

       }}> 

              {b}
       </Box>
       </div>
      )
   }
   </>
  )
}

export default Bookmarks;