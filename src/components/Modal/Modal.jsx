import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // слухач для кнопок
  componentDidMount() {
    window.addEventListener('keydown', this.handleClickEsc);
  }
  // чистимо за собою після закриття модалки
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClickEsc);
  }

  handleClickEsc = e => {
    // перевірка клавіші Escape
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  // закриття модалки по кліку на бекдроп
  handleClickBackdrop = e => {
    // перевірка чи клік був на бекдроп
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalDiv>{children}</ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
