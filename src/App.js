import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI  from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom'

class App extends Component {
  
  state = {
      screen: 'list',
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
                <Route exact path='/' render= {()=> (
                  <ListContacts
                    onDeleteContacts={this.removeContact}
                    contacts={this.state.contacts}
                  />
                )}/>
                <Route path='/create' component={CreateContact} />
            </div>
        
     )
  }
}
export default App;
