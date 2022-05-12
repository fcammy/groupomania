import { useState } from "react";
import { API_URL } from "../../config";
import RegisterForm from "../../components/Forms/Register";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({});
  const submit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      if (!res.ok) throw Error(json.message);

      setMessage({ type: "success", message: json.message });

      setTimeout(() => navigate("/login"), 3000);

      //console.log(json);
    } catch (ex) {
      setMessage({ type: "danger", message: ex.message });
    }
  };
  return (
    <>
      <RegisterForm submit={submit}>
        {Object.keys(message).length > 0 && (
          <div className={`text-center mt-4 alert alert-${message.type}`}>
            {message.message}
          </div>
        )}
      </RegisterForm>
    </>
  );
};

export default Register;
