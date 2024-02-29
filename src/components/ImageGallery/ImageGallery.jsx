import { Component } from 'react';
import FetchApi from 'components/Service/ServiceApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import LoadMore from 'components/Button/Button';
import { toast } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import { Cards } from './ImageGallery.styled';
class ImageGallery extends Component {
  state = {
    data: [],
    url: '',
    status: 'idle',
    showModal: false,
    page: 1,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { nameSearch } = this.props;
    const { page } = this.state;
    const prevName = prevProps.nameSearch;

    try {
      if (nameSearch !== prevName || prevState.page !== page) {
        this.setState({ status: 'pending' });
        const data = await FetchApi(nameSearch, page);
        if (nameSearch !== prevName && data.total) {
          this.setState({
            page: 1,
            data,
            status: 'resolve',
          });
          toast.success(`
        Found according to your request ${data.total}`);
        } else if (nameSearch === '') {
          console.log(nameSearch);
          this.setState({ data: [], status: 'reject', error: true });
          toast.info("You haven't entered anything!");
        } else {
          this.setState({ data: [], status: 'reject', error: true });
          toast.info('Unfortunately, your search returned no results 😐');
        }
      }
    } catch (error) {
      this.setState({ status: 'reject', error });
      console.log(error.message);
    }
  }
  getLargeImg = url => {
    this.setState({ url, showModal: true });
  };

  handleLoadMore = async () => {
    const { nameSearch } = this.props;
    const { page } = this.state;
    try {
      this.setState(prevState => ({
        page: prevState.page + 1,
        status: 'pending',
      }));
      const newData = await FetchApi(nameSearch, page + 1);
      this.setState(prevState => ({
        status: 'resolve',
        data: {
          ...prevState.data,
          hits: [...prevState.data.hits, ...newData.hits],
        },
      }));
    } catch (error) {
      this.setState({ status: 'reject' });
      console.log(error.message);
    }
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { data, url, showModal, status, error } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'reject') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolve') {
      return (
        <div>
          <Cards>
            {data.hits && (
              <ImageGalleryItem
                hits={data.hits}
                getLargeImg={this.getLargeImg}
              />
            )}
          </Cards>
          <LoadMore text="LoadMore..." handleLoadMore={this.handleLoadMore} />
          {showModal && url && (
            <Modal
              url={url}
              closeModal={this.onCloseModal}
              showModal={showModal}
            />
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
