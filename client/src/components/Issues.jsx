import React, { useState, useEffect } from "react";
import Issue from "./Issue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Issues(props) {
  const [repIssues, setRepIssues] = useState([]);

  const values = { oname: props.oname, rname: props.rname };

  useEffect(() => {
    axios.post("http://localhost:5000/issues", values).then((response) => {
      setRepIssues(response.data);
    });
    // eslint-disable-next-line
  }, [props]);

  return (
    <div className="m-1 mt-1">
      {repIssues.map((repIssue) => {
        return (
          <Issue
            key={uuidv4()}
            title={repIssue.title}
            author={repIssue.user.login}
            avatar={repIssue.user.avatar_url}
          />
        );
      })}
    </div>
  );
}

export default Issues;
