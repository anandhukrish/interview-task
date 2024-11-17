import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Card } from "./ui/card";
import { useAppSelector } from "@/store";
import { MappedCountryData, MappedStateData } from "@/store/covid/covid.slice";
import { LatLngExpression, Marker as LeafletMarker } from "leaflet";
import MapPopupCard from "./layout/map-popup-card";

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

        {regionalData.length > 0 &&
          regionalData.map((region, i) => (
            <React.Fragment key={`regin-${i}`}>
              <Marker position={region.coords}>
                <Popup>
                  <MapPopupCard region={region} />
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        {selectedState === "All States" && (
          <ChangeMapCenter coords={[10.3528744, 76.5120396]} />
        )}

        {covidDatatoBeShown && isMappedStateData(covidDatatoBeShown) && (
          <>
            <ChangeMapCenter
              coords={covidDatatoBeShown.coords}
              region={covidDatatoBeShown}
            />
          </>
        )}
      </MapContainer>
    </Card>
  );
};

export default MapCard;

function ChangeMapCenter({
  coords,
  region,
}: {
  coords: LatLngExpression;
  region?: MappedStateData;
}) {
  const map = useMap();
  const popupRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    map.setView(coords, 6, {
      animate: true,
      duration: 0.5,
    });
    if (popupRef.current) {
      popupRef.current.openPopup();
    }
  }, [coords]);

  if (!region) return null;

  return (
    <Marker position={region.coords} ref={popupRef}>
      <Popup>
        <MapPopupCard region={region} />
      </Popup>
    </Marker>
  );
}
