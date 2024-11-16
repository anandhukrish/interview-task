import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LatLngExpression } from "leaflet";

type CountrySummary = {
  total: number;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
  confirmedButLocationUnidentified: number;
};

type RegionalSummary = {
  loc: string;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
  totalConfirmed: number;
};

type CovidApiResponse = {
  success: boolean;
  data: {
    summary: CountrySummary;
    regional: RegionalSummary[];
  };
};

export type MappedCountryData = {
  totalCases: number;
  activeCases: number;
  deaths: number;
  recovered: number;
};

export type MappedStateData = {
  totalCases: number;
  activeCases: number;
  deaths: number;
  recovered: number;
  state: string;
  coords: LatLngExpression;
};

const BASE_URL = "https://api.rootnet.in/covid19-in/stats/latest";

export const getCovidStatus = createAsyncThunk(
  "covid/getCovidStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CovidApiResponse>(BASE_URL);
      const countryData = response.data?.data?.summary;
      const stateData = response.data?.data?.regional;
      const CountrySummaryData: MappedCountryData = {
        totalCases: countryData.total,
        activeCases:
          countryData.confirmedCasesIndian -
          countryData.deaths -
          countryData.discharged,
        deaths: countryData.deaths,
        recovered: countryData.discharged,
      };

      const mappedCountryData: MappedStateData[] = stateData.map((state) => ({
        state: state.loc,
        totalCases: state.totalConfirmed,
        activeCases:
          state.confirmedCasesIndian - state.deaths - state.discharged,
        deaths: state.deaths,
        recovered: state.discharged,
        coords: getCoordinates(state.loc),
      }));
      return { CountrySummaryData, mappedCountryData };
    } catch {
      console.log(rejectWithValue);
    }
  }
);

function getCoordinates(state: string): [number, number] {
  const coordinatesMap: { [key: string]: [number, number] } = {
    "Andhra Pradesh": [15.9129, 79.74],
    "Arunachal Pradesh": [28.218, 94.7278],
    Assam: [26.2006, 92.9376],
    Bihar: [25.0961, 85.3131],
    Chhattisgarh: [21.2787, 81.8661],
    Goa: [15.2993, 74.124],
    Gujarat: [22.2587, 71.1924],
    Haryana: [29.0588, 76.0856],
    "Himachal Pradesh": [31.1048, 77.1734],
    Jharkhand: [23.6102, 85.2799],
    Karnataka: [15.3173, 75.7139],
    "Kerala***": [10.3528744, 76.5120396],
    "Madhya Pradesh": [22.9734, 78.6569],
    Maharashtra: [19.7515, 75.7139],
    Manipur: [24.6637, 93.9063],
    Meghalaya: [25.467, 91.3662],
    Mizoram: [23.1645, 92.9376],
    Nagaland: [26.1584, 94.5624],
    Odisha: [20.9517, 85.0985],
    Punjab: [31.1471, 75.3412],
    Rajasthan: [27.0238, 74.2179],
    Sikkim: [27.533, 88.5122],
    "Tamil Nadu": [11.1271, 78.6569],
    Telangana: [17.1232, 79.2088],
    Tripura: [23.9408, 91.9882],
    UttarPradesh: [26.8467, 80.9462],
    Uttarakhand: [30.0668, 79.0193],
    WestBengal: [22.9868, 87.855],
    "Andaman and Nicobar Islands": [11.7401, 92.6586],
    Chandigarh: [30.7333, 76.7794],
    "Dadra and Nagar Haveli and Daman and Diu": [20.3974, 72.8328],
    Lakshadweep: [10.5667, 72.6417],
    Delhi: [28.7041, 77.1025],
    Puducherry: [11.9416, 79.8083],
    "Jammu and Kashmir": [33.7782, 76.5762],
    Ladakh: [34.1526, 77.5771],
  };

  return coordinatesMap[state] || [0, 0];
}

type State = {
  allCountrySummary: MappedCountryData;
  regionalData: MappedStateData[];
  loading: boolean;
  error: string;
  selectedState: string;
};

const initialState: State = {
  allCountrySummary: {
    totalCases: 0,
    activeCases: 0,
    recovered: 0,
    deaths: 0,
  },
  regionalData: [],
  loading: false,
  error: "",
  selectedState: "All States",
};

const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,

  reducers: {
    setSelect: (state, action) => {
      state.selectedState = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCovidStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCovidStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.allCountrySummary = action.payload?.CountrySummaryData;
          state.regionalData = action.payload?.mappedCountryData;
        }
      })
      .addCase(getCovidStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default covidSlice.reducer;

export const { setSelect } = covidSlice.actions;
