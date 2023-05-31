import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWrap, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClickEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClickEsc);
  }

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleClickEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalWrap>
          <Img src={this.props.url} alt="" />
        </ModalWrap>
      </Overlay>,
      modalRoot
    );
  }
}
