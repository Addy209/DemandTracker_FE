import API from "../../API";

export const getMetaListByProjectId = async (projectId) => {
  try {
    const response = await API.get("/meta/list/" + projectId);
    return { ...response.data };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { proceed: false };
  }
};
