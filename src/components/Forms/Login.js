import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ submit, children }) => {
  // set state for form

  const [data, setData] = useState({ email: "", password: "" });

  // set state for errors
  const [inputErrors, setInputErrors] = useState({});

  // handle submit

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(data);

    if (Object.keys(errors).length === 0) {
      submit(data);
    } else {
      setInputErrors(errors);
    }
  };

  // handle event change

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // validate form
  const validate = () => {
    const errors = {};

    if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";

    return errors;
  };

  return (
    <section className=" container h-100 gradient-form">
      <div className="py-5 h-50">
        <div className=" justify-content-center align-items-center h-75">
          <div className="col-xl">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pt-3">Welcome to Groupomania</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          className={`form-control ${
                            inputErrors.email && "is-invalid"
                          }`}
                          placeholder="Please enter your email address"
                        />
                        <div className="invalid-feedback">
                          {inputErrors.email}
                        </div>
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          className={`form-control ${
                            inputErrors.password && "is-invalid"
                          }`}
                          placeholder="Please enter your password"
                        />
                        <div className="invalid-feedback">
                          {inputErrors.password}
                        </div>
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg mb-3 "
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link
                          to="/register"
                          type="submit"
                          className="btn btn-outline-danger"
                        >
                          Create new
                        </Link>
                      </div>
                      {children}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
