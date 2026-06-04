import API from "../../API";
import { CREATE, UPDATE } from "../constants";

export const pingToCheckUser = async () => {
  try {
    const response = await API.get("/users/exists");
    return { ...response.data, proceed: true };
  } catch (err) {
    console.log(err);
    return { proceed: false };
  }
};

export const createOrUpdateUser = async (name, mode) => {
  try {
    let URL = "";
    if (mode === CREATE) URL = "/users/create";
    else if (mode === UPDATE) URL = "/users/update-name";
    else return { proceed: false };

    const response = await API.post(URL, { name });
    return { ...response.data, proceed: true };
  } catch (err) {
    console.log(err);
    return { proceed: false };
  }
};

// export const updateName = async (name) => {
//   try {
//     const response = await API.post("/user/update-name", { name });
//     return { ...response.data, proceed: true };
//   } catch (err) {
//     console.log(err);
//     return { proceed: false };
//   }
// };
