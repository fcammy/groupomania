const UserProfile = () => {
  return (
    <section>
      <div className="row text-center">
        <div className="col-md-4 mb-5 mb-md-0">
          <div className="card testimonial-card">
            <div className="card-up"></div>
            <div className="avatar mx-auto bg-white">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                className="rounded-circle img-fluid"
                alt=""
              />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Facinet Camara</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
                amet eos adipisci, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
