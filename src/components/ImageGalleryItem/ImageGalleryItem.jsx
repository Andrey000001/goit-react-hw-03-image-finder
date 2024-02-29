import { Item, Img } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ hits, getLargeImg }) => {
  return (
    <>
      {hits.map(({ id, webformatURL, largeImageURL }) => (
        <Item key={id} onClick={() => getLargeImg(largeImageURL)}>
          <Img src={webformatURL} alt={id} />
        </Item>
      ))}
    </>
  );
};
