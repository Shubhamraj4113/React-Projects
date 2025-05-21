import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate])

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#2d313a",
          zIndex: 100,
        }}
      >
        <BottomNavigationAction 
          label="Trending" 
          icon={<WhatshotIcon />}
          style={ {color: "white"} } 
        />
        <BottomNavigationAction 
          label="Movies" 
          icon={<MovieIcon />}
          style={ {color: "white"} } 
        />
        <BottomNavigationAction 
          label="TV Series" 
          icon={<TvIcon />} 
          style={ {color: "white"} }
        />
        <BottomNavigationAction 
          label="Search" 
          icon={<SearchIcon />} 
          style={ {color: "white"} }
        />
      </BottomNavigation>
    </Box>
  );
}