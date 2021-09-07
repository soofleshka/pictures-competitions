const CreateCompetition = () => {
  return (
    <div className="container">
      <h1 className="text-center">Create competition</h1>
      {/*//Template*/}
      <div className="errors" />
      <form action="" className="competition-creator">
        <div className="row gy-2">
          <div className="col-md-8 text-md-end text-center">
            <label htmlFor="competitionTitle">Competition title:</label>
            <input type="text" name="competitionTitle" id="competitionTitle" />
          </div>
          <div className="col-md-4 text-md-start text-center">
            <button type="submit" className="btn btn-success">
              Create competition
            </button>
          </div>
          <div className="col-md-8 text-md-end text-center">
            <label htmlFor="">Choose pictures</label>
            <input type="file" name="" id="" multiple />
          </div>
          <div className="col-md-4 text-md-start text-center">
            <button className="btn btn-primary">Add</button>
          </div>
          <div className="col-md-8 text-md-end text-center">
            <label htmlFor="">Picture from url</label>
            <input type="url" name="" id="" multiple />
          </div>
          <div className="col-md-4 text-md-start text-center">
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
      <div className="row p-3 g-3">
        <div className="col-6 col-sm-3">
          <img
            src="images/pexels-photo-2469122.jpeg"
            alt=""
            className="img-fluid"
          />
          <a href="/" className="btn btn-danger d-block mt-1">
            Delete
          </a>
        </div>
      </div>
      {/*//Template*/}
    </div>
  );
};

export default CreateCompetition;
