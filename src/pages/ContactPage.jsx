import { Component } from "react";
import { Link } from "react-router-dom";
import { contactService } from "../services/contactService.js";
import { ContactList } from "../components/ContactList.jsx";
import { ContactFilter } from "../components/ContactFilter.jsx";


export class ContactPage extends Component {

    state = {
        contacts: null,
        filterBy: null,
    };

    componentDidMount() {
        this.loadContacts();


    }

    componentWillUnmount() { }

    async loadContacts() {
        this.setState({ contacts: await contactService.getContacts(this.state.filterBy) });
    }

    onClosePage = () => {
        this.props.onSelectPage('');
    };

    onFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts);
    };

    onSelectContact = (contactId) => {
        this.setState({ selectContactId: contactId });
    };

    onRemoveContact = async (contactId) => {
        try {
            await contactService.deleteContact(contactId);
            this.loadContacts();
        } catch (err) {
            console.log('Cannot delete contact', err);
            throw err;

        }
    };

    onBack = () => {
        this.props.history.push('/');
    };

    render() {
        const { contacts } = this.state;
        if (!contacts) return <div>Loading...</div>;
        return (
            <section className="contact-page">
                <ContactFilter onFilter={this.onFilter} />
                <ContactList history={this.props.history} onRemoveContact={this.onRemoveContact}
                    contacts={contacts} onSelectContact={this.onSelectContact} />
                <Link to="/contact/edit" >Add contact</Link>
                <button onClick={this.onBack}>Back home page</button>
            </section>
        );
    }
}
