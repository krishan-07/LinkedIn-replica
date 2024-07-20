const Section = ({ heading, body, tags, width }) => {
  return (
    <div className="container-m ps-sm-4 p-3 mb-5 mt-5 ">
      <section className="d-flex section">
        <div className="section-title-box " style={{ width: `${width}%` }}>
          <h2 className="secondary-heading"> {heading}</h2>
          <p className="section-f">{body}</p>
        </div>
        <div className="d-flex flex-wrap mt-2 fit-content">
          {tags.map((tag) => (
            <button
              key={tag}
              className="btn btn-apple fit-content py-3 px-4 text-secondary me-1 mb-2"
              style={{ fontSize: "1.1rem", fontWeight: "500" }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Section;
