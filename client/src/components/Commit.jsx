import React from "react";
import gi from "../images/github_default.png";

function Commit(props) {
  let commit_date = props.date.split("T")[0];
  if (props.date !== "unknown") {
    const datechanging = new Date(props.date.split("T")[0]);
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    commit_date = longEnUSFormatter.format(datechanging);
  }

  return (
    <div className="border-2 text-left mt-1 p-1 min-h-12 rounded-lg bg-green-300">
      <h1 className="ml-10 text-sm">{commit_date}</h1>
      <h1 className="font-semibold text-lg ml-10">
        {props.message.split("\n")[0]}
      </h1>
      <div className="ml-10">
        <img
          src={props.avatar === "default" ? gi : props.avatar}
          alt="Avatar"
          className="h-10 w-10 rounded-full inline"
        />
        <h1 className="inline ml-4">{props.author}</h1>
      </div>
    </div>
  );
}

export default Commit;
