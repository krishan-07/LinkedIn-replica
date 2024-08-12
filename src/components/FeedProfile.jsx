import { Link } from "react-router-dom";
import ProfileImg from "./ProfileImg";

const FeedProfile = ({ user, posts }) => {
  return (
    <>
      <div className="profile-section position-sticky" style={{ top: "95px" }}>
        <div className="banner-container">
          <img src={user.profileBanner} alt="banner" />
        </div>
        <div className="position-relative">
          <div className="image-container position-absolute">
            <ProfileImg
              size={"100%"}
              image={user.profileImg}
              name={user.userName}
            />
          </div>
        </div>

        <div className="text-center profile-name">
          <Link
            to={`/in/${user.userName}`}
            className="link-dark link-offset-1 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-m
        "
          >
            {user.name}
          </Link>
        </div>
        <div
          className="profile-desc text-secondary text-center mt-2"
          style={{ fontSize: ".8rem" }}
        >
          <p className="mb-2 px-2">{user.bio}</p>
          <div className="dropdown-divider my-4 d-none d-md-block"></div>
          <div className="mb-2 d-flex justify-content-between align-items-center px-2 fs-sm">
            <p className="m-0">Connections</p>
            <p className="text-primary fw-m m-0">{user.connections.length}</p>
          </div>
          <div className="mb-5 d-flex justify-content-between align-items-center px-2 fs-sm">
            <p className="m-0">Posts</p>
            <p className="text-primary m-0 fw-m">
              {posts.filter((post) => post.email === user.email).length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedProfile;
