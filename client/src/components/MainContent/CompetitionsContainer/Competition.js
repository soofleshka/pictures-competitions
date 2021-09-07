import CompetitionPictures from "./CompetitionPictures";
import { useEffect, useState } from "react";

const initialCompetition = {
  title: "",
  pictureLinks: [],
};

const Competition = ({ competition, setCompetition, setCompetitionWinner }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [roundsCount, setRoundsCount] = useState(1);
  const [currentCompetition, setCurrentCompetition] = useState(competition);
  const [nextCompetition, setNextCompetition] = useState({
    ...initialCompetition,
  });

  useEffect(() => {
    if (currentCompetition.pictureLinks.length === 1) {
      setCompetitionWinner(currentCompetition);
      setCompetition(undefined);
    }
    setRoundsCount(Math.round(currentCompetition.pictureLinks.length / 2));
  }, [currentCompetition, setCompetition, setCompetitionWinner]);

  useEffect(() => {
    if (currentRound > roundsCount) {
      setCurrentCompetition(nextCompetition);
      setNextCompetition({ ...initialCompetition });
      setCurrentRound(1);
    }
  }, [currentRound, roundsCount, nextCompetition]);

  const pictureClickHandler = (e) => {
    setNextCompetition((nc) => ({
      ...nc,
      title: currentCompetition.title,
      pictureLinks: [
        ...nc.pictureLinks,
        currentCompetition.pictureLinks[e.target.dataset.index],
      ],
    }));
    setCurrentRound((cr) => cr + 1);
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
        appender={(currentRound - 1) * 2}
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
          setCompetition(undefined);
        }}
        className="btn btn-primary d-block m-auto my-3"
      >
        End competition
      </button>
    </>
  );
};

export default Competition;
