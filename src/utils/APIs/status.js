import API from "../../API";

export const fetchAllStatus = async () => {
  try {
    const response = await API.get("/status/fetch");
    return { ...response.data, proceed: true };
  } catch (err) {
    console.log(err);
    return { proceed: false };
  }
};
