import { Link } from "react-router-dom";

import { Card } from "antd";

import Education from "../../../types/education";

const EducationCard = ({ _id, level, name, user, description }: Education) => {
  return (
    <Card
      title={<Link to={`/singlePage/${_id}`}>{name}</Link>}
      bordered={false}
      style={{
        width: 250,
        height: 150,
        marginBottom: "30px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <p>{level}</p>
      <p>{description.slice(0, 30)}</p>
      <p>{`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}</p>
    </Card>
  );
};

export default EducationCard;
