import React, { useState } from "react";
import axios from "axios";

const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
function validFileType(file) {
  for (let i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

const CreateCompetition = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [urlFileInput, setUrlFileInput] = useState("");
  const filesInput = React.createRef();

  const addFilesFromInputClickHandler = () => {
    const addedFiles = [];
    for (let file of filesInput.current.files) {
      if (validFileType(file)) addedFiles.push(file);
    }

    setFiles((files) => [...files, ...addedFiles]);
    filesInput.current.value = null;
  };
  const addFilesFromUrlClickHandler = async () => {
    const response = await fetch(corsProxyUrl + urlFileInput);
    const blob = await response.blob();
    if (validFileType(blob)) {
      const fileName = urlFileInput.substring(
        urlFileInput.lastIndexOf("/") + 1,
        urlFileInput.length
      );
      const addedFile = new File([blob], fileName);
      setFiles((files) => [...files, addedFile]);
      setUrlFileInput("");
    }
  };

  const deleteFileClickHandler = (e) => {
    e.preventDefault();
    const index = Number(e.target.dataset["index"]);
    setFiles(files.filter((_, ind) => ind !== index));
  };

  const createCompetitionClickHandler = () => {
    const formData = new FormData();
    formData.append("competitionTitle", title);
    for (let file of files) {
      formData.append("images", file, file.name);
    }

    console.log(formData);
    axios
      .post("/api/competition/create", formData, {
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log(response));
    console.log(files);
  };

  return (
    <div className="container">
      <h1 className="text-center">Create competition</h1>
      <div className="errors" />
      <div className="row gy-2">
        <div className="col-md-8 text-md-end text-center">
          <label htmlFor="competitionTitle">Competition title:</label>
          <input
            type="text"
            name="competitionTitle"
            id="competitionTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-md-start text-center">
          <button
            className="btn btn-success"
            disabled={!title || files.length === 0}
            onClick={createCompetitionClickHandler}
          >
            Create competition
          </button>
        </div>
        <div className="col-md-8 text-md-end text-center">
          <label htmlFor="addFiles" className="btn btn-primary">
            Choose pictures
          </label>
          <input
            accept=".png, .jpg, .jpeg"
            ref={filesInput}
            id="addFiles"
            type="file"
            name=""
            multiple
            className="form-control"
            onChange={addFilesFromInputClickHandler}
            style={{ display: "none" }}
          />
        </div>
        <div className="col-md-8 text-md-end text-center">
          <label htmlFor="">Picture from url:</label>
          <input
            type="url"
            name=""
            id=""
            multiple
            value={urlFileInput}
            onChange={(e) => setUrlFileInput(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-md-start text-center">
          <button
            className="btn btn-primary"
            onClick={addFilesFromUrlClickHandler}
            disabled={!urlFileInput}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row p-3 g-3">
        {files.map((file, index) => {
          const src = URL.createObjectURL(file);
          return (
            <div key={index} className="col-6 col-sm-3">
              <img
                src={src}
                alt=""
                className="img-fluid"
                onLoad={() => URL.revokeObjectURL(src)}
              />
              <a
                href="/"
                data-index={index}
                className="btn btn-danger d-block mt-2"
                onClick={deleteFileClickHandler}
              >
                Delete
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateCompetition;
