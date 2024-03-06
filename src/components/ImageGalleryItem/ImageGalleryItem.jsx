import { Item, Img } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ data, getLargeImg }) => {
  return (
    <>
      {data.map(({ id, webformatURL, largeImageURL }) => (
        <Item key={id} onClick={() => getLargeImg(largeImageURL)}>
          <Img src={webformatURL} alt={id} />
        </Item>
      ))}
    </>
  );
};
