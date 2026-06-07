import { Grid, Stack } from "@mui/joy";
import React from "react";
import Header from "../components/Header";
import StatCards from "../components/StatCards";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { accentColor } from "../utils/constants";
import DemandCard from "../components/DemandCard";
import { getDashboardCards, getDashboardStats } from "../utils/APIs/project";
import Demand from "./Demand";
import { useDemands } from "../store/state";

const DemandDashboard = () => {
  const { demandCards, stats, setDemandCards, setStats } = useDemands();
  const [demandDetails, setDemandDetails] = React.useState({
    show: false,
    index: -1,
  });
  React.useEffect(() => {
    const fetchStats = async () => {
      const resp = await getDashboardStats();
      if (resp.status) {
        setStats(resp.payload);
      }
    };

    const fetchCards = async () => {
      const resp = await getDashboardCards();
      if (resp.status) {
        setDemandCards(resp.payload);
      }
    };
    if (!demandCards.length > 0) {
      fetchStats();
      fetchCards();
    }
  }, []);
  console.log(demandCards);

  return (
    <>
      {demandDetails.show ? (
        <Demand
          index={demandDetails.index}
          setDemandDetails={setDemandDetails}
        />
      ) : (
        <Stack sx={{ width: "100%", height: "100dvh" }} gap={3}>
          <Header
            pageTitle="Demands"
            pageSubTitle="Organise and Excel"
            pageIndex={0}
          />
          <Stack direction="row" gap={2} sx={{ px: 2 }}>
            <StatCards
              title="TOTAL"
              value={stats?.total || 0}
              accentColor={accentColor[0]}
            />
            <StatCards
              title="ACTIVE"
              value={stats?.active || 0}
              accentColor={accentColor[1]}
            />
            <StatCards
              title="COMPLETED"
              value={stats?.completed || 0}
              accentColor={accentColor[2]}
            />
            <StatCards
              title="FILES"
              value={stats?.filesCount || 0}
              accentColor={accentColor[3]}
            />
          </Stack>
          <Stack
            direction="row"
            gap={2}
            sx={{ px: 2, alignItems: "center", justifyContent: "flex-start" }}
          >
            <SearchBar />
            <Filters />
          </Stack>
          <Grid
            container
            spacing={2}
            sx={{ px: 2, width: "100%", overflowY: "scroll" }}
          >
            {demandCards.map((val, index) => {
              return (
                <Grid
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={index}
                  onClick={() => {
                    setDemandDetails({ show: true, index: index });
                  }}
                >
                  <DemandCard
                    title={`${val.demandId}: ${val.projectName}`}
                    subtitle={val.integrationDetails}
                    projectId={val.projectId}
                    status={val.statusName}
                    priority={val.priority}
                    createdAt={val.createdAt}
                    cr={val.crNumber}
                    filesCount={val.filesCount}
                    color={val.accentColor}
                    statusId={val.status}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default DemandDashboard;
