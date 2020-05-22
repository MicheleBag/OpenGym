import axios from "axios";
export const register = (newUser) => {
  return axios
    .post("/registrati", {
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      password: newUser.password,
    })
    .then((response) => {
      return response.data;
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

export const getGymList = (gymName) => {
  return axios
    .post("/search", {
      word: gymName,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGymReservation = (gymId) => {
  return axios
    .post("/reservationInfo", {
      id_palestra: gymId,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const edit = (data) => {
  return axios
    .post("/modificaDati", {
      name: data.name,
      surname: data.surname,
      email: data.email,
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
