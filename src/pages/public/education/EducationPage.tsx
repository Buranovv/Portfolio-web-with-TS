import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Flex, Spin } from "antd";
import Search from "antd/es/input/Search";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { educationName, getEducations } from "../../../redux/slice/education";

const EducationPage = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const { educations, loading, total, page, next } = useAppSelector(
    (state) => state[educationName]
  );

  const refetchEducations = () => {
    if (educations.length < total) {
      dispatch(getEducations({ search, page: next }));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    dispatch(getEducations({ search, page }));
  }, [dispatch, page, search]);

  return (
    <div style={{ padding: "40px 0" }}>
      <Spin spinning={loading}>
        <div className="container">
          <Flex align="center" justify="space-between">
            <h1>Total ({total})</h1>
            <Search
              placeholder="input search text"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              style={{ width: 600 }}
            />
          </Flex>
          <InfiniteScroll
            dataLength={educations.length} //This is important field to render the next data
            next={refetchEducations}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* <Row gutter={16} wrap={true} style={{ marginTop: "30px" }}>
              {educations.map((education, i) => (
                <Col
                  className="gutter-row"
                  key={i}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                >
                  <EducationCard {...education} />
                </Col>
              ))}
            </Row> */}
          </InfiniteScroll>
        </div>
      </Spin>
    </div>
  );
};

export default EducationPage;
