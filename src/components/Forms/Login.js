import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ submit }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(data);

    if (Object.keys(errors).length === 0) {
      submit(data);
      window.location.replace("/home");
    } else {
      setInputErrors(errors);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};

    if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="display-5 text-center mb-5">Login</h2>
      <div className=" form-outline mb-4">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className={`form-control ${inputErrors.email && "is-invalid"}`}
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Please enter your email"
        />
        <div className="invalid-feedback">{inputErrors.email}</div>
      </div>
      <div className=" form-outline mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${inputErrors.password && "is-invalid"}`}
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <div className="invalid-feedback">{inputErrors.password}</div>
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Login
      </button>
      <div className="text-center">
        <p>
          Not a member? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
