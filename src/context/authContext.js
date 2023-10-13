import {createContext, useEffect, useReducer} from "react";
import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

const initValue = {
  token: "",
  user_id: "",
  email: "",
  full_name: "",
  user_title: "",
  is_admin: false,
  is_staff: false,
  is_fcm: false,
  default_project: {},
  projects: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setProfile":
      return {...state, ...action.value}
    case "logout":
      return {...initValue}
  }
}

const AuthContextProvider = ({children}) => {

  const [authState, authStateDispatch] = useReducer(reducer, initValue)
  const {getItem: getUsername, setItem: setUsername} = useAsyncStorage('@username');
  const {getItem: getPassword, setItem: setPassword} = useAsyncStorage('@password');

  useEffect(() => {

  }, [])

  const toAuthStore = (username, password) => {
    setUsername(username)
    setPassword(password)
  }

  const fromAuthStore = async () => {
    const username = await getUsername()
    const password = await getPassword()
    return {username, password}
  }

  const setProfile = (value) => {
    authStateDispatch({type: "setProfile", value})
  }

  const logout = () => {
    authStateDispatch({type: "logout"})
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      setProfile,
      logout,
      toAuthStore,
      fromAuthStore
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;