import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class  ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContacts: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()});
    }

    render() {
        const props = this.props;
        let showingContacts;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query),'i');
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = this.props.contacts;
        }
        showingContacts.sort(sortBy('name'));
        return  (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='searsh-contacts'
                        type='text'
                        placeholder='Searsh contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <ol className="contact-list">
                    {
                        showingContacts.map((contact) => {
                            return (
                            <li key={contact.id} className="contact-list-item"> 
                                <div className="contact-avatar" style={{
                                    backgroundImage: `${contact.avatarURL} ` 
                                }}>
                                </div>
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => props.onDeleteContacts(contact) } className='contact-remove'>
                                    Remove
                                </button>
                            </li>)
                        })
                    }
                </ol>
            </div>
        );
    }
}


export default ListContacts;