import { createContext, useEffect, useReducer } from "react";

export const SystemContext = createContext(null);

const initValue = {
  operating_system: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setOperatingSystem":
      return { ...state, operating_system: action.value };
  }
};

const SystemContextProvider = ({ children }) => {
  const [systemState, systemStateDispatch] = useReducer(reducer, initValue);

  useEffect(() => {}, []);

  const setOperatingSystem = (value) => {
    systemStateDispatch({ type: "setOperatingSystem", value });
  };

  return (
    <SystemContext.Provider
      value={{
        ...systemState,
        setOperatingSystem,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemContextProvider;
