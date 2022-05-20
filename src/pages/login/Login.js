import { API_URL } from "../../config";
import LoginForm from "../../components/Forms/Login";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Login = () => {
  const { setProfile } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const [message, setMessage] = useState({});
  const submit = async (data) => {
    try {
      const res = await axios.post(
        `${API_URL}/login`,

        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      //console.log(JSON.stringify(data));
      //console.log(res);

      const token = res.data.token;

      localStorage.setItem("token", token);

      let profile = await fetch("http://localhost:4000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      profile = await profile.json();

      setProfile({ ...profile, token });

      // set message & checking if response is ok

      setMessage({ type: "success", message: res.message });

      if (token) {
        setMessage({ type: "success", message: "You are logged in" });
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (ex) {
      console.log({ ex });
      if (ex.response.data.message) {
        setMessage({ type: "danger", message: ex.response.data.message });
      } else {
        setMessage({ type: "danger", message: ex.message });
      }
    }
  };

  return (
    <div className="section w-100">
      <div className="">
        <div className="col-lg-5 mx-auto">
          <div className="p-5">
            <LoginForm submit={submit}>
              {Object.keys(message).length > 0 && (
                <div className={`text-center mt-4 alert alert-${message.type}`}>
                  {message.message}
                </div>
              )}
            </LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
