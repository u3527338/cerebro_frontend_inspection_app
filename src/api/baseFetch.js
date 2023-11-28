import ky from "ky";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiServer } from "../global/constants";

const beforeRequest = (request) => {
  // const { token } = useContext(AuthContext);
  const token = "ab829584e6042d69ce0ee519162cf97c5373efb2";
  if (token) {
    request.headers.append("Authorization", `Token ${token}`);
  }
};

export const baseFetch = ky.create({
  prefixUrl: apiServer + "/",
  hooks: {
    beforeRequest: [beforeRequest],
  },
  retry: 0,
});
