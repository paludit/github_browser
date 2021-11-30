import React, { useState, useEffect } from "react";
import Branch from "./Branch";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Branches(props) {
  const [repBranches, setRepBranches] = useState([]);

  const values = { oname: props.oname, rname: props.rname };

  useEffect(() => {
    axios.post("http://localhost:5000/branches", values).then((response) => {
      setRepBranches(response.data);
    });
    // eslint-disable-next-line
  }, [props]);

  return (
    <div className="m-1 mt-1">
      {repBranches.map((repBranch) => {
        return (
          <Branch
            key={uuidv4()}
            bname={repBranch.name}
            oname={values.oname}
            rname={values.rname}
          />
        );
      })}
    </div>
  );
}

export default Branches;
