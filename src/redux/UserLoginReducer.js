const initState = {
    userRefDetails:{},
    // will display the proper login page
    loginAction: false,
  };
  
  // ACTION TYPES
  const LOGIN_ACTION = "LOGIN_ACTION";
  const LOGIN_ERROR="LOGIN_ERROR";
  const LOGIN_USER="LOGIN_USER";
  // ACTIONS :: Login Action
  export function UserLoginAction(payload) {
    // MAKE SURE redux-thunk is installed.
    console.log(payload);
    return async (dispatch) => {
      // WE HV TO CALL THE SPRINT1 / SPRING BOOT
      try {
        const url = "http://localhost:8080/api/user/login/";
        const requestBody = { ...payload,userType:"user" };
  
        // HTTP Client
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
  
        const user = await response.json();
        sessionStorage.setItem("user", JSON.stringify(user));
        
        console.log(user)
        if (user) {
          // UPDATE THE UI
          dispatch({ type: LOGIN_ACTION, payload: payload });
          dispatch({type: LOGIN_USER,payload:user});
        } else {
          dispatch({type: LOGIN_ERROR, payload: payload})
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  // REDUCER LOGIC
  export function UserLoginReducer(state = initState, action) {
    switch (action.type) {
      case LOGIN_ACTION:
        return { ...state, loginAction: true };
      case LOGIN_ERROR:
        return{ ...state, loginAction: false }
      case LOGIN_USER:
        return{ ...state,userRefDetails:action.payload } 
      default:
        return state;
    }
  }
  console.log(initState.userRefDetails)