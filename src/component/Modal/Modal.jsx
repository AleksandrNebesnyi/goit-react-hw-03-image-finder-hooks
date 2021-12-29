import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {Overlay, ModalStyled } from './Modal.styled'
import { useEffect } from 'react';


const modalRoot = document.querySelector('#modal-root');
console.log(modalRoot);

const Modal = ({onClose, children })=>{


  useEffect(() => {
    // console.log('add');
    window.addEventListener('keydown', handleKeyDown);

    // Убирает слушатети (unmount)
    return () => {
      // console.log('delate')
      window.removeEventListener('keydown', handleKeyDown);
    };
  });




  const  handleKeyDown = event =>{
    if (event.code === 'Escape'){
       // console.log('Нажали ESC, нужно закрыть модалку');
    
       onClose();
    }
  }


  const handleBackdropClick =event =>{
           // console.log('Кликнули в бекдроп');
           if(event.currentTarget === event.target) {
                onClose();
            }
          }
  return(
       createPortal (
            <Overlay onClick={handleBackdropClick}>
            <ModalStyled>{children}</ModalStyled>
          </Overlay>,
          modalRoot,
            )
  );
}



Modal.defaultProps = {
      children: null,
     };
    
     Modal.propTypes = {
       children: PropTypes.node,
       onClose: PropTypes.func.isRequired,
     };

export default Modal;