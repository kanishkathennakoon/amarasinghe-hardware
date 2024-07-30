import { Alert } from "react-bootstrap";
import { FaInfo } from "react-icons/fa";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
