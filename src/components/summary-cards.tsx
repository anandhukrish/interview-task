import React from "react";
import CaseSummaryCard from "./case-summary-card";
import { Activity, Heart, Skull, Users } from "lucide-react";
import { useAppSelector } from "@/store";

const SummaryCards = () => {
  const { allCountrySummary, regionalData, selectedState } = useAppSelector(
    (state) => state.covid
  );

  const filteredData = regionalData.filter(
    (region) => region.state === selectedState
  );

  const covidDatatoBeShown =
    filteredData.length === 0 ? allCountrySummary : filteredData[0];
  return (
    <div className="grid mdgrid-cols-2 lg:grid-cols-4 gap-5">
      <CaseSummaryCard
        title="Total Cases"
        count={covidDatatoBeShown.totalCases}
        icon={<Users className="size-10 text-blue-500" />}
      />
      <CaseSummaryCard
        title="Active Cases"
        count={covidDatatoBeShown.activeCases}
        icon={<Activity className="size-10 text-yellow-500" />}
      />
      <CaseSummaryCard
        title="Recovered"
        count={covidDatatoBeShown.recovered}
        icon={<Heart className="size-10 text-green-500" />}
      />
      <CaseSummaryCard
        title="Deaths"
        count={covidDatatoBeShown.deaths}
        icon={<Skull className="size-10 text-red-500" />}
      />
    </div>
  );
};

export default SummaryCards;
