import LoginForm from "../components/Forms/Login";

const Login = () => {
  const submit = (data) => {
    console.log(data);
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="section">
      <div className="">
        <div className="col-md-5 mx-auto">
          <div className="shadow p-5">
            <LoginForm submit={submit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
