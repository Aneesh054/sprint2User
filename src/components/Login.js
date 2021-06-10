import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../redux/UserReducer";

export function Login() {
  const formUser = useRef();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const state = useSelector((state) => state);

  const [userName, setUserName] = useState(state.user.refuser.userName);
  const [userPassword, setUserPassword] = useState(
    state.user.refuser.userPassword
  );

  const [successoperation, setSuccessOperation] = useState(false);
  const [unsuccessoperation, setUnSuccessOperation] = useState(false);

  const UpdateUserName = (e) => setUserName(e.target.value);
  const UpdateUserPassword = (e) => setUserPassword(e.target.value);

  const updateLogin = (e) => {
    console.log(userName, userPassword);
    e.preventDefault();
    if (formUser.current.checkValidity() === false) {
      // hanlde the false case
      e.preventDefault();
      e.stopPropagation();
      formUser.current.classList.add("was-validated");
      setUnSuccessOperation(true);
      setTimeout(() => {
        setUnSuccessOperation(false);
      }, 5000);

      if (!/^[a-zA-z0-9@#!$*&%]{8,12}$/.test(userPassword)) {
        setMessage("Invalid password");
      }

      if (!/^[a-zA-Z0-9. ]{3,}$/.test(userName)) {
        setMessage("Invalid User Name");
      }
    } else {
      dispatch(userLoginAction({ userName, userPassword }));
    }
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary d-flex justify-content-center">
          LOGIN
        </h3>
        {successoperation && (
          <div className="alert alert-success d-flex justify-content-center mb-1 p-2">
            Login Successfull
          </div>
        )}

        {unsuccessoperation && (
          <div className="alert alert-danger d-flex justify-content-center mb-1 p-2">
            {message}
          </div>
        )}
        <div>
          <form ref={formUser} className="needs-validation" noValidate>
            <div className="mb-1">
              <input
                type="text"
                value={userName}
                onChange={(e) => UpdateUserName(e)}
                className="form-control"
                placeholder="Enter userName"
                pattern="[a-zA-Z0-9. ]{3,}"
                required
              />
            </div>
            <div className="mb-1">
              <input
                type="password"
                value={userPassword}
                onChange={(e) => UpdateUserPassword(e)}
                className="form-control"
                placeholder="Enter password"
                pattern="[a-zA-z0-9@#!$*&%]{8,12}"
                required
              />
            </div>
            <div>
              <input
                type="button"
                className="btn btn-secondary w-100"
                value="LOGIN"
                onClick={(e) => updateLogin(e)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="col-3 col-md-3 d-none d-md-block"></div>
    </div>
  );
}
