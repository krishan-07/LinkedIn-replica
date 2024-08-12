import { useDispatch, useSelector } from "react-redux";
import { groupsActions } from "../store/features/groups";
import Column from "./Column";
import { Link } from "react-router-dom";

const Groups = () => {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  const joinGroup = (id) => {
    dispatch(groupsActionss.joined(id));
  };
  const leaveGroup = (id) => {
    dispatch(groupsActions.leave(id));
  };

  return (
    <>
      <div className="network-card py-2 mb-4">
        <div className="d-flex justify-content-between">
          <div className="text-secondary fs-m px-3 py-2">
            Groups you may interested in
          </div>
          <div className="fw-m fs-m px-3 py-2 text-secondary w-fc cursor-p">
            See all
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <div className="mt-3">
          <div className="row px-2">
            {groups.map((group) => (
              <Column className={"col-6 col-sm-4 col-xl-3 mb-4"} key={group.id}>
                <div className="connection-card">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="banner-container">
                      <img src={group.banner} alt="" />
                    </div>
                    <div className="connection-img">
                      <img src={group.image} alt="" />
                    </div>
                  </div>
                  <div style={{ height: "65px" }}></div>
                  <div className="text-center fw-m px-2 my-3">
                    <Link
                      to="/in/mynetwork"
                      className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m"
                    >
                      {group.name.substring(0, 30) + " ..."}
                    </Link>
                  </div>
                  <div
                    className="text-center text-secondary px-1 mb-3"
                    style={{ fontSize: ".9rem" }}
                  >
                    {group.members} members
                  </div>

                  <div className="mx-4 mb-3">
                    <button
                      className={`btn fw-m ${
                        group.joined ? "btn-disabled" : "btn-view-profile"
                      }`}
                      onClick={() => {
                        group.joined
                          ? leaveGroup(group.id)
                          : joinGroup(group.id);
                      }}
                    >
                      {group.joined ? "Joined" : "Join"}
                    </button>
                  </div>
                </div>
              </Column>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
