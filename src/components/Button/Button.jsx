import { Button } from './Button.styled';
const LoadMore = ({ text, handleLoadMore }) => {
  return (
    <>
      <Button type="button" onClick={() => handleLoadMore()}>
        {text}
      </Button>
    </>
  );
};
export default LoadMore;
