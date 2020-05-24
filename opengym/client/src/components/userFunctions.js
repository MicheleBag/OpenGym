import axios from "axios";
export const register = (newUser) => {
  return axios
    .post("/account", {
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      password: newUser.password,
    })
    .then((response) => {
      return response.data.done;
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
      return response.data.done;
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
    .get("/search", {
      params: {
        word: gymName,
      },
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
    .get("/reservation", {
      params: {
        id_palestra: gymId,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserReservation = (email) => {
  return axios
    .get("/userReservationInfo", {
      params: {
        email: email,
      },
    })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const edit = (data) => {
  return axios
    .put("/account", {
      first_name: data.name,
      last_name: data.surname,
      email: data.email,
      new_password: data.newPassword,
      current_password: data.currentPassword,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const reserve = (reserveData) => {
  //console.log(reserveData.data);
  return axios
    .post("/reservation", {
      id_palestra: reserveData.id,
      email: reserveData.email,
      data: reserveData.data,
      orario_inizio: reserveData.timeStart,
      orario_fine: reserveData.timeEnd,
    })
    .then((response) => {
      console.log(response);
      return response.data.done;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteReservetion = (reserveData) => {
  console.log(reserveData);
  return axios
    .delete("/reservation", {
      params: {
        id_palestra: reserveData.gymId,
        email: reserveData.email,
        data: reserveData.date,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data.done;
    })
    .catch((err) => {
      console.log(err);
    });
};
