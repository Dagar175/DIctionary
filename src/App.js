import React,{useEffect, useState}from 'react'
import{BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import Bookmarks from './components/Bookmarks';
import Definition from './components/Definition';
import Home from './components/Home';

 const App = () => {


  const [bookmark ,setBookmark] = useState(JSON.parse(localStorage.getItem('bookmarks')) || {});

  useEffect(() => { 
     
    localStorage.setItem('bookmarks' , JSON.stringify(bookmark))

  }, [bookmark])



  const addBookmark = (word, definitions) => setBookmark(oldBookmarks => ({...oldBookmarks,
      [word]:definitions
    }))
  
    const removeBookmark = word => setBookmark(oldBookmarks => {
     
      const temp = {...oldBookmarks};

      delete temp[word];
      return temp;

      
    })



  return (
    <Router>
      <Routes>
      <Route path="/"
              element={<Home />}>
       </Route>
      </Routes>

      <Routes>
      <Route path="/bookmarks"
              element={<Bookmarks bookmark={bookmark}/>}>
       </Route>
      </Routes>

      <Routes>
      <Route path="/search/:word"
              element={<Definition bookmark={bookmark} addBookmark={addBookmark} removeBookmark={removeBookmark} />}>
       </Route>
      </Routes>

    </Router>
  )
}

export default App;