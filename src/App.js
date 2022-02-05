import { Route } from "react-router-dom";

import Header from "components/Header";
import UsersTable from "pages/UsersTable";
import UsersForm from "pages/UsersForm";

import "./App.less";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <Route exact path="/" component={UsersTable} />
        <Route exact path="/users/:userId?" component={UsersForm} />
      </div>
    </div>
  );
}

export default App;
