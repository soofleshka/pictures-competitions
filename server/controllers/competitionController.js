const collection = {
  competitions: [
    {
      title: 'exampleCompetition',
      pictureLinks: [
        'images/exampleCompetition/pexels-photo-2469122.jpeg',
        'images/exampleCompetition/pexels-diogo-brandao-3785629.jpg',
        'images/exampleCompetition/pexels-photo-5277691.jpeg',
        'images/exampleCompetition/pexels-photo-4431922.jpeg',
        'images/exampleCompetition/pexels-photo-2469122.jpeg',
        'images/exampleCompetition/pexels-photo-2469122.jpeg',
      ],
    },
    {
      title: 'exampleCompetition1',
      pictureLinks: [
        'images/exampleCompetition/pexels-photo-2469122.jpeg',
        'images/exampleCompetition/pexels-diogo-brandao-3785629.jpg',
        'images/exampleCompetition/pexels-photo-5277691.jpeg',
        'images/exampleCompetition/pexels-photo-4431922.jpeg',
      ],
    },
    {
      title: 'exampleCompetition2',
      pictureLinks: [
        'images/exampleCompetition/pexels-photo-2469122.jpeg',
        'images/exampleCompetition/pexels-diogo-brandao-3785629.jpg',
        'images/exampleCompetition/pexels-photo-5277691.jpeg',
        'images/exampleCompetition/pexels-photo-4431922.jpeg',
      ],
    },
  ],
};

exports.getCompetitions = (req, res) => {
  res.json(JSON.stringify(collection));
};

exports.getCompetitionByTitle = (req, res) => {
  const competitionTitle = req.params['competitionTitle'];

  res.json(
    JSON.stringify(
      collection.competitions.find((item) => item.title === competitionTitle)
        .pictureLinks
    )
  );
};

exports.createCompetition = (req, res) => {
  if (!req.body) res.sendStatus(400);
  const newCompetition = req.body;
  collection.competitions.push(newCompetition);
  res.json(JSON.stringify(newCompetition));
};