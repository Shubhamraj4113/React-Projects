import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from "axios"
import { img_500, unavailable } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from './Carousel/Carousel';
import './ContentModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "90%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 2,
  color: "white",
  padding: "1px 1px 3px 0px",
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = React.useState()
  const [video, setVideo] = React.useState()

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="ContentModal">
                <img 
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                  style={{ padding: "3%" }}
                  src={
                    content.poster_path ? 
                    `${img_500}/${content.poster_path}` :
                    unavailable
                  }
                />
                <img 
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                  style={{ padding: "3%" }}
                  src={
                    content.poster_path ? 
                    `${img_500}/${content.backdrop_path}` :
                    unavailable
                  }
                />
                <div className='ContentModal__about'>
                  <span className='ContentModal__title'>
                    {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">
                      {content.tagline}
                    </i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    style={{ marginBottom: "10px" }}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
