import RegisterForm from "../components/Forms/Register";

const Register = () => {
  const submit = (data) => {
    console.log(data);
    fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return <RegisterForm submit={submit} />;
};

export default Register;
