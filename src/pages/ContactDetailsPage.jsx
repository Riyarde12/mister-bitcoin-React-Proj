import { Component } from "react";
import { connect } from "react-redux";
import { contactService } from "../services/contactService";
import { Link } from "react-router-dom";
import { TransferFund } from "../components/TransferFund";
import { loadLoggedInUser, spendCoins } from "../store/actions/userActions";

class _ContactDetailsPage extends Component {

    state = {
        contact: null,
        transferAmount: null,
    };

    componentDidMount() {
        this.loadContact();
        this.props.loadLoggedInUser();
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


    handleChange = async ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? (+target.value || '') : target.value;
        this.setState({ [field]: value });
    };

    onTransferCoins = (ev) => {
        ev.preventDefault();
        const { transferAmount } = this.state;
        this.props.spendCoins(transferAmount);
    };

    onBack = () => {
        this.props.history.push('/contact/');
    };

    render() {
        const { contact } = this.state;
        const { loggedInUser } = this.props;
        console.log('loggedInUser', loggedInUser);
        if (!contact) return <div>Loading...</div>;
        return (
            <section className="contact-detail">
                <main>
                    <h2>Name: {contact.name}</h2>
                    <h2>Phone: {contact.phone}</h2>
                    <h2>Email: {contact.email}</h2>
                    <section>
                        <button onClick={this.onBack}>Back to contacts list</button>
                        <Link to={`/contact/edit/${contact._id}`}>Edit contact</Link>
                    </section>
                    <TransferFund contact={contact} maxCoins={loggedInUser.coins}
                        onTransferCoins={this.onTransferCoins} handleChange={this.handleChange} />
                </main>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    };
};

const mapDispatchToProps = {
    loadLoggedInUser,
    spendCoins,
};

export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage);