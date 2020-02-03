import React, { useState, useEffect } from "react";
import ky from "ky";

import Defaults from "./Defaults";
import Navbar from "./Navbar";
import Main from "./Main";

import productMap from "./helpers/productMap";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [orders, setOrders] = useState(null);
  const [processedOrders, setProcessedOrders] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [processedInventory, setProcessedInventory] = useState(null);
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

      console.log(fetchedOrders);

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
            products: d.items.map(i => productMap(i.product_id))
          };
        });
      const formattedInventory = fetchedInventory.product
        .map(d => {
          const fetchedName = `${d.product_name} ${d.product_size}`;
          let name;
          switch (fetchedName) {
            case "SUTD ring 7":
              name = "R5";
              break;
            case "SUTD ring 8":
              name = "R6";
              break;
            case "SUTD ring 9":
              name = "R7";
              break;
            case "SUTD ring 10":
              name = "R8";
              break;
            case "SUTD ring 11":
              name = "R9";
              break;
            default:
              name = "B7";
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

      console.log(formattedOrders);

      setOrders(formattedOrders);
      setInventory(formattedInventory);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inventory) {
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
        setInventory={setInventory}
        processedOrders={processedOrders}
        processedInventory={processedInventory}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
    </>
  );
}

export default App;
