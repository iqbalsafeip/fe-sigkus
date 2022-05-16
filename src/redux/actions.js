import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

const storeItem = (token) => {
  localStorage.setItem("token", token);
};

const getItem = (key) => {
  return localStorage.getItem(key);
};

export const isLogin = () => (dispatch) => {
  const token = getItem("token");
  console.log(token);
  if (token) {
    axios
      .get(BASE_URL + "users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_USER", payload: res.data });
        dispatch({ type: "SET_LOGIN", payload: true });
        dispatch({ type: "SET_TOKEN", payload: token });
      });
  }
};

export const login = (data) => (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });

  axios({
    method: "POST",
    url: BASE_URL + "auth/local",
    data: data,
  })
    .then(function (response) {
      console.log(response);
      dispatch({ type: "SET_LOGIN", payload: true });
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "SET_USER", payload: response.data.user });
      const { jwt: token } = response.data;
      dispatch({ type: "SET_TOKEN", payload: token });
      storeItem(token);
    })
    .catch(function (response) {
      console.log(response.response);
      dispatch({ type: "SET_LOADING", payload: false });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: "SET_LOGIN", payload: false });
  dispatch({ type: "SET_TOKEN", payload: "" });
  localStorage.removeItem("token");
};

export const createUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: BASE_URL + "user/signup",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearier ${localStorage.getItem("token")}`,
      },
      data: data,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const updateData = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "PATCH",
      url: BASE_URL + "user" + `/${data.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearier ${localStorage.getItem("token")}`,
      },
      data: data.data,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

// export const deleteKandidat = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//             axios({
//                     method: 'get',
//                     url: config.baseURL + `kandidat/delete/${data}`,
//                     headers: {
//                             'Content-Type': 'multipart/form-data',
//                             Authorization: `bearier ${localStorage.getItem('jwt_adm')}`
//                     }
//             })
//                     .then(function(response) {
//                             dispatch({ type: 'DELETE_KANDIDAT', value: data });
//                             resolve(response);
//                     })
//                     .catch(function(response) {
//                             reject(response);
//                     });
//     });
// };
