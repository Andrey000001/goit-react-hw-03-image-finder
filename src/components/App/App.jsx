import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import FetchApi from 'components/Service/ServiceApi';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import LoadMore from 'components/Button/Button';

class App extends Component {
  state = {
    newName: '',
    data: [],
    status: 'idle',
    page: 1,
    error: null,
    url: '',
    showModal: false,
  };
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
  updateName = newName => {
    this.setState({ newName, page: 1, data: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.newName !== prevState.newName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchApi();
    }
  }

  fetchApi = async () => {
    const { page, newName } = this.state;
    try {
      const { hits, total } = await FetchApi({ newName, page });
      if (newName === '' || total === 0) {
        this.setState({ status: 'reject' });
        toast.info(`По вашему запросу ничего не найденно ${newName}`);
      } else {
        this.setState(prevState => ({
          status: 'resolve',
          data: page > 1 ? [...prevState.data, ...hits] : [...hits],
        }));
      }
    } catch (error) {
      this.setState({ error: true, status: 'reject' });
      console.error(error);
    }
  };

  render() {
    const { data, showModal, url, status } = this.state;
    return (
      <>
        <Searchbar updateName={this.updateName} />
        {<ImageGallery data={data} showModal getLargeImg={this.getLargeImg} />}
        <ToastContainer autoClose={3000} />
        {status === 'pending' && <Loader />}
        {status !== 'pending' && data.length && (
          <LoadMore handleLoadMore={this.handleLoadMore} text="LoadMore..." />
        )}
        {showModal && (
          <Modal
            closeModal={this.onCloseModal}
            showModal={showModal}
            url={url}
          />
        )}
      </>
    );
  }
}

export default App;
