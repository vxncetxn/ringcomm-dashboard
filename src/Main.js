import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ky from "ky";

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
    orderID: "1",
    name: "Christoph Tan Hou En",
    studentID: "1003147",
    email: "christoph_tan@mymail.sutd.edu.sg",
    size: "M",
    status: "Pending"
  },
  {
    orderID: "2",
    name: "Grace Foo Xuan",
    studentID: "1003111",
    email: "grace_foo@mymail.sutd.edu.sg",
    size: "XS",
    status: "Pending"
  },
  {
    orderID: "3",
    name: "Gary Ong Wei Qin",
    studentID: "1003016",
    email: "gary_ong@mymail.sutd.edu.sg",
    size: "L",
    status: "Collected"
  },
  {
    orderID: "4",
    name: "Benjamin Sim Zheng Wei",
    studentID: "1002988",
    email: "benjamin_sim@mymail.sutd.edu.sg",
    size: "L",
    status: "Collected"
  },
  {
    orderID: "5",
    name: "Thaddus Tan Wei Jie",
    studentID: "1003001",
    email: "thaddus_tan@mymail.sutd.edu.sg",
    size: "M",
    status: "Collected"
  },
  {
    orderID: "6",
    name: "Dhruv Mittal",
    studentID: "1003202",
    email: "dhruv_mittal@mymail.sutd.edu.sg",
    size: "XL",
    status: "Pending"
  },
  {
    orderID: "7",
    name: "Skylar Hoe Pei-Ern",
    studentID: "1002944",
    email: "skylar_hoe@mymail.sutd.edu.sg",
    size: "XS",
    status: "Pending"
  },
  {
    orderID: "8",
    name: "Jireh Tan Jin Kiat",
    studentID: "1003100",
    email: "jireh_tan@mymail.sutd.edu.sg",
    size: "L",
    status: "Pending"
  },
  {
    orderID: "9",
    name: "Tan Xuan Rong Vance",
    studentID: "1003005",
    email: "vance_tan@mymail.sutd.edu.sg",
    size: "XS",
    status: "Pending"
  },
  {
    orderID: "10",
    name: "Si Sheng Yen",
    studentID: "1003209",
    email: "shengyen_si@mymail.sutd.edu.sg",
    size: "S",
    status: "Collected"
  },
  {
    orderID: "11",
    name: "Syazwan Abdullah",
    studentID: "1003272",
    email: "syazwan_abdullah@mymail.sutd.edu.sg",
    size: "S",
    status: "Pending"
  },
  {
    orderID: "12",
    name: "Tin Wan Xuan",
    studentID: "1002950",
    email: "wanxuan_tin@mymail.sutd.edu.sg",
    size: "S",
    status: "Pending"
  },
  {
    orderID: "13",
    name: "Ainul Mardiyyah",
    studentID: "1003199",
    email: "ainul_mardiyyah@mymail.sutd.edu.sg",
    size: "M",
    status: "Pending"
  },
  {
    orderID: "14",
    name: "Darius New Wei Zhen",
    studentID: "1003118",
    email: "darius_new@mymail.sutd.edu.sg",
    size: "M",
    status: "Collected"
  }
];

const MainComp = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetched = await ky
        .get(`https://rc-inventory.herokuapp.com/order/get`, { timeout: 60000 })
        .json();

      const processed = fetched.product.map(d => {
        return {
          orderID: d.order_id,
          name: d.customer.full_name,
          studentID: d.customer.customer_id,
          email: d.customer.email,
          submitDate: d.date_ordered,
          status: d.status === "ORDERED" ? "Pending" : "Collected",
          products: d.items.map(i => i.product_size)
        };
      });

      setData(processed);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <Main>
      <Orders ordersData={ordersData} />
      <Overview />
    </Main>
  );
};

export default MainComp;
