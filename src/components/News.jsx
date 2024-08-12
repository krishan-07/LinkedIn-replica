const News = () => {
  return (
    <>
      <div className="feed-card d-flex flex-column">
        <div className="text-center fw-m my-3">Top New for you</div>
        <div
          className="px-2 my-2 d-flex align-items-center justify-content-center text-secondary"
          style={{ height: "100px" }}
        >
          No news today
        </div>
      </div>
    </>
  );
};
export default News;
