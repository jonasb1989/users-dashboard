import { Route } from "react-router-dom";

import Header from "components/Header";
import UsersTable from "pages/UsersTable";

import "./App.less";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <Route path="/">
          <UsersTable />
        </Route>
      </div>
    </div>
  );
}

export default App;
