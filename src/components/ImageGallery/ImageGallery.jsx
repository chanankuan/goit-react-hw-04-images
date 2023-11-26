import styles from './ImageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={styles.Gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
