import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Competition from "./Competition";
import {
  createNextCompetition,
  getCompetitions,
  setCompetition,
  setCompetitionWinner,
  setCurrentCompetition,
  setIsCompetitionStarted,
} from "../../../redux-toolkit/competitionReducer";
import { useDispatch, useSelector } from "react-redux";

const CompetitionsContainer = () => {
  const competitions = useSelector(
    (state) => state.competitionPage.competitions
  );
  const isCompetitionStarted = useSelector(
    (state) => state.competitionPage.isCompetitionStarted
  );
  const competition = useSelector((state) => state.competitionPage.competition);
  const competitionWinner = useSelector(
    (state) => state.competitionPage.competitionWinner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isCompetitionStarted) dispatch(getCompetitions());
  }, [isCompetitionStarted, dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setCompetitionWinner(null));
    dispatch(setIsCompetitionStarted(true));
    dispatch(setCurrentCompetition(competition));
    dispatch(createNextCompetition());
  };

  const handleCompetitionsSelectChange = (e) => {
    const selectedCompetition = competitions.find(
      (c) => c.title === e.target.value
    );
    dispatch(setCompetition(selectedCompetition));
  };

  return (
    <div className="container">
      <h1 className="text-center">Welcome</h1>
      {isCompetitionStarted ? (
        <Competition
          setCompetition={setCompetition}
          setCompetitionWinner={setCompetitionWinner}
        />
      ) : (
        <>
          <form onSubmit={handleFormSubmit} className="text-center">
            <label htmlFor="competitionsSelect">Choose competition</label>
            <select
              name="competitionsSelect"
              id="competitionsSelect"
              value={competition ? competition.title : "DEFAULT"}
              onChange={handleCompetitionsSelectChange}
            >
              <option value="DEFAULT" disabled>
                Choose competition ...
              </option>
              {competitions.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <div className="competition-actions p-2" />
            {competition && (
              <>
                <button type="submit" className="btn btn-success m-2">
                  Start competition
                </button>
                <NavLink to="/rating" className="btn btn-primary m-2">
                  Pictures rating
                </NavLink>
              </>
            )}
          </form>
          {competitionWinner && (
            <div className="text-center m-3">
              <h2>"{competitionWinner.title}" winner</h2>
              <img
                src={competitionWinner.pictureLinks[0]}
                alt=""
                className="competition-picture"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompetitionsContainer;
