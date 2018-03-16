import React, { Component } from 'react';
import ListContacts from './ListContacts';

class App extends Component {
  state = { 
      contacts:[
        {
          "id": "ryan",
          "name": "Ryan Florence",
          "email": "ryan@reacttraining.com",
          "avatarURL": "http://localhost:5001/ryan.jpg"
        },
        {
          "id": "michael",
          "name": "Michael Jackson",
          "email": "michael@reacttraining.com",
          "avatarURL": "http://localhost:5001/michael.jpg"
        },
        {
          "id": "tyler",
          "name": "Tyler McGinnis",
          "email": "tyler@reacttraining.com",
          "avatarURL": "http://localhost:5001/tyler.jpg"
        }
      ]
  };
  removeContact = (contact) => {
    this.setState( (state) => 
        ( {contacts: state.contacts.filter((c) => contact.id !== c.id)})
      );
  }

  render() {
    console.log(this.state.contacts);
    return (
      <div>
        <ListContacts contacts={this.state.contacts} onDeleteContacts={this.removeContact}/>
      </div>
    )
  }
}
export default App;
