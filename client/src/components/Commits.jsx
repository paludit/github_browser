import React, { useState, useEffect } from "react";
import Commit from "./Commit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Commits(props) {
  const [branchCommits, setBranchCommits] = useState([]);
  const values = { oname: props.oname, rname: props.rname, bname: props.bname };

  useEffect(() => {
    let mounted = true;

    axios.post("http://localhost:5000/commits", values).then((response) => {
      if (mounted) {
        setBranchCommits(response.data);
      }
    });
    return () => (mounted = false);
    // eslint-disable-next-line
  }, [props]);
  return (
    <div className="">
      <div className="w-full text-right">
        <button className="p-2 text-3xl font-semibold" onClick={props.close}>
          X
        </button>
      </div>
      <h1 className="text-2xl text-center font-semibold py-4 pt-0">
        COMMITS: {props.bname}
      </h1>
      {branchCommits.map((branchCommit) => {
        return (
          <Commit
            key={uuidv4()}
            author={
              branchCommit.committer === null
                ? "unknown"
                : branchCommit.committer.login
            }
            message={branchCommit.commit.message}
            avatar={
              branchCommit.committer === null
                ? "default"
                : branchCommit.committer.avatar_url
            }
            date={
              branchCommit.committer === null
                ? "unknown"
                : branchCommit.commit.committer.date
            }
          />
        );
      })}
    </div>
  );
}

export default Commits;
