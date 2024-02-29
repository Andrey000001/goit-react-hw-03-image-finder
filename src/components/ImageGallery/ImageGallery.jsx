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
    if (nameSearch !== prevProps.nameSearch) {
      const newData = await FetchApi(nameSearch, page);
      this.setState({ status: 'pending' });
      if (nameSearch !== prevProps.nameSearch && newData.total)
        this.setState({
          page: 1,
          data: [...newData.hits],
          status: 'resolve',
        });
      else if (nameSearch === '' && !newData.total) {
        this.setState({ status: 'idle', data: [] });
        toast.info('Вы ничего не ввели!');
      } else {
        this.setState({ status: 'reject', data: [] });
        toast(`По вашему запросу ${nameSearch} ничего не найденно`);
      }
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
      if (newData.total) {
        this.setState(prevState => ({
          status: 'resolve',
          data: [...prevState.data, ...newData.hits],
        }));
      }
    } catch (error) {
      this.setState({ status: 'reject', error: true });
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
            <ImageGalleryItem hits={data} getLargeImg={this.getLargeImg} />
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
    return null;
  }
}

export default ImageGallery;
