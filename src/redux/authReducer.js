const initialState = {
  is_login: true,
  users: [],
  roles: "Customer",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, is_login: action.payload };
    case "SET_USERS":
      return { ...state, users: action.value };
    case "SET_ROLE":
      return { ...state, roles: action.value };
    case "CREATE_ROLE":
      return { ...state, roles: [...state.roles, action.value] };
    case "DELETE_ROLE":
      return {
        ...state,
        roles: state.roles.filter((data) => data.id != action.value),
      };
    case "UPDATE_ROLE":
      return {
        ...state,
        roles: state.roles.map((_data) =>
          _data.id === action.value.id
            ? { ..._data, ...action.value.data }
            : _data
        ),
      };
    default:
      return state;
  }
};

export default authReducer;
