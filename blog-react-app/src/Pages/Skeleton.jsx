export default function Sekelton() {
  return (
    <>
      <header className="masthead">
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading placeholder-glow">
                <h1>
                  <span className="placeholder col-6 mb-2"></span>
                </h1>
                <span className="subheading placeholder col-6 mb-2 mx-auto"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Skeleton Loader */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-4">
                <div className="placeholder-glow">
                  <div className="placeholder col-6 mb-2"></div>
                  <div className="placeholder col-4 mb-2"></div>
                </div>
                <div className="placeholder-glow">
                  <div
                    className="placeholder w-100 mb-2"
                    style={{ height: "1.5rem" }}
                  ></div>
                  <div
                    className="placeholder w-100 mb-2"
                    style={{ height: "1.5rem" }}
                  ></div>
                  <div
                    className="placeholder col-8"
                    style={{ height: "1.5rem" }}
                  ></div>
                </div>
                <hr className="my-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
