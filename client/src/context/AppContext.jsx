import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelRg, setShowHotelReg] = useState(false);
  const [searchedCities,setSearchedCities]=useState([]);
  const fetchUser = async () => {
    try {
     const {data}= await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success){
        setIsOwner(data.role=="hotelOwner")
        setSearchedCities(data.recentSearchedCities);

      }else{
        //Retry fetching user details after 5 sec
        setTimeout(()=>{
            fetchUser()
        },5000)
      }
    } catch (error) {}
  };

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelRg,
    setShowHotelReg,
  };

  return <AppContext.Provider value={value}>{childern}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
