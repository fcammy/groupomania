import { useState } from "react";

const LoginForm = ({ submit }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(data);

    if (Object.keys(errors).length === 0) {
      submit(data);
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
      <h2 className="display-4 text-center mb-5">Login</h2>
      <div className="mb-3">
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
          placeholder="name@example.com"
        />
        <div className="invalid-feedback">{inputErrors.email}</div>
      </div>
      <div className="mb-3">
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
          placeholder="1234456m"
        />
        <div className="invalid-feedback">{inputErrors.password}</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
