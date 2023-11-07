import UniversalData from "../types/universalData";
import crud from "./crud";

const useUsers = crud<UniversalData>("users");

export default useUsers;
