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

    clearQuery = () => {
        this.setState(
            {
                query: ''
            }
        );
    }
    render() {

        const {contacts, onDeleteContacts} = this.props;
        const {query} = this.state;

        let showingContacts;
        if (query) {
            const match = new RegExp(escapeRegExp(query),'i');
            showingContacts = contacts.filter((contact) => match.test(contact.name));
        } else {
            showingContacts = contacts;
        }

        showingContacts.sort(sortBy('name'));

        return  (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='searsh-contacts'
                        type='text'
                        placeholder='Searsh contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total </span>
                        <button onClick={this.clearQuery}>Show All </button>
                    </div>
                )}
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
                                <button onClick={() => onDeleteContacts(contact) } className='contact-remove'>
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