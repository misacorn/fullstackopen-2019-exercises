import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const CreateNew = ({ addNew, setNotification }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const [redirectHome, setRedirect] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0
    });
    setRedirect(true);
    setNotification(`a new anecdote '${content}' created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  return (
    <div>
      {redirectHome ? <Redirect to={"/"} /> : null}
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url for more info
          <input
            name="info"
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
