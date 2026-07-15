import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { serverUrl } from "../main";

const Getcurrentuser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          {
            withCredentials: true,
          }
        );
        

        dispatch(login(result.data.user));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
};

export default Getcurrentuser;