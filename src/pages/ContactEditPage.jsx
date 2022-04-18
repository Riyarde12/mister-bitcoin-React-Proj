import React, { Component } from "react";
import { contactService } from "../services/contactService";

export class ContactEditPage extends Component {

    state = {
        contact: null,
    };

    componentDidMount() {
        this.loadContact();
    }

    async loadContact() {
        const id = this.props.match.params.id;
        const contact = id ? await contactService.getContactById(id) :
            contactService.getEmptyContact();
        this.setState({ contact }, () => { });
    }

    onSaveContact = async (ev) => {
        ev.preventDefault();
        await contactService.saveContact({ ...this.state.contact });
        this.props.history.push('/contact/');
    };

    handleChange = async ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? (+target.value || '') : target.value;
        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }));
    };

    onBack = () => {
        this.props.history.push('/contact/');
    };


    inputRef = (elInput) => {
        if (elInput) elInput.focus();
    };

    componentWillUnmount() { }
    render() {
        const { contact } = this.state;
        if (!contact) return <div>Loading...</div>;
        return (
            <section className="contact-edit">
                <button onClick={this.onBack}>Go back</button>
                <h2>{contact._id ? 'Edit' : 'Add'} Contact</h2>
                <form onSubmit={this.onSaveContact}>
                    <label htmlFor="name">Name</label>
                    <input ref={this.inputRef} onChange={this.handleChange}
                        value={contact.name} type="text" name="Name" id="Name" />

                    <label htmlFor="phone">Phone</label>
                    <input onChange={this.handleChange}
                        value={contact.phone} type="text" name="phone" id="phone" />

                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange}
                        value={contact.email} type="text" name="email" id="email" />
                    <button>Save</button>
                </form>
            </section>
        );
    }
}
