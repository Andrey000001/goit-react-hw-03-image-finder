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
    console.log(prevProps);
    if (nameSearch !== prevProps.nameSearch || page !== prevState.page) {
      this.setState({ status: 'pending' });
      try {
        const newData = await FetchApi(nameSearch, page);
        if (page > 1 && nameSearch !== prevProps.nameSearch) {
          this.setState({ page: 1, loadMoreBtn: false, data: [] });
        } else if (newData.total === 0 || nameSearch === '') {
          this.setState({ status: 'reject', page: 1, data: [] });
          toast.info(`Nothing was found for your request ${nameSearch}`);
        } else {
          this.setState(prevState => ({
            data:
              nameSearch !== prevProps.nameSearch
                ? [...newData.hits]
                : [...prevState.data, ...newData.hits],
            status: 'resolve',
            loadMoreBtn: newData.hits.length ? true : false,
          }));
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
    const { data, url, showModal, status, loadMoreBtn } = this.state;
    return (
      <div>
        {data.length && (
          <Cards>
            <ImageGalleryItem hits={data} getLargeImg={this.getLargeImg} />
          </Cards>
        )}
        {status === 'pending' && <Loader />}
        {status !== 'pending' && loadMoreBtn && (
          <LoadMore text="LoadMore..." handleLoadMore={this.handleLoadMore} />
        )}

        {showModal && (
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

export default ImageGallery;
