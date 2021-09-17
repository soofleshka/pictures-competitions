import CompetitionPictures from "./CompetitionPictures";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPictureToNextCompetition,
  createNextCompetition,
  resetCompetition,
  setCurrentCompetition,
  setCurrentRound,
  setIsCompetitionStarted,
  setRoundsCount,
} from "../../../redux-toolkit/competitionReducer";

const Competition = ({ setCompetition, setCompetitionWinner }) => {
  const currentRound = useSelector(
    (state) => state.competitionPage.currentRound
  );
  const roundsCount = useSelector((state) => state.competitionPage.roundsCount);
  const nextCompetition = useSelector(
    (state) => state.competitionPage.nextCompetition
  );
  const currentCompetition = useSelector(
    (state) => state.competitionPage.currentCompetition
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCompetition.pictureLinks.length === 1) {
      dispatch(setCompetitionWinner(currentCompetition));
      dispatch(setIsCompetitionStarted(false));
      dispatch(setCompetition(undefined));
    } else {
      const calculatedRoundsCount = Math.round(
        currentCompetition.pictureLinks.length / 2
      );
      dispatch(setRoundsCount(calculatedRoundsCount));
    }
  }, [currentCompetition, setCompetition, setCompetitionWinner, dispatch]);

  useEffect(() => {
    if (currentRound > roundsCount) {
      dispatch(setCurrentCompetition(nextCompetition));
      dispatch(createNextCompetition());
      dispatch(setCurrentRound(1));
    }
  }, [currentRound, roundsCount, nextCompetition, dispatch]);

  const pictureClickHandler = (e) => {
    dispatch(addPictureToNextCompetition(e.target.dataset.index));
    dispatch(setCurrentRound(currentRound + 1));
  };

  return (
    <>
      <h2 className="text-center">
        {roundsCount === 1 ? (
          <>Final round</>
        ) : (
          <>
            Round {currentRound}/{roundsCount}
          </>
        )}
      </h2>
      <CompetitionPictures
        currentCompetition={currentCompetition}
        pictureLinks={
          currentCompetition
            ? currentCompetition.pictureLinks.slice(
                2 * (currentRound - 1),
                2 * currentRound
              )
            : []
        }
        pictureClickHandler={pictureClickHandler}
      />
      <button
        onClick={() => {
          dispatch(resetCompetition());
        }}
        className="btn btn-primary d-block m-auto my-3"
      >
        End competition
      </button>
    </>
  );
};

export default Competition;
