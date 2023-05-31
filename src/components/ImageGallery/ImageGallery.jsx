import { Component } from 'react';
import { WrapGallery } from './ImageGallery.styled';
import getImages from '../../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageErrorView from '../ImageErrorView/ImageErrorView';

const STATUS = {
  IDLE: 'idle',
  REJECTED: 'rejected',
  PENDING: 'pending',
  RESOLVE: 'resolve',
};

export default class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, inputValue } = this.props;
    if (prevProps.inputValue !== inputValue) {
      this.handleLoadMore();
    }
    if (prevProps.page !== page && page > 1) {
      this.fetchLoadMore();
    }
  }

  handleLoadMore = () => {
    const { inputValue, page } = this.props;

    getImages(inputValue, page)
      .then(res => {
        this.setState({
          images: res.hits,
          status: STATUS.RESOLVE,
        });
      })
      .catch(error => this.setState({ status: STATUS.REJECTED }));
  };

  fetchLoadMore = () => {
    const { inputValue, page } = this.props;

    getImages(inputValue, page)
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res.hits],
          status: STATUS.RESOLVE,
        }));
      })
      .catch(error => this.setState({ status: STATUS.REJECTED }));
  };

  render() {
    const { images, status, error } = this.state;
    const { onClick, loadMoreBtn } = this.props;

    if (status === STATUS.PENDING) {
      return <Loader />;
    }

    if (status === STATUS.REJECTED) {
      return <ImageErrorView message={error.message} />;
    }

    if (status === STATUS.RESOLVE) {
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
          {images.length === 0 ? (
            <ImageErrorView />
          ) : (
            <Button onClick={loadMoreBtn} />
          )}
        </>
      );
    }
  }
}
