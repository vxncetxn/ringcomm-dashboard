import React, { useState, useEffect } from "react";
import ky from "ky";

import Defaults from "./Defaults";
import Navbar from "./Navbar";
import Main from "./Main";

// const ordersData = [
//   {
//     orderID: 1,
//     name: "Christoph Tan Hou En",
//     studentID: "1003147",
//     email: "christoph_tan@mymail.sutd.edu.sg",
//     size: "M",
//     status: "Processed"
//   },
//   {
//     orderID: 2,
//     name: "Grace Foo Xuan",
//     studentID: "1003111",
//     email: "grace_foo@mymail.sutd.edu.sg",
//     size: "XS",
//     status: "Pending"
//   },
//   {
//     orderID: 3,
//     name: "Gary Ong Wei Qin",
//     studentID: "1003016",
//     email: "gary_ong@mymail.sutd.edu.sg",
//     size: "L",
//     status: "Processed"
//   },
//   {
//     orderID: 4,
//     name: "Benjamin Sim Zheng Wei",
//     studentID: "1002988",
//     email: "benjamin_sim@mymail.sutd.edu.sg",
//     size: "L",
//     status: "Collected"
//   },
//   {
//     orderID: 5,
//     name: "Thaddus Tan Wei Jie",
//     studentID: "1003001",
//     email: "thaddus_tan@mymail.sutd.edu.sg",
//     size: "M",
//     status: "Processed"
//   },
//   {
//     orderID: 6,
//     name: "Dhruv Mittal",
//     studentID: "1003202",
//     email: "dhruv_mittal@mymail.sutd.edu.sg",
//     size: "XL",
//     status: "Processed"
//   },
//   {
//     orderID: 7,
//     name: "Skylar Hoe Pei-Ern",
//     studentID: "1002944",
//     email: "skylar_hoe@mymail.sutd.edu.sg",
//     size: "XS",
//     status: "Processed"
//   },
//   {
//     orderID: 8,
//     name: "Jireh Tan Jin Kiat",
//     studentID: "1003100",
//     email: "jireh_tan@mymail.sutd.edu.sg",
//     size: "L",
//     status: "Pending"
//   },
//   {
//     orderID: 9,
//     name: "Tan Xuan Rong Vance",
//     studentID: "1003005",
//     email: "vance_tan@mymail.sutd.edu.sg",
//     size: "XS",
//     status: "Pending"
//   },
//   {
//     orderID: 10,
//     name: "Si Sheng Yen",
//     studentID: "1003209",
//     email: "shengyen_si@mymail.sutd.edu.sg",
//     size: "S",
//     status: "Collected"
//   },
//   {
//     orderID: 11,
//     name: "Syazwan Abdullah",
//     studentID: "1003272",
//     email: "syazwan_abdullah@mymail.sutd.edu.sg",
//     size: "S",
//     status: "Processed"
//   },
//   {
//     orderID: 12,
//     name: "Tin Wan Xuan",
//     studentID: "1002950",
//     email: "wanxuan_tin@mymail.sutd.edu.sg",
//     size: "S",
//     status: "Processed"
//   },
//   {
//     orderID: 13,
//     name: "Ainul Mardiyyah",
//     studentID: "1003199",
//     email: "ainul_mardiyyah@mymail.sutd.edu.sg",
//     size: "M",
//     status: "Processed"
//   },
//   {
//     orderID: 14,
//     name: "Darius New Wei Zhen",
//     studentID: "1003118",
//     email: "darius_new@mymail.sutd.edu.sg",
//     size: "M",
//     status: "Collected"
//   }
// ];

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [orders, setOrders] = useState([]);
  const [processedOrders, setProcessedOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [processedInventory, setProcessedInventory] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(
    localStorage.getItem("searchCriteria")
      ? JSON.parse(localStorage.getItem("searchCriteria"))
      : {
          name: true,
          studentID: true,
          status: true,
          email: false
        }
  );
  const [sortCriteria, setSortCriteria] = useState(
    localStorage.getItem("sortCriteria")
      ? localStorage.getItem("sortCriteria")
      : "No. Ascending"
  );

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedOrders = await ky
        .get(`https://rc-inventory.herokuapp.com/order/get`, { timeout: 60000 })
        .json();
      const fetchedInventory = await ky
        .get(`https://rc-inventory.herokuapp.com/product/get`, {
          timeout: 60000
        })
        .json();

      const formattedOrders = fetchedOrders.order
        .filter(d => d.status !== "CANCELLED")
        .map(d => {
          return {
            orderID: d.order_id,
            name: d.customer.full_name,
            studentID: d.customer.customer_id,
            email: d.customer.email,
            submitDate: d.date_ordered,
            status: ["Pending", "Processed", "Collected"][
              Math.floor(Math.random() * 3)
            ],
            products: d.items.map(i => i.product_size)
          };
        });
      const formattedInventory = fetchedInventory.product
        .map(d => {
          const fetchedName = `${d.product_name} ${d.product_size}`;
          let name;
          switch (fetchedName) {
            case "SUTD ring 7":
              name = "R07";
              break;
            case "SUTD ring 8":
              name = "R08";
              break;
            case "SUTD ring 9":
              name = "R09";
              break;
            case "SUTD ring 10":
              name = "R10";
              break;
            case "SUTD ring 11":
              name = "R11";
              break;
            default:
              name = "B08";
              break;
          }
          return {
            size: name,
            orders: {
              Total: 0,
              Pending: 0,
              Processed: 0,
              Collected: 0
            },
            stock: d.stock_on_hand
          };
        })
        .sort((a, b) => a.size.localeCompare(b.size));

      setOrders(formattedOrders);
      setInventory(formattedInventory);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inventory.length) {
      let processed = JSON.parse(JSON.stringify(inventory));
      orders.forEach(d => {
        d.products.forEach(p => {
          let idx;
          switch (p) {
            case 7:
              idx = 1;
              break;
            case 8:
              idx = 2;
              break;
            case 9:
              idx = 3;
              break;
            case 10:
              idx = 4;
              break;
            default:
              idx = 5;
          }
          processed[idx].orders[d.status]++;
          processed[idx].orders["Total"]++;
        });
      });

      setProcessedInventory(processed);
    }
  }, [orders, inventory]);

  useEffect(() => {
    if (orders) {
      let processed = JSON.parse(JSON.stringify(orders));
      if (searchVal) {
        const loweredSearchVal = searchVal.toLowerCase();
        processed = processed.filter(
          order =>
            (searchCriteria.name
              ? order.name.toLowerCase().includes(loweredSearchVal)
              : false) ||
            (searchCriteria.studentID
              ? order.studentID.toLowerCase().includes(loweredSearchVal)
              : false) ||
            (searchCriteria.status
              ? order.status.toLowerCase().includes(loweredSearchVal)
              : false) ||
            (searchCriteria.email
              ? order.email.toLowerCase().includes(loweredSearchVal)
              : false)
        );
      }

      switch (sortCriteria) {
        case "No. Ascending":
          processed.sort((a, b) => a.orderID - b.orderID);
          break;
        case "No. Descending":
          processed.sort((a, b) => b.orderID - a.orderID);
          break;
        case "Name Ascending":
          processed.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Name Descending":
          processed.sort((a, b) => -a.name.localeCompare(b.name));
          break;
        case "ID Ascending":
          processed.sort((a, b) => a.studentID.localeCompare(b.studentID));
          break;
        case "ID Descending":
          processed.sort((a, b) => -a.studentID.localeCompare(b.studentID));
          break;
        default:
          processed.sort((a, b) => a.status.localeCompare(b.status));
      }

      setProcessedOrders(processed);
    }
  }, [orders, searchVal, sortCriteria]);

  return (
    <>
      <Defaults />
      <Navbar
        theme={theme}
        setTheme={setTheme}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <Main
        orders={orders}
        setOrders={setOrders}
        processedOrders={processedOrders}
        processedInventory={processedInventory}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
    </>
  );
}

export default App;
