import { Component } from "react";
import { contactService } from "../services/contactService";
import { Link } from "react-router-dom";

export class ContactDetailsPage extends Component {

    state = {
        contact: null,
    };

    componentDidMount() {
        this.loadContact();
    }

    componentDidUpdate(prevProps, prevState) {
        const { match } = this.props;
        if (prevProps.match.params.id !== match.params.id) this.loadContact();
    }

    componentWillUnmount() { }

    async loadContact() {
        const { match } = this.props;
        try {
            const contact = await contactService.getContactById(match.params.id);
            this.setState({ contact });
        }
        catch (err) {
            console.log('Cannot load contact', err);
            throw err;
        }
    };

    onBack = () => {
        this.props.history.push('/contact/');
    };

    render() {
        const { contact } = this.state;
        if (!contact) return <div>Loading...</div>;
        return (
            <section className="contact-detail">
                <main>
                    <h2>Name: {contact.name}</h2>
                    <h2>Phone: {contact.phone}</h2>
                    <h2>Email: {contact.email}</h2>
                </main>
                <section>
                    <button onClick={this.onBack}>Back to contacts list</button>
                    <Link to={`/contact/edit/${contact._id}`}>Edit contact</Link>
                    {/* <Link to='/contact/..'>Next contact</Link> */}
                </section>
            </section>
        );
    }
}
