import { Body, Column } from "./Utility";
import logo from "../assets/company_logo.jpeg";
import { useSelector } from "react-redux";

const card = {
  borderRadius: "10px",
  background: "white",
  overflow: "clip",
};

const Jobs = () => {
  const jobs = useSelector((state) => state.jobs);
  return (
    <div style={{ height: "100dvh" }}>
      <Body>
        <Column className={"col-12 col-lg-9"}>
          <div className="my-3" style={card}>
            <div className="p-3">
              <div className="fw-m fs-m">Job picks for you</div>
              <div className="text-secondary fs-s">Based on your profile</div>
            </div>
            {jobs.map((job) => (
              <div
                className="d-flex align-items-center px-3 cursor-p"
                style={{ borderBottom: "1px solid rgb(201, 201, 201)" }}
                key={job.id}
              >
                <div className="job-img">
                  <img src={job.logo} alt="" />
                </div>
                <div className="ms-3 py-2">
                  <span className="text-primary fw-m fs-m">{job.jobName}</span>
                  <div>
                    <span>{job.companyName}</span>
                    <span className="mx-1">-</span>
                    <span>{`${job.location} (${job.type})`}</span>
                  </div>
                  <div className="text-secondary fs-s mt-2">Promoted</div>
                </div>
              </div>
            ))}
          </div>
        </Column>
      </Body>
    </div>
  );
};
export default Jobs;
