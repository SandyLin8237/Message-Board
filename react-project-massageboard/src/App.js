import { useEffect, useState } from "react";
import MessageComponent from "./component/Message-component";
import "./style/style.css";

const API_MSG =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

function App() {
  let [message, setMessage] = useState(null);
  let [errMsg, setErrMsg] = useState(null);
  let [value, setValue] = useState("");
  let [errPostMsg, setErrPostMsg] = useState(null);
  let [loadingMessage, setLoadingMessage] = useState(false);

  const fetchMessage = () => {
    fetch(API_MSG)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setMessage(data);
      })
      .catch((err) => {
        return setErrMsg(err);
      });
  };

  const handleTextChange = (e) => {
    setValue(e.target.value);
  };

  // onFocus:聚焦欄位時
  const handleTextFocus = () => {
    setErrPostMsg(null);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (loadingMessage) {
      return;
    }
    setLoadingMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "Sandy",
        body: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingMessage(false);
        if (data.ok === 0) {
          setErrPostMsg(data.message);
          return;
        }
        fetchMessage();
      })
      .catch((err) => {
        setLoadingMessage(false);
        setErrPostMsg(err.message);
      });
    setValue("");
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="main">
      {loadingMessage && <div className="loading">Loading...</div>}
      <h1 className="title">Message Board</h1>
      <textarea
        value={value}
        onChange={handleTextChange}
        onFocus={handleTextFocus}
        cols="30"
        rows="10"
        placeholder="Enter your message"
      ></textarea>
      <button onClick={handleClick}>Submit</button>
      <hr />
      {errMsg && <div className="err">Fail to fetch API.</div>}
      {errPostMsg && <div className="err">{errPostMsg}</div>}
      {message && message.length === 0 && (
        <div className="noMsg">No Messages.</div>
      )}
      {message &&
        message.map((item) => {
          return (
            <MessageComponent
              commenter={item.nickname}
              content={item.body}
              // 把createdAt轉成日期格式&瀏覽器語言格式
              time={new Date(item.createdAt).toLocaleString()}
              id={item.id}
            />
          );
        })}
    </div>
  );
}

export default App;
