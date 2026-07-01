import API from "../../API";

export const fetchStatusFileMapping = async (key) => {
  try {
    const response = await API.get("/statusfilemapping/fetch/" + key);
    return { ...response.data };
  } catch (err) {
    console.log(err);
    return { proceed: false };
  }
};

export const fetchAllStatusFileMapping = async () => {
  try {
    const response = await API.get("/statusfilemapping/fetch/all");
    return { ...response.data };
  } catch (err) {
    console.log(err);
    return { proceed: false };
  }
};
