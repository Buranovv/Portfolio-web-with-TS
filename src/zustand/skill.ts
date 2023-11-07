import UniversalData from "../types/universalData";
import crud from "./crud";

const useSkill = crud<UniversalData>("skills");

export default useSkill;
