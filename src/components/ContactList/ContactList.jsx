import { PropTypes } from 'prop-types';

import { ContactItem } from 'components/ContactItem';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ id, name, number }) => (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            deleteContact={deleteContact}
          />
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};