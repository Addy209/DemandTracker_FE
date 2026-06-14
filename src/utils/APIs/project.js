import API from "../../API";

export const createProject = async (data) => {
  try {
    const response = await API.post("/projects/create", data);
    return { ...response.data };
  } catch (error) {
    console.error("Error creating project:", error);
    return { proceed: false };
  }
};

export const getDashboardCards = async () => {
  try {
    const response = await API.get("/projects/fetch-dashboard-cards");
    return { ...response.data };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { proceed: false };
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await API.get("/projects/fetch-dashboard-stats");
    return { ...response.data };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { proceed: false };
  }
};

export const getDemandById = async (projectId) => {
  try {
    const response = await API.get("/projects/demandDetails/" + projectId);
    return { ...response.data };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { proceed: false };
  }
};
