const initState = {
  list: [],
  loginDetails: {},
  refuser: {},
};
const USER_CREATE = "USER_CREATE";
const USER_UPDATE = "USER_UPDATE";
const USER_GET_ALL = "USER_GET_ALL";
const USER_GET_BY_ID = "USER_GET_BY_ID";
const USER_DELETE = "USER_DELETE";
const USER_LOGIN = "USER_LOGIN";
const USER_LOGOUT = "USER_LOGOUT";
const REF_USER = "REF_USER";

export function createUserAction(payload) {
  return async (dispatch) => {
    const url = "http://localhost:8080/api/user/";
    const requestBody = { ...payload };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    dispatch({ type: USER_CREATE, payload: payload });
  };
}

export function userLoginAction(payload) {
  console.log(payload.userName,payload.userPassword);
  return async (dispatch) => {
    const url = `http://localhost:8080/api/user/login/${payload.userName}/${payload.userPassword}`;
    const response = await fetch(url);
    const userObj = await response.json();
    console.log(userObj);
  };
}
export function userLogoutAction() {
  return { type: USER_LOGOUT, payload: {} };
}
export function updateUserAction(payload) {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/user/${payload.userId}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    dispatch(updateRefUser({}));
  };
}
export function deleteUserAction(payload) {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/user/${payload.userId}`;
    await fetch(url, { method: "DELETE" });

    dispatch(getAllUserAction());
  };
}
export function getAllUserAction(payload) {
  return async (dispatch) => {
    const url = "http://localhost:8080/api/user/";

    const response = await fetch(url);

    const userList = await response.json();
    console.log(userList);

    dispatch({ type: USER_GET_ALL, payload: userList });
  };
}
export function getByIdUserAction(payload) {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/user/${payload.userId}`;
    const response = await fetch(url);
    const userObj = await response.json();

    dispatch(updateRefUser(userObj));
  };
}
export function updateRefUser(payload) {
  return { type: REF_USER, payload: payload };
}

export function UserReducer(state = initState, action) {
  switch (action.type) {
    case USER_CREATE:
      //
      return { ...state, list: [action.payload, ...state.list] };
    case USER_UPDATE:
      //
      return state;
    case USER_DELETE:
      //
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);
      return { ...state, list: [...oldList] };
    case USER_GET_ALL:
      //
      return { ...state, list: action.payload };
    case USER_GET_BY_ID:
      //
      return state;
    case REF_USER:
      //
      return { ...state, refuser: action.payload };
    case USER_LOGIN:
      return { ...state, loginDetails: action.payload };
    case USER_LOGOUT:
      return { ...state, loginDetails: action.payload };

    default:
      return state;
  }
}
