import React, { useState } from "react";
import Modal from "react-modal";
import Commits from "./Commits";

function Branch(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="border-2 mt-1 p-1 min-h-12 rounded-lg bg-green-300 hover:bg-green-400">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <Commits
          oname={props.oname}
          rname={props.rname}
          bname={props.bname}
          close={() => setModalIsOpen(false)}
        />
      </Modal>
      <button className="w-full" onClick={() => setModalIsOpen(true)}>
        <h1 className="font-semibold text-lg text-left ml-10">{props.bname}</h1>
      </button>
    </div>
  );
}

export default Branch;
