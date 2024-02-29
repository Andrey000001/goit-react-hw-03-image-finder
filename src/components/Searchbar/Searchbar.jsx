import { Component } from 'react';
import { Header, Button, Input, Search, Form } from './Searchbar.styled';
class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { updateName } = this.props;
    const { inputValue } = this.state;
    updateName(inputValue.toLowerCase().trim());
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Header>
        <Form className="form" onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Search />
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            value={inputValue}
            placeholder="Search images and photos"
            name="search"
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
