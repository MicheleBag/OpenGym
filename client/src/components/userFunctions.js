import axios from "axios";

/*
/This file contains every api call that user can do
*/
const baseURL = "http://localhost:8081";

export const register = (newUser) => {
	return axios
		.post(baseURL + "/account", {
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
	var url = "";
	var tokenName = "";
	if (user.admin) {
		url = baseURL + "/adminLogin";
		tokenName = "admintoken";
	} else {
		url = baseURL + "/login";
		tokenName = "usertoken";
	}
	return axios
		.post(url, {
			email: user.email,
			password: user.password,
		})
		.then((response) => {
			//console.log(response);
			localStorage.setItem(tokenName, response.data.token);
			return response.data.done;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getGymList = (gymName) => {
	return axios
		.get(baseURL + "/search", {
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
		.get(baseURL + "/reservation", {
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
		.get(baseURL + "/userReservationInfo", {
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

export const getAdminReservation = (gymId) => {
	return axios
		.get(baseURL + "/adminReservationInfo", {
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

export const edit = (data) => {
	return axios
		.put(baseURL + "/account", {
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

export const editGym = (data) => {
	console.log(data);
	return axios
		.put(baseURL + "/palestra", {
			id_palestra: data.id_palestra,
			name: data.name,
			address: data.address,
			city: data.city,
			immagine: data.immagine,
			capacity: data.capacity,
			open_time: data.open_time,
			closed_time: data.closed_time,
			day_closed: data.day_closed,
		})
		.then((response) => {
			console.log(response);
			return response.data.done;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const reserve = (reserveData) => {
	//console.log(reserveData.data);
	return axios
		.post(baseURL + "/reservation", {
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
		.delete(baseURL + "/reservation", {
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
