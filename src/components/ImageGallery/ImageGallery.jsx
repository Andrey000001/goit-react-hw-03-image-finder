import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Cards } from './ImageGallery.styled';

const ImageGallery = ({ data, getLargeImg }) => {
  return (
    <>
      <Cards>
        <ImageGalleryItem data={data} getLargeImg={getLargeImg} />
      </Cards>
    </>
  );
};

export default ImageGallery;
