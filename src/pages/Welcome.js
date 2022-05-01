import Footer from "../components/Footer";
import Header from "../components/Header";
const Welcome = () => (
  <>
    <Header />
    <div className="main">
      <h1 className="display-5 fst-italic text-light">
        {" "}
        Welcome to Groupomania
      </h1>

      <p className="lead text-light mt-3">
        Please login or register to continue
      </p>
    </div>
    <Footer />
  </>
);

export default Welcome;
