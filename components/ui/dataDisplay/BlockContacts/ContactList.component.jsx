import {
  LocalPhoneOutlined as PhoneIcon,
  EmailOutlined as EmailIcon,
  PublicOutlined as WebsiteIcon,
} from "@mui/icons-material";
const ContactList = (props) => {
  const { contacts = [] } = props;

  return (
    <ul className="mt-2">
      {contacts.map((contact, index) => (
        <li key={index} className="mb-4">
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
              <PhoneIcon sx={{ fontSize: "0.875rem" }} /> {contact?.phone}
            </span>
          )}
          {contact?.website && (
            <span className="flex items-center gap-2">
              <WebsiteIcon sx={{ fontSize: "0.875rem" }} /> {contact?.website}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
