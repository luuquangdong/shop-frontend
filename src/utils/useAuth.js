import { useAuthAxios } from "apis/base";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInSuccess, logOut } from "redux/authSlice";
import { setRole } from "redux/roleSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.role);
  const { token } = useSelector((state) => state.auth);
  const authAxios = useAuthAxios();

  useEffect(() => {
    // console.log("effect", token, role);
    if (token && !role) {
      authAxios
        .get("/users/role")
        .then((res) => {
          dispatch(setRole(res.data.role));
        })
        .catch((e) => {
          logout();
        });
    }
  }, []);

  const login = (token, role) => {
    dispatch(setRole(role));
    dispatch(logInSuccess(token));
  };
  const logout = () => {
    dispatch(setRole(""));
    dispatch(logOut());
  };

  const getRole = () => {
    return role;
  };

  return { login, logout, getRole, token, role };
}
