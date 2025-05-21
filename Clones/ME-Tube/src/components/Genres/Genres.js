import { Chip, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Genres = ({
  type, 
  selectedGenres,
  setSelectedGenres, 
  genres,
  setGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  
  

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
    
    // eslint-disable-next-line
  }, []);

  console.log(genres.id)

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres && selectedGenres.map((genre) => (
        <Chip 
          label={genre.name}
          style={{ margin: 2 }}
          size="small"
          color="primary"
          key={genre.id}
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres && genres.map((genre) => (
        <ThemeProvider theme={darkTheme} >
          <Chip 
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            color=""
            key={genre.id}
            clickable
            onClick={() => handleAdd(genre)}
          />
        </ThemeProvider>
      ))}
    </div>
  )
}

export default Genres