import React from "react";
import { Link } from "react-router-dom";
import demoImg from "../assets/defaultPfp.jpeg";

const ProfileImg = ({ size, name = "", image = demoImg, disable = "" }) => {
  return (
    <>
      {disable !== true ? (
        <Link to={`/in/${name}`}>
          <img
            src={image}
            alt={name}
            style={{ height: `${size}`, width: `${size}`, borderRadius: "50%" }}
          />
        </Link>
      ) : (
        <img
          src={image}
          alt={name}
          style={{ height: `${size}`, width: `${size}`, borderRadius: "50%" }}
        />
      )}
    </>
  );
};
export default ProfileImg;
