import { fetchWidgets } from "../public/js/config.js";

System.import("react-router-dom").then(function (module) {
  const BrowserRouter = module.BrowserRouter;
  const Route = module.Route;
  const Link = module.Link;
  const Switch = module.Switch;

  fetchWidgets().then((widgets) => {
    const App = () => (
      <BrowserRouter>
        <main>
          <h1>Bank Accounts</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {widgets.map((widget) => (
              <div key={widget.id} className="card">
                <Link to={widget.path}>
                  <h2>{widget.name}</h2>
                </Link>
              </div>
            ))}
          </div>

          <Switch>
            {widgets.map((widget) => {
              const Component = () => (
                <div className="card">
                  <h2>{widget.name}</h2>
                </div>
              );

              return (
                <Route
                  key={widget.id}
                  path={widget.path}
                  exact
                  component={Component}
                />
              );
            })}
          </Switch>
        </main>
      </BrowserRouter>
    );

    ReactDOM.render(<App />, document.getElementById("root"));
  });
});
