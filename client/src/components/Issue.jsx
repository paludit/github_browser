import React from "react";

function Issue(props) {
  return (
    <div className="border-2 text-left mt-1 p-1 min-h-12 rounded-lg bg-red-300">
      <h1 className="font-semibold text-lg ml-10">{props.title}</h1>
      <div className="ml-10">
        <img
          src={props.avatar}
          alt="Avatar"
          className="h-10 w-10 rounded-full inline"
        />
        <h1 className="inline ml-4">{props.author}</h1>
      </div>
    </div>
  );
}

export default Issue;
