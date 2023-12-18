import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar.scss";
import nbclogo from "./../Images/nbclogo.png";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

function Navbar({}: Props) {
  const [isInputSelected, setIsInputSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const newsList = useSelector((state) => state.news.newsList);

  const filteredNewsList = newsList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav>
      <ul>
        <div className="leftNavbar">
          <Link to="/">
            <li>
              <img src={nbclogo} alt="" />
              <span style={{ marginLeft: "8px", color: "white" }}>
                NBC NEWS
              </span>
            </li>
          </Link>
          <li>
            <Link to="/politics">Politics</Link>
          </li>
          <li>
            <Link to="/USnews">U.S News</Link>
          </li>
          <li>
            <Link to="/world">World</Link>
          </li>
          <li>
            <Link to="/business">Business</Link>
          </li>
          <li>
            <Link to="/science">Science</Link>
          </li>
          <li>
            <Link to="/health">Health</Link>
          </li>
        </div>

        <div
          className="rightNavbar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          <li
            style={{
              height: "30px",
              boxShadow: isInputSelected
                ? "rgba(3, 102, 214, 0.5) 0px 0px 0px 3px"
                : "none",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <IoSearch
              style={{
                fontSize: "20px !important",
                backgroundColor: "white",
                height: "30px",
                width: "30px",
                color: "black",
                padding: "5px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                border: "none",
                borderRight: "none",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              style={{
                height: "30px",
                border: "none",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                outline: "none",
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onFocus={() => setIsInputSelected(true)}
              onBlur={() => setIsInputSelected(false)}
            />
          </li>

          {searchQuery && (
            <div
              className="searchResults"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "192px",
                background: "white",
                gap: "0",
                height: "max-content",
              }}
            >
              {filteredNewsList.map((item) => (
                <>
                  <Link to="./" style={{ color: "Black" }}>
                    <div
                      className="searchResultItem"
                      style={{ background: "white" }}
                    >
                      <span style={{ background: "white" }}>
                        <span style={{ color: "blue" }}>{item.type}</span>-
                        {item.title}
                      </span>
                    </div>
                  </Link>
                  <p
                    style={{
                      border: "1px black solid",
                      width: "100%",
                    }}
                  ></p>
                </>
              ))}
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
