import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function AddRepository(props) {
  const [warning, setWarning] = useState("");

  const formik = useFormik({
    initialValues: {
      user_id: localStorage.getItem("user_id"),
      oname: "",
      rname: "",
    },
    validationSchema: Yup.object({
      oname: Yup.string().required("Required"),
      rname: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/add", values)
        .then(function (response) {
          if (response.data === "added") {
            window.location.reload(true);
          } else if (response.data === "already exists") {
            setWarning("Repository Already Exists");
          } else if (response.data === "doesn't exist") {
            setWarning("Repository Doesn't Exist");
          }
        })
        .catch(function (error) {});
    },
  });

  useEffect(() => {}, [warning]);

  return (
    <div className="flex justify-center flex-col h-full w-full">
      <button
        className="ml-auto p-2 text-xl font-semibold"
        onClick={props.close}
      >
        X
      </button>
      <h1 className="text-xl text-center font-semibold inline w-full">
        Add New Repository
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-1 px-2 text-center mt-10">
          <label className="text-lg mx-2">Owner/ Organization</label>
          <input
            className="shadow border rounded py-2 px-3 inline-flex mt-2 mx-2 w-full"
            type="text"
            name="oname"
            value={formik.values.oname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.oname && formik.touched.oname && (
          <p className="text-red-700 font-semibold text-right mr-14">
            {formik.errors.oname}
          </p>
        )}
        <div className="my-1 px-2 text-center mt-10">
          <label className="text-lg mx-2">Repository Name</label>
          <input
            className="shadow border rounded py-2 px-3 inline-flex mt-2 mx-2 w-full"
            type="text"
            name="rname"
            value={formik.values.rname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.rname && formik.touched.rname && (
          <p className="text-red-700 font-semibold text-right mr-14">
            {formik.errors.rname}
          </p>
        )}
        <div className="text-center text-red-700 font-semibold text-lg align-bottom">
          <h1>{warning}</h1>
        </div>
        <div className="my-4 px-2 text-center bg-blue-300 w-28 rounded-md h-12 justify-center flex ml-auto mr-auto hover:bg-blue-400 mt-16">
          <button type="submit" className="w-full">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRepository;
