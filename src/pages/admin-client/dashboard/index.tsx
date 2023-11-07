import { Fragment, useEffect } from "react";

import {
  BankOutlined,
  BulbOutlined,
  FileProtectOutlined,
  FolderOpenOutlined,
  UserOutlined,
} from "@ant-design/icons";

import useAuth from "../../../zustand/auth";
import useEducation from "../../../zustand/education";
import useExperience from "../../../zustand/experience";
import usePortfolio from "../../../zustand/portfolio";
import useSkill from "../../../zustand/skill";
import useUsers from "../../../zustand/user";

import "./style.scss";

const DashboardPage = () => {
  const { total: education, getAllData: getEd } = useEducation();
  const { total: portfolios, getAllData: getPo } = usePortfolio();
  const { total: skills, getAllData: getSk } = useSkill();
  const { total: experience, getAllData: getEx } = useExperience();
  const { total: user, getAllData: getUs } = useUsers();
  const { clientID, role } = useAuth();

  useEffect(() => {
    getEd("", 0, clientID);
    getPo("", 0, clientID);
    getSk("", 0, clientID);
    getEx("", 0, clientID);
    getUs("", 0, clientID);
  }, [getEd, getEx, getSk, getPo, getUs, clientID]);

  return (
    <Fragment>
      <div className="cards">
        <div className="card">
          <div className="img-box">
            <BankOutlined />
          </div>
          <div className="card-body">
            <h3>Education</h3>
            <p>Total: {education}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <FileProtectOutlined />
          </div>
          <div className="card-body">
            <h3>Experiences</h3>
            <p>Total: {experience}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <FolderOpenOutlined />
          </div>
          <div className="card-body">
            <h3>Portfolio</h3>
            <p>Total: {portfolios}</p>
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <BulbOutlined />
          </div>
          <div className="card-body">
            <h3>Skills</h3>
            <p>Total: {skills}</p>
          </div>
        </div>
        {role === "admin" ? (
          <div className="card">
            <div className="img-box">
              <UserOutlined />
            </div>
            <div className="card-body">
              <h3>Users</h3>
              <p>Total: {user}</p>
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default DashboardPage;
