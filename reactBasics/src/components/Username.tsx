import '../types';
import { IUser } from "../types";

interface IUsernameComponentProps {
  user: IUser
};

const Username = (props: IUsernameComponentProps) => {
  return (
    <div>
      <h1>{props.user.name}</h1>
    </div>
  );
};

export default Username;