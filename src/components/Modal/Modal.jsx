import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import styles from './Modal.module.scss';
import Loader from 'components/Loader/Loader';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ imageUrl, tags, onClose }) => {
  const [isLoading, setIsLoading] = useState('');

  useEffect(() => {
    const closeOnEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEsc);

    return () => window.removeEventListener('keydown', closeOnEsc);
  });

  const handleImageLoaded = () => {
    setIsLoading('loaded');
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
      onClick={onClose}
    >
      <motion.div
        variants={modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.Modal}
      >
        {!isLoading && <Loader className={styles.Loader} />}
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
