import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import styles from './Modal.module.scss';
import Loader from 'components/Loader/Loader';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ imageUrl, tags, onClose }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    window.addEventListener('keydown', handleClose);

    return () => window.removeEventListener('keydown', handleClose);
  });

  const handleClose = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleImageLoaded = () => {
    setImage('loaded');
  };

  const modal = {
    hidden: {
      y: '-100vh',
    },
    visible: {
      y: '0',
    },
    exit: {
      y: '100vh',
    },
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.Overlay}
      onClick={handleClose}
    >
      <motion.div
        variants={modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.Modal}
      >
        {!image && <Loader className={styles.Loader} />}
        <img
          src={imageUrl}
          alt={tags}
          loading="lazy"
          onLoad={handleImageLoaded}
        />
      </motion.div>
    </motion.div>,
    modalRoot
  );
};

export default Modal;
