import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  handleCloseModal = e => {
    const { closeModal } = this.props;
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  render() {
    const { url } = this.props;
    return createPortal(
      <Overlay onClick={this.handleCloseModal}>
        <ModalContent>
          <img src={url} alt="#" width="200" height="200" />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
