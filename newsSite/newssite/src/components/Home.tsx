import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Outlet, json } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  like,
  setNewsList,
  newsItem,
  dislike,
} from "../redux/slices/newsSlice";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import "./Home.scss";

type Props = {};

function Home({}: Props) {
  const dispatch = useDispatch();
  const [likedItems, setLikedItems] = useState<string[] | null>([]);
  const [dislikedItems, setDisikedItems] = useState<string[] | null>([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [delBtn, setDelBtn] = useState("");
  const [BtnId, setBtnId] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://657e056f3e3f5b1894637237.mockapi.io/news")
      .then((res) => {
        dispatch(setNewsList(res.data));
      });

    setLikedItems(JSON.parse(localStorage.getItem("liked") || "[]"));
    console.log(likedItems);
  }, [dispatch]);
  const newsList = useSelector((state: newsItem[]) => {
    const sortedNewsList = [...state.news.newsList].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });

    return sortedNewsList;
  });
  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ margin: "0 auto", width: "70%", marginTop: "100px" }}
      >
        <div className="mixedNews">
          {newsList &&
            newsList.map((elem) => (
              <>
                <div
                  key={elem.id}
                  className="news"
                  style={{ display: "flex", gap: "20px" }}
                >
                  <div
                    className="left"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="top"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <h1>{elem.title}</h1>
                      <p style={{ border: "1px black solid" }}></p>
                      <p>{elem.description}</p>
                    </div>
                    <div
                      className="bottom"
                      style={{
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      <span>
                        {new Date(elem.date).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          timeZoneName: "short",
                        })}
                        ,
                      </span>
                      <span>{elem.watched} times watched</span>
                      <button
                        style={{
                          height: "32px",
                          padding: "0 7px",
                          backgroundColor: "#089CFF",
                          borderRadius: "6px",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "white",
                        }}
                        onClick={() => {
                          const isLiked = likedItems?.includes(elem.id);
                          console.log(isLiked);
                          setLiked(!isLiked);
                          setBtnId(elem.id);
                          dispatch(
                            like({ newsItemId: elem.id, increment: liked })
                          );

                          axios
                            .put(
                              `https://657e056f3e3f5b1894637237.mockapi.io/news/${elem.id}`,
                              { likeCount: elem.likeCount + (liked ? -1 : 1) }
                            )
                            .then((response) => {
                              console.log(
                                "News item updated successfully:",
                                response.data
                              );
                            });

                          const index = likedItems.indexOf(elem.id);
                          if (index !== -1) {
                            likedItems.splice(index, 1);
                          } else {
                            likedItems.push(elem.id);
                          }
                          setLikedItems([...likedItems]);
                          localStorage.setItem(
                            "liked",
                            JSON.stringify(likedItems)
                          );

                          console.log(likedItems);
                        }}
                      >
                        {likedItems.includes(elem.id) ? (
                          <AiFillLike
                            style={{ color: "white", fontSize: "16px" }}
                          />
                        ) : (
                          <AiOutlineLike
                            style={{ color: "white", fontSize: "16px" }}
                          />
                        )}
                        Like {elem.likeCount}
                      </button>
                      <button
                        style={{
                          height: "32px",
                          padding: "0 7px",
                          backgroundColor: "#FF2532",
                          borderRadius: "6px",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "white",
                        }}
                        onClick={() => {
                          setDisliked(!disliked);
                          setDelBtn(elem.id);

                          dispatch(
                            dislike({
                              newsItemId: elem.id,
                              decrement: !disliked,
                            })
                          );

                          axios
                            .put(
                              `https://657e056f3e3f5b1894637237.mockapi.io/news/${elem.id}`,
                              {
                                dislikeCount:
                                  elem.dislikeCount - (disliked ? 1 : -1),
                              }
                            )
                            .then((response) => {
                              console.log(
                                "News item updated successfully:",
                                response.data
                              );
                            });
                        }}
                      >
                        {delBtn === elem.id ? (
                          disliked ? (
                            <AiFillDislike
                              style={{ color: "white", fontSize: "16px" }}
                            />
                          ) : (
                            <AiOutlineDislike
                              style={{ color: "white", fontSize: "16px" }}
                            />
                          )
                        ) : (
                          <AiOutlineDislike
                            style={{ color: "white", fontSize: "16px" }}
                          />
                        )}
                        Dislike {elem.dislikeCount}
                      </button>
                    </div>
                  </div>
                  <div
                    className="right"
                    style={{
                      width: "425px",
                      height: "275px",
                      boxSizing: "content-box",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={elem.image}
                      alt=""
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                </div>
                <p
                  style={{
                    border: "1px black solid",
                    margin: "12px 0",
                  }}
                ></p>
              </>
            ))}
        </div>

        {/* <div className="trio">
          <div>
            <h2>Latest news:</h2>
            <ul>
              {newsList.slice(0, 5).map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Most watched:</h2>
            <ul></ul>
          </div>
          <div>
            <h2>Most liked:</h2>
            <ul></ul>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
}

export default Home;
