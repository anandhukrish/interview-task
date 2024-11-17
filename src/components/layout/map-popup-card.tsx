import { MappedStateData } from "@/store/covid/covid.slice";
import React from "react";

const MapPopupCard = ({ region }: { region: MappedStateData }) => {
  return (
    <div>
      <div className="font-bold mb-2">{region.state}</div>
      <div className="flex flex-col">
        <div>
          <b>Total :</b> {region.totalCases}
        </div>
        <div>
          <b> Active :</b> {region.activeCases}
        </div>
        <div>
          <b> Recovered :</b> {region.recovered}
        </div>
        <div>
          <b> Deaths :</b> {region.deaths}
        </div>
      </div>
    </div>
  );
};

export default MapPopupCard;
