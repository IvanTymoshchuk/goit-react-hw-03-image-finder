import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    inputValue: '',
    modalImg: '',
    showModal: false,
    page: 1,
  };

  getInputValue = handleValue => {
    this.setState({ inputValue: handleValue, page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { modalImg, showModal, page } = this.state;

    return (
      <>
        <Searchbar getInputValue={this.getInputValue} />
        <ImageGallery
          inputValue={this.state.inputValue}
          onClick={this.getLargeImg}
          loadMoreBtn={this.loadMoreBtn}
          page={page}
        />
        {showModal && <Modal url={modalImg} onClose={this.toggleModal} />}
        <ToastContainer />
      </>
    );
  }
}

export default App;
