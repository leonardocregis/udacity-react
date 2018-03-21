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
    })
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => {
        return {contacts: state.contacts.concat([contact])}
      })
    })
  }

  removeContact = (contact) => {
    this.setState( (state) => 
        ( {contacts: state.contacts.filter((c) => contact.id !== c.id)})
      );
    ContactsAPI.remove(contact);
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
                <Route path='/create' render={({history})=> (
                  <CreateContact
                    onCreateContact={(contact)=> {
                      this.createContact(contact);
                      history.push('/')
                    }}
                 />)}/>
            </div>
     )
  }
}
export default App;
