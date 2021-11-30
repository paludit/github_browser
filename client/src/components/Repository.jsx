import React from "react";

function Repository(props) {
  return (
    <div className="text-center my-1 py-3 mx-1 px-3 border-4 rounded-lg bg-blue-100 hover:bg-blue-200">
      <button onClick={props.clicked} className="h-full w-full">
        <h1 className="font-semibold">{props.oname}</h1>
        <h1>{props.rname}</h1>
      </button>
    </div>
  );
}

export default Repository;
