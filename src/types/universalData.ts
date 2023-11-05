import PhotoData from "./photo";
import Universal from "./universal";

interface UniversalData {
  _id: string;
  percent: number;
  name: string;
  user: Universal;
  level: string;
  description: string;
  photo: PhotoData;
  startDate: string;
  endDate: string;
  workName: string;
  companyName: string;
  url: string;
  map: (func: object) => void;
}

export default UniversalData;
