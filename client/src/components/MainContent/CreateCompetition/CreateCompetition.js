import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilesFromInput,
  addFilesFromUrl,
  deleteFile,
  sendCompetition,
  setTitle,
  setUrlFileInput,
} from "../../../redux-toolkit/createCompetitionReducer";

const CreateCompetition = () => {
  const files = useSelector((state) => state.createCompetitionPage.files);
  const title = useSelector((state) => state.createCompetitionPage.title);
  const urlFileInput = useSelector(
    (state) => state.createCompetitionPage.urlFileInput
  );
  const dispatch = useDispatch();

  const filesInput = React.createRef();

  const addFilesFromInputClickHandler = () => {
    dispatch(addFilesFromInput(filesInput.current.files));
    filesInput.current.value = null;
  };
  const addFilesFromUrlClickHandler = () => {
    dispatch(addFilesFromUrl(urlFileInput));
  };

  const deleteFileClickHandler = (e) => {
    e.preventDefault();
    const index = Number(e.target.dataset["index"]);
    dispatch(deleteFile(index));
  };

  const createCompetitionClickHandler = () => {
    dispatch(sendCompetition(title, files));
    alert(`${title} created!`);
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
            onChange={(e) => dispatch(setTitle(e.target.value))}
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
            onChange={(e) => dispatch(setUrlFileInput(e.target.value))}
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
