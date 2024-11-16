import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Card, CardTitle } from "./ui/card";
import { useAppSelector } from "@/store";
import { MappedCountryData, MappedStateData } from "@/store/covid/covid.slice";
import { LatLngExpression } from "leaflet";

const MapCard = () => {
  const { allCountrySummary, regionalData, selectedState } = useAppSelector(
    (state) => state.covid
  );

  const filteredData = regionalData.filter(
    (region) => region.state === selectedState
  );

  const covidDatatoBeShown: MappedCountryData | MappedStateData =
    filteredData.length === 0 ? allCountrySummary : filteredData[0];

  function isMappedStateData(
    data: MappedCountryData | MappedStateData
  ): data is MappedStateData {
    return "coords" in data;
  }

  return (
    <Card className="h-[450px] w-full relative">
      <MapContainer
        center={[10.3528744, 76.5120396]}
        zoom={6}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {regionalData &&
          regionalData.length > 0 &&
          regionalData.map((region, i) => (
            <React.Fragment key={`regin-${i}`}>
              <Marker position={region.coords}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        {selectedState === "All States" && (
          <ChangeMapCenter coords={[10.3528744, 76.5120396]} />
        )}

        {covidDatatoBeShown && isMappedStateData(covidDatatoBeShown) && (
          <ChangeMapCenter coords={covidDatatoBeShown.coords} />
        )}
      </MapContainer>
    </Card>
  );
};

export default MapCard;

function ChangeMapCenter({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 6);
  }, [coords]);

  return null;
}
