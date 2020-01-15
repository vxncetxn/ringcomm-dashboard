import React from "react";
import styled from "styled-components";

import Overview from "./Overview";
import Orders from "./Orders";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 480px) {
    padding: 50px 20px;
  }
`;

const ordersData = [
  {
    name: "Christoph Tan Hou En",
    id: "1003147",
    email: "christoph_tan@mymail.sutd.edu.sg",
    size: "M",
    status: "Pending"
  },
  {
    name: "Grace Foo Xuan",
    id: "1003111",
    email: "grace_foo@mymail.sutd.edu.sg",
    size: "XS",
    status: "Pending"
  },
  {
    name: "Gary Ong Wei Qin",
    id: "1003016",
    email: "gary_ong@mymail.sutd.edu.sg",
    size: "L",
    status: "Collected"
  },
  {
    name: "Benjamin Sim Zheng Wei",
    id: "1002988",
    email: "benjamin_sim@mymail.sutd.edu.sg",
    size: "L",
    status: "Collected"
  },
  {
    name: "Thaddus Tan Wei Jie",
    id: "1003001",
    email: "thaddus_tan@mymail.sutd.edu.sg",
    size: "M",
    status: "Collected"
  },
  {
    name: "Dhruv Mittal",
    id: "1003202",
    email: "dhruv_mittal@mymail.sutd.edu.sg",
    size: "10",
    status: "Pending"
  },
  {
    name: "Skylar Hoe Pei-Ern",
    id: "1002944",
    email: "skylar_hoe@mymail.sutd.edu.sg",
    size: "XS",
    status: "Pending"
  },
  {
    name: "Jireh Tan Jin Kiat",
    id: "1003100",
    email: "jireh_tan@mymail.sutd.edu.sg",
    size: "L",
    status: "Pending"
  },
  {
    name: "Tan Xuan Rong Vance",
    id: "1003005",
    email: "vance_tan@mymail.sutd.edu.sg",
    size: "XS",
    status: "Pending"
  },
  {
    name: "Si Sheng Yen",
    id: "1003209",
    email: "shengyen_si@mymail.sutd.edu.sg",
    size: "S",
    status: "Collected"
  },
  {
    name: "Syazwan Abdullah",
    id: "1003272",
    email: "syazwan_abdullah@mymail.sutd.edu.sg",
    size: "S",
    status: "Pending"
  },
  {
    name: "Tin Wan Xuan",
    id: "1002950",
    email: "wanxuan_tin@mymail.sutd.edu.sg",
    size: "S",
    status: "Pending"
  },
  {
    name: "Ainul Mardiyyah",
    id: "1003199",
    email: "ainul_mardiyyah@mymail.sutd.edu.sg",
    size: "M",
    status: "Pending"
  },
  {
    name: "Darius New Wei Zhen",
    id: "1003118",
    email: "darius_new@mymail.sutd.edu.sg",
    size: "M",
    status: "Collected"
  }
];

const MainComp = () => {
  return (
    <Main>
      <Orders ordersData={ordersData} />
      <Overview />
    </Main>
  );
};

export default MainComp;
