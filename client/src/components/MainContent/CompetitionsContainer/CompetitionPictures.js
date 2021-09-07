const CompetitionPictures = ({
  pictureLinks = [],
  pictureClickHandler,
  currentCompetition,
}) => {
  return (
    <div className="competition-pictures row py-3 gy-3">
      {pictureLinks.map((pic, index) => {
        return (
          <div
            onClick={pictureClickHandler}
            key={index}
            className="col-6 text-center"
          >
            <img
              src={pic}
              alt=""
              className="competition-picture"
              data-index={currentCompetition.pictureLinks.indexOf(pic)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CompetitionPictures;
