import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI  from './utils/ContactsAPI';
class App extends Component {
  state = { 
      contacts:[]
  };

  componentDidMount() {
    ContactsAPI.getAll().then( contacts => {
      if (contacts) {
        this.setState({contacts});
      }
    }
    )
  }
  removeContact = (contact) => {
    this.setState( (state) => 
        ( {contacts: state.contacts.filter((c) => contact.id !== c.id)})
      );
  }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} onDeleteContacts={this.removeContact}/>
      </div>
    )
  }
}
export default App;
