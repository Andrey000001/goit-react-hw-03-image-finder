import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Cards } from './ImageGallery.styled';

const ImageGallery = ({ data, getLargeImg }) => {
  return (
    <>
      {data.length > 0 && (
        <Cards>
          <ImageGalleryItem data={data} getLargeImg={getLargeImg} />
        </Cards>
      )}
    </>
  );
};

export default ImageGallery;
