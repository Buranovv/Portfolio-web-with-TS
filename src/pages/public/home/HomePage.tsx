import {
  BankOutlined,
  BulbOutlined,
  CloudSyncOutlined,
  CommentOutlined,
  FileProtectOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import "./style.scss";

const HomePage = () => {
  const parallax = (e: React.MouseEvent) => {
    document.querySelectorAll(".images").forEach((move) => {
      const moving_value: number =
        typeof move.getAttribute("data-value") === "number"
          ? Number(move.getAttribute("data-value"))
          : 1;
      const x = (e.clientX * moving_value) / 250;
      const y = (e.clientY * moving_value) / 250;

      (move as HTMLSpanElement).style.transform =
        "translateX(" + x + "px) translateY(" + y + "px)";
    });
  };

  return (
    <div className="container" onMouseMove={(e) => parallax(e)}>
      <div className="hero">
        <h1 draggable className="images">
          Create your own portfolio with us!
        </h1>
        <p draggable className="images">
          You can easily and quickly find a suitable profession in the field of
          programming on our site by creating a portfolio
        </p>
      </div>
      <div className="svgBox">
        <BankOutlined data-value="-2" className="object1 images" />
        <BulbOutlined data-value="6" className="object2 images" />
        <FileProtectOutlined data-value="4" className="object3 images" />
        <FolderOpenOutlined data-value="-6" className="object4 images" />
        <CloudSyncOutlined data-value="8" className="object5 images" />
        <CommentOutlined data-value="-4" className="object6 images" />
        <GlobalOutlined data-value="5" className="object7 images" />
        <SafetyCertificateOutlined data-value="-9" className="object8 images" />
      </div>
    </div>
  );
};

export default HomePage;
