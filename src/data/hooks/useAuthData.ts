import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuthData = () => useContext(AuthContext)

export default useAuthData