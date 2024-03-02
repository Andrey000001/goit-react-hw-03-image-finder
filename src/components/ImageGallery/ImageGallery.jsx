import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Cards } from './ImageGallery.styled';

import FetchApi from 'components/Service/ServiceApi';
import Modal from 'components/Modal/Modal';
import LoadMore from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
class ImageGallery extends Component {
  state = {
    data: [],
    url: '',
    status: 'idle',
    showModal: false,
    page: 1,
    error: false,
    loadMoreBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { nameSearch } = this.props;
    const { page } = this.state;

    if (nameSearch !== prevProps.nameSearch || page !== prevState.page) {
      this.setState({ status: 'pending', page: 1 });
      try {
        const newData = await FetchApi(nameSearch, page);
        if (!newData.total) {
          this.setState({ status: 'reject', data: [] });
          toast.info('ЧтО ТО ПОШЛО НЕ ТАК ');
        } else if (nameSearch === '' || newData.total === 0) {
          this.setState({ status: 'reject' });
          toast.info('Что то пошло не так!');
        } else if (newData.hits.length < 12) {
          this.setState({ loadMoreBtn: false, status: 'resolve' });
        } else {
          this.setState(state => ({
            data:
              page > 1 ? [...state.data, ...newData.hits] : [...newData.hits],
            status: 'resolve',
            loadMoreBtn: true,
          }));
          toast.success(`По вашему запросу найденно ${newData.total}`);
        }
      } catch (error) {
        this.setState({ error: true, status: 'reject' });
        console.log(error.message);
      }
    }
  }
  getLargeImg = url => {
    this.setState({ url, showModal: true });
  };

  handleLoadMore = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { data, url, showModal, status, error, loadMoreBtn } = this.state;

    if (status === 'resolve') {
      return (
        <div>
          <Cards>
            <ImageGalleryItem hits={data} getLargeImg={this.getLargeImg} />
          </Cards>
          {loadMoreBtn && (
            <LoadMore text="LoadMore..." handleLoadMore={this.handleLoadMore} />
          )}
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
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'reject') {
      return <div>{error.message}</div>;
    }
    return null;
  }
}

export default ImageGallery;
