import React from "react";
import { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Search = ({ data, show, setSearch }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const directToProfile = (link) => {
    setSearch("");
    show(false);
    navigate(`/in/${link}`);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      show(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-overlay">
      <div className="px-3">
        <div className="col-12 col-md-6 col-lg-3 search-card" ref={dropdownRef}>
          {data &&
            data.map((user) => (
              <div
                className="d-flex px-3 py-2 align-items-center cursor-p"
                key={user.email}
                onClick={() => {
                  directToProfile(user.userName);
                }}
                data-testid="link"
              >
                <div>
                  <IoSearch size={25} />
                </div>
                <div className="fw-m ms-3">{user.name}</div>
              </div>
            ))}
          {data && data.length === 0 && (
            <div className="d-flex px-3 py-2 text-secondary fst-italic">
              <div>
                <IoSearch size={25} />
              </div>
              <div className="fw-m ms-3"> No results found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
