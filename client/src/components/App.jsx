import React, { useState, useEffect } from "react";
import Repository from "./Repository";
import Details from "./Details";
import AddRepository from "./AddRepository";
import Modal from "react-modal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

Modal.setAppElement("#root");

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reps, setReps] = useState([]);
  const [currentBranch, setCurrentBranch] = useState({
    _id: "",
    oname: "",
    rname: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user_id") === null) {
      localStorage.setItem("user_id", uuidv4());
    }

    const values = {
      user_id: localStorage.getItem("user_id"),
    };

    axios.post("http://localhost:5000/getreps", values).then((response) => {
      setReps(response.data);
      if (response.data.length !== 0) {
        check(response.data[0]);
      }
    });
  }, []);

  function check(dets) {
    setCurrentBranch(dets);
  }

  return (
    <div className="h-screen m-0">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        className="h-4/6 max-w-md fixed m-auto left-0 right-0 top-0 bottom-0 shadow-lg bg-white"
      >
        <div className="h-3/5 w-1/4 fixed m-auto left-0 right-0 top-0 bottom-0">
          <AddRepository close={() => setModalIsOpen(false)} />
        </div>
      </Modal>
      <div className="bg-gray-800 text-white flex h-12 items-center text-2xl justify-center flex-shrink-0">
        <nav className=""> Github Browser </nav>
      </div>
      <div className="grid grid-cols-10 fixed w-full h-screen pb-12">
        <div className="fixed ml-5 bottom-3 text-2xl">
          <button
            onClick={() => setModalIsOpen(true)}
            className="pb-1 w-10 h-10 bg-red-400 rounded-full hover:bg-red-500 active:shadow-lg mouse shadow focus:outline-none"
          >
            +
          </button>
        </div>
        <div className="col-span-3 overflow-auto">
          {reps.map((rep) => {
            return (
              <Repository
                key={rep._id}
                oname={rep.oname}
                rname={rep.rname}
                clicked={() => check(rep)}
              />
            );
          })}
        </div>
        <div className="col-span-7 overflow-auto">
          <Details
            rep_id={currentBranch._id}
            oname={currentBranch.oname}
            rname={currentBranch.rname}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
