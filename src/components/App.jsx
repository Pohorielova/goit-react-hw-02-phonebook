import React, { Component } from 'react';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };
  addName = name => {
    console.log(name);
    const contact = {
      id: shortid.generate(),
      name,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleChange = e => {
    this.setState({ name: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.addName(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Save</button>
        </form>

        <ul>
          {this.state.contacts.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default App;
