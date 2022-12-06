import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from './Box';
import shortid from 'shortid';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };
  addName = data => {
    console.log(data);
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    const contactName = [];

    this.state.contacts.forEach(contact => contactName.push(contact.name));

    contactName.includes(contact.name)
      ? alert(`${contact.name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <Box as="div" p={15}>
        <h1>Phonebook</h1>
        <Box as="div" display="flex" alignItems="center">
          <Box as="div" display="flex" flexDirection="column" width={320}>
            <Form onSubmitForm={this.addName} contacts={visibleContacts} />
            {/* <h2>Contacts</h2> */}
            <Filter value={this.state.filter} onChange={this.changeFilter} />
          </Box>
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Box>
      </Box>
    );
  }
}
export default App;
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  addName: PropTypes.func,
  deleteContact: PropTypes.func,
  changeFilter: PropTypes.func,
};
