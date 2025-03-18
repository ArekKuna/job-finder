import { AppRoutes } from "views/Router";

import "@fontsource/sen/800.css";
import "@fontsource/geologica/400.css";
import "./main.css";
import { useAuthorization } from "hooks/useAuthorization/useAuthorization";

function App() {
  useAuthorization();

  return <AppRoutes />;
}

export default App;
