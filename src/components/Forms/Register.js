import { Link } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../config";

const RegisterForm = ({ submit, children }) => {
  // set state for form
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
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

    if (!data.name) errors.name = "Name is required";
    if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";

    return errors;
  };

  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      let url = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      url = await url.json();

      setData({ ...data, image: url.filename });
    } catch (ex) {
      console.log({ ex });
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="form-outline mb-4 form-floating">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${
                          inputErrors.name && "is-invalid"
                        }`}
                      />
                      <div className="invalid-feedback">{inputErrors.name}</div>
                      <label className="form-label" htmlFor="name">
                        Your name
                      </label>
                    </div>

                    <div className="form-outline mb-4 form-floating">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${
                          inputErrors.email && "is-invalid"
                        }`}
                      />
                      <div className="invalid-feedback">
                        {inputErrors.email}
                      </div>
                      <label className="form-label" htmlFor="email">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4 form-floating">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        className={`form-control form-control-lg ${
                          inputErrors.password && "is-invalid"
                        }`}
                      />
                      <div className="invalid-feedback">
                        {inputErrors.password}
                      </div>
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <div class="mb-3">
                        <label for="formFile" class="form-label"></label>
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          onChange={handleUpload}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg  text-white"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
