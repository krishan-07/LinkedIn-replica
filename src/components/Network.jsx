import { useSelector } from "react-redux";
import Body from "./Body";
import Column from "./Column";
import Invitations from "./Invitations";
import FindPeople from "./FindPeople";
import Groups from "./Groups";

const Network = () => {
  const users = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const currUser = users.find((user) => user.email === currUserEmail);
  const remainingUsers = users.filter((user) => user.email !== currUserEmail);

  return (
    <div style={{ height: "100%" }}>
      <Body>
        <Column className={"col-12 col-lg-9"}>
          <Invitations currUser={currUser} users={users} />
          <FindPeople users={remainingUsers} currUser={currUser} />
          <Groups />
        </Column>
      </Body>
    </div>
  );
};

export default Network;
