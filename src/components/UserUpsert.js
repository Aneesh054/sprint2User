import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUserAction, updateUserAction } from "../redux/UserReducer";
//capture information
export function UserUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [user_name, setUserName] = useState(state.user.refuser.user_name);
  const [user_email, setUserEmail] = useState(state.user.refuser.user_email);
  const [user_password, setUserPassword] = useState(
    state.user.refuser.user_password
  );
  const [user_mobile, setUserMobile] = useState(state.user.refuser.user_mobile);
  const [user_type, setUserType] = useState(state.user.refuser.user_type);

  const [successoperation, setSuccessOperation] = useState(false);
  const [unsuccessoperation, setUnSuccessOperation] = useState(false);

  const UpdateUserName = (e) => setUserName(e.target.value);
  const UpdateUserEmail = (e) => setUserEmail(e.target.value);
  const UpdateUserPassword = (e) => setUserPassword(e.target.value);
  const UpdateUserMobile = (e) => setUserMobile(e.target.value);
  const UpdateUserType = (item) => setUserType(item);

  const register = (e) => {
    e.preventDefault();
    console.log(user_name, user_password, user_type, user_email, user_mobile);
    dispatch(
      createUserAction({
        user_name,
        user_password,
        user_type,
        user_email,
        user_mobile,
      })
    );

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    //history.push("/list-user")

    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserMobile("");
    setUserType("");
  };

  const updateUser = () => {
    dispatch(
      updateUserAction({
        user_id: state.user.refuser.user_id,
        user_name,
        user_password,
        user_type,
        user_email,
        user_mobile,
      })
    );

    // reset the form
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserMobile("");
    setUserType("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary d-flex justify-content-center">
          {state.user.refuser.user_id ? "Update User" : "User Registration"}
        </h3>

        {successoperation && (
          <div className="alert alert-success d-flex justify-content-center mb-1 p-2">
            User Details Added
          </div>
        )}

        {unsuccessoperation && (
          <div className="alert alert-danger d-flex justify-content-center mb-1 p-2">
            User Details Not Added
          </div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={user_name}
            onChange={(e) => UpdateUserName(e)}
            className="form-control"
            placeholder="Enter userName"
          />
        </div>
        <div className="mb-1">
          <input
            type="password"
            value={user_password}
            onChange={(e) => UpdateUserPassword(e)}
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-1">
          <input
            type="text"
            value={user_email}
            onChange={(e) => UpdateUserEmail(e)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-1">
          <input
            type="text"
            value={user_mobile}
            onChange={(e) => UpdateUserMobile(e)}
            className="form-control"
            placeholder="Enter mobile"
          />
        </div>
        <div className="mb-1">
          <div>
          <input
            type="radio"
            name="user_type"
            value={user_type}
            onClick={() => UpdateUserType("user")}
            
           />
           user
           </div>
           <div>
           <input
            type="radio"
            name="user_type"
            value={user_type}
            onClick={() => UpdateUserType("admin")}
            
           />
           admin
           </div>
        </div>
        <div className="mb-1">
          {state.user.refuser.user_id ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update User"
              onClick={() => updateUser()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="REGISTER"
              onClick={(e) => register(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3 d-none d-md-block"></div>
    </div>
  );
}