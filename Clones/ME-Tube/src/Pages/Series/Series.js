import axios from "axios"
import { useEffect, useState } from "react"
import SingleContent from "../../components/SingleContent/SingleContent";
import CoustomPanigation from "../../components/Panigation/CoustomPanigation";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([])
  const genreforURL = useGenre(selectedGenres)

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results)
    setNumOfPages(data.total_pages < 500 ? data.total_pages : 500)
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
      <span className='pageTitle'>Discover Series</span>
      <Genres 
        type="tv" 
        selectedGenres={selectedGenres} 
        setSelectedGenres={setSelectedGenres} 
        genres={genres} 
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content && content.map((c) => 
          <SingleContent 
            key={c.id} 
            id={c.id} 
            poster={c.poster_path} 
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date}
            media_type="tv"
            vote_average={c.vote_average} 
          />
        )}
      </div>
      {numOfPages > 1 && (
        <CoustomPanigation setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Series