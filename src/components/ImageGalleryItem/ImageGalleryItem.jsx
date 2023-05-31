// import PropTypes from 'prop-types';
import {ListImg, Img} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ url, tags, onClick }) {
  return (
    <>
      <ListImg >
        <Img src={url} alt={tags} onClick={() => onClick(url)} />
      </ListImg>
    </>
  );
}

// ImageGalleryItem.propTypes = {
//   url: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
// };