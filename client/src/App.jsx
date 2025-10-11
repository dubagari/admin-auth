import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "./redox/store.js";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout />
      </PersistGate>
    </Provider>
  );
};

export default App;
