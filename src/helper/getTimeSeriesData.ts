import { MappedCountryData, MappedStateData } from "@/store/covid/covid.slice";

export const getTimeSeriesData = (
  data: MappedCountryData | MappedStateData,
  days: number = 7
) => {
  const timeSeriesData = [];

  const activeCasesVariation = Math.round(data.activeCases / days);
  const deathsVariation = Math.round(data.deaths / days);
  const recoveredVariation = Math.round(data.recovered / days);

  for (let i = 0; i < days; i++) {
    const date = new Date();

    date.setDate(date.getDate() - (days - i));

    const formatedDate = date.toISOString().split("T")[0];

    const activeCases = Math.max(
      0,
      data.activeCases +
        Math.round(Math.random() * activeCasesVariation + 50000) * i +
        1
    );
    const deaths = Math.max(
      0,
      data.deaths + Math.round(Math.random() * deathsVariation - 50) * i + 1
    );
    const recovered = Math.max(
      0,
      data.recovered / (recoveredVariation * i) +
        Math.round(Math.random() * recoveredVariation)
    );
    const total = activeCases + deaths + recovered;

    timeSeriesData.push({
      date: formatedDate,
      activeCases,
      deaths,
      recovered,
      total,
    });
  }
  return timeSeriesData;
};
