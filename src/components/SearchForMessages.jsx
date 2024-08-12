import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import searchData from "../utility/searchData";
import { messagesActions } from "../store/features/messages";
import ProfileImg from "./ProfileImg";
import { TbGhost3 } from "react-icons/tb";

const SearchForMessages = ({ show, currUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    setFilteredData(searchData(value));
  };

  const addMessage = (userEmail, userName) => {
    dispatch(
      messagesActions.addMessage({
        currUser,
        userEmail,
        userName,
      })
    );
    show(false);
    navigate(`/in/messaging/${userName}`);
  };

  return (
    <div className="">
      <div className="d-flex py-2 px-3 justify-content-between border-bottom-light">
        <div className="fw-m ">New message</div>
      </div>
      <div className="border-bottom-light">
        <div className="mx-2">
          <input
            type="search"
            className="mssg-search my-1 fs-s py-1"
            placeholder="Type a name"
            onChange={handleOnChange}
            value={searchQuery}
          />
        </div>
      </div>
      <div className="overflowY-scroll position-relative">
        {filteredData && filteredData.length !== 0 ? (
          filteredData.map(
            (user) =>
              user.email !== currUser && (
                <div
                  className="d-flex px-2 py-1 align-items-center cursor-p hover-bg border-bottom-light"
                  key={user.email}
                  onClick={() => {
                    addMessage(user.email, user.userName);
                  }}
                >
                  <div className="profile d-flex align-items-center">
                    <ProfileImg
                      size={"40px"}
                      name={user.userName}
                      image={user.profileImg}
                    />
                    <div className="ms-3">
                      <div className="fw-m ">{user.name}</div>
                      <div className="fs-s text-secondary text-truncate">
                        {user.bio.substring(0, 50) + "..."}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center h-100"
            style={{ minHeight: "300px" }}
          >
            <div className="text-secondary">
              <TbGhost3 size={30} />
            </div>
            <div className="text-secondary fst-italic fs-s">
              No people found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchForMessages;
