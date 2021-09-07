import { Route } from "react-router-dom";
import CompetitionsContainer from "./CompetitionsContainer/CompetitionsContainer";
import About from "./About/About";
import CreateCompetition from "./CreateCompetition/CreateCompetition";

const MainContent = () => {
  return (
    <main>
      <Route path="/" exact component={CompetitionsContainer} />
      <Route path="/create" component={CreateCompetition} />
      <Route path="/about" component={About} />
    </main>
  );
};

export default MainContent;
