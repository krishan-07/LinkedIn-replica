import { Body, Column, ProfileImg } from "./Utility.jsx";
import { useSelector } from "react-redux";
import Footer from "./Footer.jsx";
import FeedProfile from "./FeedProfile.jsx";
import PostInput from "./PostInput.jsx";
import Post from "./Post.jsx";
import News from "./News.jsx";

const Feed = () => {
  const posts = useSelector((state) => state.posts);
  const usersData = useSelector((state) => state.usersData);
  const currUserEmail = useSelector((state) => state.currUser);
  const currUser = usersData.find((user) => user.email === currUserEmail);

  return (
    <>
      <Body>
        <Column className={"col-12 col-md-3 px-2 px-md-0"}>
          <FeedProfile user={currUser} posts={posts} />
        </Column>
        <Column className={"col-12 col-md-9 my-4 my-md-0 px-2 px-md-3"}>
          <div className="row">
            <Column className={"col-12 col-lg-8 pe-md-1"}>
              <PostInput user={currUser} />
              {posts.map((post) => {
                const user = usersData.find(
                  (user) => user.email === post.email
                );
                if (user) {
                  return (
                    <Post
                      key={post.postId}
                      post={post}
                      user={user}
                      usersData={usersData}
                      currUser={currUser}
                      currUserEmail={currUserEmail}
                      profileImg={
                        <ProfileImg
                          size={"50px"}
                          image={user.profileImg}
                          name={user.userName}
                        />
                      }
                    />
                  );
                }
                return null;
              })}
            </Column>
            <Column className={"col-12 col-lg-4 pe-md-0"}>
              <News />
              <div className="footer position-sticky" style={{ top: "95px" }}>
                <Footer className="fs-s py-1" />
              </div>
            </Column>
          </div>
        </Column>
      </Body>
    </>
  );
};

export default Feed;
