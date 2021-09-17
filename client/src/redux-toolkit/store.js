import { configureStore } from "@reduxjs/toolkit";
import competitionReducer from "./competitionReducer";
import createCompetitionReducer, {
  addFilesFromInput,
} from "./createCompetitionReducer";

export const store = configureStore({
  reducer: {
    competitionPage: competitionReducer,
    createCompetitionPage: createCompetitionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [addFilesFromInput],
        ignoredActionPaths: ["meta.arg", "payload"],
        ignoredPaths: ["createCompetitionPage.files"],
      },
    }),
});

window.store = store;
