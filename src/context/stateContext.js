import { createContext, useEffect, useReducer } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

export const StateContext = createContext(null);

const initValue = {
  projectList: [],
  currentProject: {},
  currentCategory: {},
  currentPermission: [],
  globalFilter: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setProfile":
      return { ...state, ...action.value };
    case "setProjectList":
      return { ...state, projectList: action.value };
    case "setCurrentProject":
      return { ...state, currentProject: action.value };
    case "setCurrentPermission":
      return { ...state, currentPermission: action.value };
    case "setCurrentCategory":
      return { ...state, currentCategory: action.value };
    case "setGlobalFilter":
      return { ...state, globalFilter: action.value };
    case "resetProfile":
      return {
        ...state,
        currentProject: initValue.currentProject,
        currentCategory: initValue.currentCategory,
      };
    case "resetGlobalFilter":
      return {
        ...state,
        globalFilter: initValue.globalFilter,
      };
  }
};

const StateContextProvider = ({ children }) => {
  const [deviceState, deviceStateDispatch] = useReducer(reducer, initValue);

  useEffect(() => {}, []);

  const setProjectList = (value) => {
    deviceStateDispatch({ type: "setProjectList", value });
  };

  const setCurrentProject = (value) => {
    deviceStateDispatch({ type: "setCurrentProject", value });
  };

  const setCurrentCategory = (value) => {
    deviceStateDispatch({ type: "setCurrentCategory", value });
  };
  const setCurrentPermission = (value) => {
    deviceStateDispatch({ type: "setCurrentPermission", value });
  };

  const setDeviceState = (value) => {
    deviceStateDispatch({ type: "setProfile", value });
  };

  const setGlobalFilter = (value) => {
    deviceStateDispatch({ type: "setGlobalFilter", value });
  };

  const resetProfile = () => {
    deviceStateDispatch({ type: "resetProfile" });
  };

  const resetGlobalFilter = () => {
    deviceStateDispatch({ type: "resetGlobalFilter" });
  };

  return (
    <StateContext.Provider
      value={{
        ...deviceState,
        resetProfile,
        resetGlobalFilter,
        setDeviceState,
        setProjectList,
        setCurrentProject,
        setCurrentCategory,
        setCurrentPermission,
        setGlobalFilter,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
