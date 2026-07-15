import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, setotherusers } from "../redux/userSlice";
import { serverUrl } from "../main";
import { useSelector } from "react-redux";
const Getotheruser = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
     if (!user) return
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/others`,
          {
            withCredentials: true,
          }
        );

        dispatch(setotherusers(result.data.users)); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user]);

  return null;
};

export default Getotheruser