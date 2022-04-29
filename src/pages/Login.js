import LoginForm from "../components/Forms/Login";

const Login = () => {
  const submit = (data) => {
    console.log(data);
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="shadow p-5">
            <LoginForm submit={submit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
