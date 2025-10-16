import { Link } from "react-router-dom";
import "./PropertyContainer.css";
export default function PropertyContainer() {
  const propList = [
    {
      id: 1,
      name: "شُقق",
      path: "/homes",
      imageSrc: "./images/eco-house.png",
      imageAlt: "home",
      count: 100,
    },
    {
      id: 2,
      name: "فلل",
      path: "/villas",
      imageSrc: "./images/house.png",
      imageAlt: "villa",
      count: 120,
    },
    {
      id: 3,
      name: "أراضي",
      path: "/lands",
      imageSrc: "./images/land.png",
      imageAlt: "land",
      count: 130,
    },
    {
      id: 4,
      name: "محلات تجاريه",
      path: "/stores",
      imageSrc: "./images/shop.png",
      imageAlt: "store",
      count: 140,
    },
    {
      id: 5,
      name: "مكاتب",
      path: "/offices",
      imageSrc: "./images/office-center.png",
      imageAlt: "office",
      count: 150,
    },
  ];
  const createpropList = propList.map((item) => {
    return (
      <Link className="box" to={item.path} key={item.id}>
        <img className="images" src={item.imageSrc} alt={item.imageAlt} />
        <h1>{item.name}</h1>
        <h2>{item.count} عقار متاح</h2>
      </Link>
    );
  });
  return <div className="container">{createpropList}</div>;
}
