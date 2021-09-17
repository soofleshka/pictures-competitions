import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  competition: undefined,
  competitions: [],
  competitionWinner: null,
  isCompetitionStarted: false,
  currentCompetition: null,
  nextCompetition: null,
  currentRound: 1,
  roundsCount: 1,
};

const competitionSlice = createSlice({
  name: "competitionReducer",
  initialState,
  reducers: {
    setCompetitions(state, action) {
      state.competitions = action.payload;
    },
    setIsCompetitionStarted(state, action) {
      state.isCompetitionStarted = action.payload;
    },
    setCompetition(state, action) {
      state.competition = action.payload;
    },
    setCompetitionWinner(state, action) {
      state.competitionWinner = action.payload;
    },
    setCurrentCompetition(state, action) {
      state.currentCompetition = action.payload;
    },
    createNextCompetition(state) {
      state.nextCompetition = {
        title: state.competition.title,
        pictureLinks: [],
      };
    },
    addPictureToNextCompetition(state, action) {
      state.nextCompetition.pictureLinks.push(
        state.currentCompetition.pictureLinks[action.payload]
      );
    },
    setCurrentRound(state, action) {
      state.currentRound = action.payload;
    },
    setRoundsCount(state, action) {
      state.roundsCount = action.payload;
    },
    resetCompetition() {
      return initialState;
    },
  },
});

const { actions, reducer } = competitionSlice;

//export thunks
const { setCompetitions } = actions;
export const getCompetitions = () => async (dispatch) => {
  dispatch(setCompetitions([]));
  const response = await axios.get("/api/competition");
  const data = await response.data;
  const competitionsCollectionObject = JSON.parse(data);
  const competitions = competitionsCollectionObject.competitions;
  dispatch(setCompetitions(competitions));
};

//export actions
export const {
  setIsCompetitionStarted,
  setCompetition,
  setCompetitionWinner,
  setCurrentCompetition,
  setCurrentRound,
  setRoundsCount,
  createNextCompetition,
  addPictureToNextCompetition,
  resetCompetition,
} = actions;
export default reducer;
