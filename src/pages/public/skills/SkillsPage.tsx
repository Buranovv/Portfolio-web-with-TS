import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Flex,  Spin } from "antd";
import Search from "antd/es/input/Search";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getSkills, skillName } from "../../../redux/slice/skills";

const SkillsPage = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const { skills, loading, total, page, next } = useAppSelector(
    (state) => state[skillName]
  );

  const refetchSkills = () => {
    if (skills.length < total) {
      dispatch(getSkills({ search, page: next }));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    dispatch(getSkills({ search, page }));
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
            dataLength={skills.length} //This is important field to render the next data
            next={refetchSkills}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* <Row gutter={16} wrap={true} style={{ marginTop: "30px" }}>
              {skills.map((skill, i) => (
                <Col
                  className="gutter-row"
                  key={i}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                >
                  <SkillCard {...skill} />
                </Col>
              ))}
            </Row> */}
          </InfiniteScroll>
        </div>
      </Spin>
    </div>
  );
};

export default SkillsPage;
