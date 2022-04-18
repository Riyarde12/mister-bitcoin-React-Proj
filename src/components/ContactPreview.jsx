import { Link } from "react-router-dom";

export function ContactPreview({ contact, onRemoveContact }) {
    const contactImg = { backgroundImage: `url(https://robohash.org/set_set5/${contact._id})`, width: '250px' };
    return (
        <section className="contact-preview">
            <div className="card-container">
                <Link to={`/contact/${contact._id}`} >
                    <div style={contactImg}></div>
                    <h2>{contact.name}</h2>
                </Link>
                <button onClick={() => onRemoveContact(contact._id)}>Delete contact</button>
                <Link className="edit-link" to={`/contact/edit/${contact._id}`} >Edit contact</Link>
            </div>
        </section>
    );
}
