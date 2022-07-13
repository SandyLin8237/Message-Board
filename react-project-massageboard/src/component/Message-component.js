// import { useState } from "react";

const MessageComponent = ({ commenter, content, time, id }) => {
  return (
    <div key={id} className="messageList">
      <h3>{commenter}</h3>
      <p>{content}</p>
      <h6>{time}</h6>
    </div>
  );
};

export default MessageComponent;
