import { API_URL } from "../config";
import LoginForm from "../components/Forms/Login";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
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

      console.log(JSON.stringify(data));

      const token = res.data.token;

      setAuth({ data, token });

      // set message & checking if response is ok

      setMessage({ type: "success", message: res.message });

      if (res.status === 200) {
        setMessage({ type: "success", message: "You are logged in" });
      }
      setTimeout(() => navigate("/home"), 1000);
    } catch (ex) {
      setMessage({ type: "danger", message: ex.message });
      if (!ex.res) {
        setMessage({ type: "danger", message: "No server response" });
      } else if (ex.res.status === 400) {
        setMessage({ type: "danger", message: "Missing username or password" });
      } else if (ex.res.status === 401) {
        setMessage({ type: "danger", message: "Unauthorised" });
      } else {
        setMessage({ type: "danger", message: "Unknown error" });
      }
    }
  };

  return (
    <div className="section">
      <div className="">
        <div className="col-md-5 mx-auto">
          <div className="shadow p-5">
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
