import { ContactPreview } from "./ContactPreview";

export function ContactList({ contacts, onSelectContact, onRemoveContact }) {

    return (
        <section className="contact-list">
            {contacts.map(contact =>
                <ContactPreview contact={contact}
                    onSelectContact={onSelectContact}
                    onRemoveContact={onRemoveContact}
                    key={contact._id} />)}
        </section>
    );
}
