import axios from "axios"
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css'
import CoustomPanigation from "../../components/Panigation/CoustomPanigation";

const Trending = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    // console.log(data.results);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page])
  

  return (  
    <div>
      <span className='pageTitle'>Trending</span>
      <div className="trending">
        {content && content.map((c) => 
          <SingleContent 
            key={c.id} 
            id={c.id} 
            poster={c.poster_path} 
            title={c.title || c.name} 
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average} 
          />
        )}
      </div>
      <CoustomPanigation setPage={setPage} numOfPages={numOfPages} />
    </div>
  )
}

export default Trending