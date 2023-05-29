import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Overlay, ModalWrap, Img} from './Modal.styled';

export default class Modal extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };



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
    }

     handleClickEsc = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }


    render() {
        return (
            <Overlay  onClick={this.handleClickBackdrop}>
                <ModalWrap >
                    <Img src={this.props.url} alt="" />
                </ModalWrap>
            </Overlay>
        )
    }
}