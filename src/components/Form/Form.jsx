import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Input, Label, Btn, Container } from './Form.styled';
class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  handelInputChange = e => {
    this.setState({ [e.target.name]: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmitForm(this.state);

    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Container onSubmit={this.handleSubmit}>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handelInputChange}
          value={this.state.name}
        />

        <Label>Number</Label>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handelInputChange}
          value={this.state.number}
        />

        <Btn type="submit">Add contact</Btn>
      </Container>
    );
  }
}

export default Form;
Form.propType = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
