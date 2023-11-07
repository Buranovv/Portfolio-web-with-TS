import UniversalData from "../types/universalData";
import crud from "./crud";

const useEducation = crud<UniversalData>("education");

export default useEducation;
