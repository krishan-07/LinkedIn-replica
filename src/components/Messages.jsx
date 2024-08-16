import React from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Column from "./Column";
import ProfileImg from "./ProfileImg";
import SearchForMessages from "./SearchForMessages";

const card = {
  borderRadius: "6px",
  background: "white",
  overflow: "clip",
  height: "minContent",
};

const Messages = () => {
  const currUserEmail = useSelector((state) => state.currUser);
  const messages = useSelector((state) => state.messages);
  const users = useSelector((state) => state.usersData);
  const currUserInbox = messages.find((obj) => obj.email === currUserEmail);
  const inbox = users.filter(
    (obj) =>
      currUserInbox &&
      currUserInbox.inbox.some((mssg) => mssg.email === obj.email)
  );
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showMssg, setShowMssg] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ height: "85dvh" }}>
      <div className="container col-12 col-lg-8" style={card}>
        {windowWidth >= 576 && (
          <div className="row mt-2 mt-sm-5">
            <Column className={"col-5 px-0"}>
              <div style={{ height: "80dvh" }}>
                <div className="d-flex py-3 px-4 justify-content-between">
                  <div className="fw-m">Messaging</div>
                  <div
                    className="cursor-p"
                    onClick={() => {
                      setShowSearch(true);
                      navigate("/in/messaging");
                    }}
                    data-testid="add-button"
                  >
                    <FiEdit size={22} />
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div>
                  {inbox.length !== 0 ? (
                    inbox.map((obj) => (
                      <div
                        className={`mssg-card d-flex align-items-center px-3 gap-2 py-2 cursor-p border-bottom-light ${
                          window.location.href.includes(obj.userName) &&
                          "active"
                        }`}
                        key={obj.email}
                        onClick={() => {
                          setShowSearch(false);
                          navigate(`${obj.userName}`);
                        }}
                        data-testid="mssg-user-card"
                      >
                        <ProfileImg
                          size={"40px"}
                          name={obj.userName}
                          image={obj.profileImg}
                        />
                        <div className="fw-m fs-m">{obj.name}</div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "50dvh" }}
                    >
                      <div className="d-flex flex-column align-items-center gap-2">
                        <div>Find people to message</div>
                        <button
                          className="btn-view-profile"
                          style={{ width: "80px" }}
                          onClick={() => {
                            setShowSearch(true);
                          }}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Column>
            <Column className={"col-7 px-0"}>
              <div
                style={{
                  borderLeft: "1px solid rgb(201, 201, 201)",
                  height: "80dvh",
                }}
              >
                {showSearch && (
                  <SearchForMessages
                    show={setShowSearch}
                    currUser={currUserEmail}
                  />
                )}
                <Outlet />
              </div>
            </Column>
          </div>
        )}
        {windowWidth < 576 && (
          <div className="row mt-2 mt-sm-5">
            {showSearch === false && (
              <Column className={"col-12 px-0"}>
                <div style={{ height: "100dvh" }}>
                  <div className="d-flex py-3 px-4 justify-content-between">
                    <div className="fw-m">Messaging</div>
                    <div
                      className="cursor-p"
                      onClick={() => {
                        setShowSearch(true);
                        navigate("/in/messaging");
                      }}
                    >
                      <FiEdit size={22} />
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div>
                    {inbox.length !== 0 ? (
                      inbox.map((obj) => (
                        <div
                          className="mssg-card d-flex align-items-center px-3 gap-2 py-2 cursor-p border-bottom-light"
                          key={obj.email}
                          onClick={() => {
                            setShowSearch(true);
                            setShowMssg(true);
                            navigate(`${obj.userName}`);
                          }}
                        >
                          <ProfileImg
                            size={"40px"}
                            name={obj.userName}
                            image={obj.profileImg}
                          />
                          <div className="fw-m fs-m">{obj.name}</div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "50dvh" }}
                      >
                        <div className="d-flex flex-column align-items-center gap-2">
                          <div>Find people to message</div>
                          <button
                            className="btn-view-profile"
                            style={{ width: "80px" }}
                            onClick={() => {
                              setShowSearch(true);
                            }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Column>
            )}
            {showSearch && (
              <Column className={"col-12 px-0"}>
                <div
                  style={{
                    borderLeft: "1px solid rgb(201, 201, 201)",
                    height: "100dvh",
                  }}
                >
                  <div className="mx-2 py-2 border-bottom-light cursor-p">
                    <span
                      onClick={() => {
                        setShowSearch(false);
                        setShowMssg(false);
                        navigate("/in/messaging");
                      }}
                    >
                      <FaArrowLeft size={20} />
                    </span>
                  </div>
                  {showSearch && !showMssg && (
                    <SearchForMessages
                      show={setShowSearch}
                      currUser={currUserEmail}
                    />
                  )}

                  {showMssg && <Outlet />}
                </div>
              </Column>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
