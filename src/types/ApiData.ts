import UniversalData from "./universalData";

interface ApiData {
  pagination: {
    total: number;
  };
  data: UniversalData[];
}

export default ApiData;
