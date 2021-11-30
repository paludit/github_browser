import React, { useState } from "react";
import Branches from "./Branches";
import Issues from "./Issues";
import axios from "axios";

function Details(props) {
  const [openTab, setOpenTab] = useState(1);

  const [tab, setTab] = useState("Branches");

  function handleClick(st) {
    setTab(st);
  }

  function deleteRep() {
    const values = {
      rep_id: props.rep_id,
      user_id: localStorage.getItem("user_id"),
    };

    axios.post("http://localhost:5000/delete", values).then((response) => {
      if (response.data === "deleted") {
        window.location.reload(true);
      }
    });
  }

  return (
    <div className="">
      <nav className="bg-gray-800 text-white h-12 flex items-center text-lg justify-center m-1 rounded-md">
        <ul className="flex space-x-3 mr-auto ml-4">
          <li>
            <button
              className={openTab === 1 ? "text-green-300" : "text-blue-100 hover:text-green-300"}
              onClick={() => {
                handleClick("Branches");
                setOpenTab(1);
              }}
            >
              Branches
            </button>
          </li>
          <li>
            <button
              className={openTab === 2 ? "text-red-300" : "text-blue-100 hover:text-red-300"}
              onClick={() => {
                handleClick("Issues");
                setOpenTab(2);
              }}
            >
              Issues
            </button>
          </li>
        </ul>
        {props.oname && (
          <button
            className="bg-red-600 rounded p-1 mr-1 hover:bg-red-700"
            onClick={() => deleteRep()}
          >
            Delete Repository
          </button>
        )}
      </nav>
      <div className="">
        {tab === "Branches" ? (
          <Branches oname={props.oname} rname={props.rname} />
        ) : (
          <Issues oname={props.oname} rname={props.rname} />
        )}
      </div>
    </div>
  );
}

export default Details;
