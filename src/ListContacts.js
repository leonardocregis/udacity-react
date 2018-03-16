import React from 'react';
import PropTypes from 'prop-types';

function ListContacts(props) {
    return  (
        <ol className="contact-list">
                {
                    props.contacts.map((contact) => {
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
    );
}

ListContacts.prototypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContacts: PropTypes.func.isRequired
}

export default ListContacts;