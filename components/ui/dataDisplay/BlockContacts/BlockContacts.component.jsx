import ContactList from "./ContactList.component";

const BlockContacts = (props) => {
  const { title = "", contacts = [] } = props;

  return (
    <div className="content-block content-block--contacts">
      <div className="mx-auto text-left">
        <h4 className="font-semibold text-black dark:text-white">{title}:</h4>

        {contacts.length > 0 ? (
          <ContactList contacts={contacts} />
        ) : (
          <p className="mt-2">No contact persons available</p>
        )}
      </div>
    </div>
  );
};

export default BlockContacts;
