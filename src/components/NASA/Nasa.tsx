import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNasa } from "../../store/slices/reducer";
import { RoverList } from "./roverList";
import { CameraList } from "./cameraList";

const Nasa = () => {
  const dispatch: any = useDispatch();
  const nasa = useSelector((state: any) => {
    console.log(state.list);
    return state.list;
  });
  const [date, setDate] = useState("2015-06-30");
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("ALL");

  useEffect(() => {
    dispatch(loadNasa(rover, camera, date));
  }, [dispatch]);

  return (
    <div>
      <section className="py-2 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">NASA mars rover photos</h1>
            <p className="lead text-muted">
              Select the rover, camara and a date to see how many photos were
              captured by NASA Mars Rover
            </p>
            <div className="row g-3">
              <div className="col-sm-4">
                <label className="form-label">Rover</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={rover}
                  onChange={(e) => setRover(e.target.value)}
                >
                  {RoverList.map((value: any) => (
                    <option key={value.name} value={value.name}>
                      {value.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-sm-4">
                <label className="form-label">Camera</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                >
                  {CameraList.map((value: any) => (
                    <option key={value.name} value={value.name}>
                      {value.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-sm-4">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={date}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="2021-01-01"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <label className="form-label"> </label>
            </div>
            <p></p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => dispatch(loadNasa(rover, camera, date))}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {nasa.map((value: any) => (
              <div className="col" key={value.id}>
                <div className="card shadow-sm">
                  <img
                    src={value.img_src}
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                  ></img>

                  <div className="card-body">
                    <p className="card-text">{value.rover.name}</p>
                    <p className="card-text">{value.camera.full_name}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{value.earth_date}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nasa;
