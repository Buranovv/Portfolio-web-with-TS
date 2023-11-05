import UniversalData from "../types/universalData";
import crud from "./crud";

const usePortfolio = crud<UniversalData>("portfolios");

export default usePortfolio;
