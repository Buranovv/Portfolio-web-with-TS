import UniversalData from "../types/universalData";
import crud from "./crud";

const useExperience = crud<UniversalData>("experiences");

export default useExperience;
