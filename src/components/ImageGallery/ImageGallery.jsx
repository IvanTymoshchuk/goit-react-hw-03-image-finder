import { Component } from 'react';
import PropTypes from 'prop-types';
import { WrapGallery } from './ImageGallery.styled';
import getImages from '../../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { notifyOptions } from 'notifyOption/notify';

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.handleLoadMore();
    }
    if (prevProps.page !== this.props.page && this.props.page > 1) {
      this.fetchLoadMore();
    }
  }

  handleLoadMore = () => {
    const { inputValue, page } = this.props;

    getImages(inputValue, page)
      .then(response => {
        this.setState({
          images: response.hits,
          status: 'resolve',
        });
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  fetchLoadMore = () => {
    const { inputValue, page } = this.props;

    getImages(inputValue, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolve',
        }));
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  render() {
    const { images, status } = this.state;
    const { onClick, loadMoreBtn } = this.props;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolve') {
      return (
        <>
          <WrapGallery>
            {images.map(({ id, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={largeImageURL}
                tags={tags}
                onClick={onClick}
              />
            ))}
          </WrapGallery>
          {images.length !== 0 ? (
            <Button onClick={loadMoreBtn} />
          ) : (
            toast.warning('Oops... there are no images matching your search...', notifyOptions)
          )}
        </>
      );
    }
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
  };
}
