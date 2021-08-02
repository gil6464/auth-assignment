export const logIn = () => {
  return {
    type: "LOGIN",
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const setUserId = id => {
  return {
    type: "SET_USER_ID",
    payload: id,
  };
};
