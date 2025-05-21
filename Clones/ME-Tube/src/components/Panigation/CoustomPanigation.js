import { Pagination, createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CoustomPanigation = ({ setPage, numOfPages = 500 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0)  
  };

  return (
    <div
      style={{
        width:"100%",
        display:"flex",
        justifyContent: "center",
        marginTop: 10,
      }} 
    >
      <ThemeProvider theme={darkTheme} >
        <Pagination 
          count={numOfPages} 
          onChange={(e) => handlePageChange(e.target.textContent)} 
          hideNextButton
          hidePrevButton
          color='primary'
        />
      </ThemeProvider>
    </div>
  )
}

export default CoustomPanigation