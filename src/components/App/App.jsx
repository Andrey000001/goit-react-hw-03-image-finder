import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
  state = {
    newName: '',
  };

  updateName = newName => {
    this.setState({ newName });
  };
  render() {
    const { newName } = this.state;
    return (
      <>
        <Searchbar updateName={this.updateName} />
        <ImageGallery nameSearch={newName} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
