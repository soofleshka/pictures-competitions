import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { corsProxyUrl, createFileName, validFileType } from "../utils/utils";

const initialState = {
  files: [],
  title: "",
  urlFileInput: "",
  formData: null,
};

const createCompetitionReducer = createSlice({
  name: "createCompetitionReducer",
  initialState,
  reducers: {
    setFiles(state, action) {
      state.files = action.payload;
    },
    addFile(state, action) {
      state.files = [...state.files, action.payload];
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setUrlFileInput(state, action) {
      state.urlFileInput = action.payload;
    },
    addFilesFromInput(state, action) {
      const addedFiles = [];
      const files = action.payload;
      for (let file of files) {
        if (validFileType(file)) addedFiles.push(file);
      }
      state.files = [...state.files, ...addedFiles];
    },
    deleteFile(state, action) {
      state.files = state.files.filter((_, ind) => ind !== action.payload);
    },
    resetCreateCompetition() {
      return initialState;
    },
  },
});

const { actions, reducer } = createCompetitionReducer;

// thunks
const { resetCreateCompetition, addFile } = actions;
export const sendCompetition = (title, files) => async (dispatch) => {
  const formData = new FormData();
  formData.append("competitionTitle", title);
  for (let file of files) {
    formData.append("images", file, file.name);
  }
  const response = await axios.post("/api/competition/create", formData);
  if (response) {
    dispatch(resetCreateCompetition());
  }
};
export const addFilesFromUrl = (urlFileInput) => async (dispatch) => {
  const response = await fetch(corsProxyUrl + urlFileInput);
  const blob = await response.blob();
  if (validFileType(blob)) {
    const fileName = createFileName(urlFileInput);
    const addedFile = new File([blob], fileName);
    dispatch(addFile(addedFile));
  }
  dispatch(setUrlFileInput(""));
};

export const { setTitle, setUrlFileInput, addFilesFromInput, deleteFile } =
  actions;
export default reducer;
