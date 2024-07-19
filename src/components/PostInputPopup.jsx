import { IoCloseOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createPostActions } from "../store/features/createPostModal";
import { FaImage } from "react-icons/fa6";
import { ProfileImg } from "./Utility";
import { postsActions } from "../store/features/post";

const PostInputPopup = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isImg, setIsImg] = useState(false);
  const dispatch = useDispatch();
  const content = useRef(null);

  const closePopup = () => {
    dispatch(createPostActions.closePopup());
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImg(true);
      setImgUrl(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setImgUrl(null);
    setIsImg(false);
    document.getElementById("img-input").value = null;
  };

  const checkinput = (e) => {
    if (e.target.value) content.current.style.border = "none";
    content.current.placeholder = "What do you want to talk about?";
  };

  const addPost = () => {
    let currContent = content.current.value;
    if (currContent) {
      dispatch(
        postsActions.addPost({
          content: currContent,
          imgUrl,
        })
      );
      //making a delay effect
      setTimeout(() => {
        dispatch(createPostActions.closePopup());
      }, 500);
    } else {
      content.current.style.border = "1px solid red";
      content.current.placeholder = "enter something here to post";
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-cont mx-2" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3 m-0 py-2">
            <ProfileImg size={"50px"} />
            <div className="d-flex flex-column">
              <p className="fw-m fs-m m-0">Sree krishan mondal</p>
              <p
                className="text-secondary m-0 fs-s text-truncate"
                style={{ maxWidth: "300px" }}
              >
                Post to everyone
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn js-e pe-0 pe-lg-2"
            onClick={closePopup}
          >
            <IoCloseOutline size={30} />
          </button>
        </div>
        <div className="input-field my-3">
          <textarea
            placeholder="What do you want to talk about?"
            className="text-area p-2"
            rows="5"
            cols="70"
            ref={content}
            onChange={checkinput}
          />

          {isImg && (
            <div className="d-flex gap-2">
              <img src={imgUrl} alt="" className="img-preview" />
              <div className="align-self-start" onClick={handleRemove}>
                <IoCloseOutline size={20} />
              </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between mx-2">
          <span className="img-input-container position-relative">
            <div className="icon position-absolute">
              <FaImage size={30} />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              className="mb-3"
              id="img-input"
            />
          </span>
          <button className="btn-post bg-primary" onClick={addPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInputPopup;
