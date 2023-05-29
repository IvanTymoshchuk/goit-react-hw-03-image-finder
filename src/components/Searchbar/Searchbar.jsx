import { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { notifyOptions } from 'notifyOption/notify';

export default class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input.trim() === '') {
      return toast.error('Please enter key words for search', notifyOptions);
    }
    this.props.getInputValue(this.state.input);
    this.setState({ input: '' });
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <HiMagnifyingGlass size="24" />
          </Button>

          <Input
            name="input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.input}
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}
