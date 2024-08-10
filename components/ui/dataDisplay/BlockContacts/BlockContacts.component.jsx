import {
  LocalPhoneOutlined as LocalPhoneIcon,
  EmailOutlined as EmailIcon,
} from "@mui/icons-material";

const BlockContacts = (props) => {
  const { title = "", contacts = [] } = props;

  return (
    <div className="content-block content-block--contacts">
      <div className="mx-auto text-left">
        <h4 className="font-semibold text-black dark:text-white">{title}:</h4>

        {contacts.length > 0 ? (
          <ul className="mt-2">
            {contacts.map((contact) => (
              <li key={contact?.name} className="mb-4">
                {contact?.name && (
                  <span className="mb-2 block font-normal">
                    {contact?.name}{" "}
                    {contact?.role && (
                      <i className="text-base font-normal text-orange-600">
                        ({contact?.role})
                      </i>
                    )}
                  </span>
                )}
                {contact?.email && (
                  <span className="flex items-center gap-2">
                    <EmailIcon sx={{ fontSize: "0.875rem" }} /> {contact?.email}
                  </span>
                )}
                {contact?.phone && (
                  <span className="flex items-center gap-2">
                    <LocalPhoneIcon sx={{ fontSize: "0.875rem" }} />{" "}
                    {contact?.phone}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">No contact persons available</p>
        )}
      </div>
    </div>
  );
};

export default BlockContacts;
