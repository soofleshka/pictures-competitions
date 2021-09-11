const path = require("path");
const collection = {
  competitions: [
    {
      title: "exampleCompetition",
      pictureLinks: [
        "images/exampleCompetition/pexels-photo-2469122.jpeg",
        "images/exampleCompetition/pexels-diogo-brandao-3785629.jpg",
        "images/exampleCompetition/pexels-photo-5277691.jpeg",
        "images/exampleCompetition/pexels-photo-4431922.jpeg",
        "images/exampleCompetition/pexels-photo-2469122.jpeg",
        "images/exampleCompetition/pexels-photo-2469122.jpeg",
      ],
    },
    {
      title: "exampleCompetition1",
      pictureLinks: [
        "images/exampleCompetition1/pexels-photo-2469122.jpeg",
        "images/exampleCompetition1/pexels-diogo-brandao-3785629.jpg",
        "images/exampleCompetition1/pexels-photo-5277691.jpeg",
        "images/exampleCompetition1/pexels-photo-4431922.jpeg",
      ],
    },
    {
      title: "exampleCompetition2",
      pictureLinks: [
        "images/exampleCompetition2/pexels-photo-2469122.jpeg",
        "images/exampleCompetition2/pexels-diogo-brandao-3785629.jpg",
        "images/exampleCompetition2/pexels-photo-5277691.jpeg",
        "images/exampleCompetition3/pexels-photo-4431922.jpeg",
      ],
    },
  ],
};

exports.getCompetitions = (req, res) => {
  res.json(JSON.stringify(collection));
};

exports.getCompetitionByTitle = (req, res) => {
  const competitionTitle = req.params["competitionTitle"];

  res.json(
    JSON.stringify(
      collection.competitions.find((item) => item.title === competitionTitle)
        .pictureLinks
    )
  );
};

exports.createCompetition = (req, res) => {
  // console.log(1, req.body);
  // console.log(2, req.files);

  if (!req.body) res.sendStatus(400);
  const relativePath = path.join("images", req.body.competitionTitle);
  const newCompetition = {
    title: req.body.competitionTitle,
    pictureLinks: req.files.map((file) =>
      path.join(relativePath, file.filename)
    ),
  };
  collection.competitions.push({ ...newCompetition });
  res.json(JSON.stringify(newCompetition));
};
