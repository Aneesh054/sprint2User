import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteUserAction,
  getAllUserAction,
  getByIdUserAction,
  updateRefUser,
} from "../redux/UserReducer";

export function UserList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successoperation, setSuccessOperation] = useState(false);
  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  const deleteUser = (item, index) => {
    dispatch(deleteUserAction(index));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 3000);
  };

  const updateUser = (item) => {
    dispatch(updateRefUser(item));

    history.push("/create-user");
  };
  const getUserById = (item) => {
    dispatch(getByIdUserAction(item));
  };
  return (
    <div className="row">
      <div className="col-3 col-md-2 d-none d-md-block"></div>
      <div className="col-12 col-md-8">
        <h3 className="alert alert-secondary d-flex justify-content-center">
          List of Users
        </h3>

        {successoperation && (
          <div className="alert alert-danger d-flex justify-content-center mb-1 p-2">
            User Details Deleted
          </div>
        )}
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">#UserId</th>
              <th scope="col">UserName</th>
              <th scope="col">UserEmail</th>
              <th scope="col">UserMobile</th>
              <th scope="col">UserPassword</th>
              <th scope="col">UserType</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {[...state.user.list].map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.user_id}</th>
                <td>{item.user_name}</td>
                <td>{item.user_email}</td>
                <td>{item.user_mobile}</td>
                <td>{item.user_password}</td>
                <td>{item.user_type}</td>
                <td>
                  <input
                    type="button"
                    onClick={() => updateUser(item)}
                    value="EDIT"
                    className="btn btn-link text-secondary"
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="DELETE"
                    onClick={() => deleteUser(item, index)}
                    className="btn btn-link text-danger"
                  />
                </td>
                <td>
                  <input
                    type="button"
                    onClick={() => getUserById(item)}
                    value="Detail"
                    className="btn btn-link"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="col-3 col-md-2 d-none d-md-block"></div>
     
    </div>
  );
}
