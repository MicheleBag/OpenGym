import axios from "axios";
import jwt_decode from "jwt-decode";
import App from "../App";
export const register = (newUser) => {
  return axios
    .post("/registrati", {
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      password: newUser.password,
    })
    .then((response) => {
      console.log("Registered");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (user) => {
  return axios
    .post("/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      //console.log(response);
      localStorage.setItem("usertoken", response.data.token);
      return response.data.auth;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkState = () => {
  return localStorage.usertoken ? true : false;
};
