import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Competition from "./Competition";

const CompetitionsContainer = () => {
  const [competition, setCompetition] = useState(undefined);
  const [competitions, setCompetitions] = useState([]);
  const [isSelectedCompetition, setIsSelectedCompetition] = useState(false);
  const [competitionWinner, setCompetitionWinner] = useState(null);

  useEffect(() => {
    axios
      .get("/api/competition")
      .then((response) => response.data)
      .then((data) => {
        const competitionsCollectionObject = JSON.parse(data);
        setCompetitions(competitionsCollectionObject.competitions);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCompetitionWinner(null);
    setCompetition(competitions.find((c) => c.title === e.target[0].value));
    setIsSelectedCompetition(false);
  };

  return (
    <div className="container">
      <h1 className="text-center">Welcome</h1>
      {competition ? (
        <Competition
          competition={competition}
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
              defaultValue={"DEFAULT"}
              onChange={() => setIsSelectedCompetition(true)}
            >
              <option value="DEFAULT" disabled>
                Choose a competition ...
              </option>
              {competitions.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <div className="competition-actions p-2" />
            {isSelectedCompetition && (
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
