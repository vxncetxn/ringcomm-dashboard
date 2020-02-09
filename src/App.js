import React, { useState, useEffect, useRef } from "react";
import ky from "ky";

import Defaults from "./Defaults";
import Navbar from "./Navbar";
import Main from "./Main";

import Toast from "./components/Toast";

import productMap from "./helpers/productMap";

const transactions = [
  {
    transactionID: 1,
    title: "Budget FY2019-20",
    details: "Budget for FY2019 - 2020 cycle",
    submitter: "Dhruv Mittal",
    amount: 4000,
    submitDate: new Date(),
    references: ["./receipt-sample-one.jpg"]
  },
  {
    transactionID: 2,
    title: "MX8399 Chip Antenna x25",
    details: "MX8399 Chip Antenna for testing on our prototypes",
    submitter: "Zen",
    amount: -32.5,
    submitDate: new Date(),
    references: ["./receipt-sample-two.png", "./receipt-sample-three.png"]
  },
  {
    transactionID: 3,
    title: "Silicon Sheet x3",
    details: "Silicon sheets for testing on our prototypes",
    submitter: "Zen",
    amount: "-56.7",
    submitDate: new Date(),
    references: ["./receipt-sample-three.png", "./receipt-sample-one.jpg"]
  }
];

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
  const [lastAction, setLastAction] = useState({ action: "", obj: {} });
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    message: "",
    undoFunc: () => {}
  });

  const timeoutRef = useRef(null);
  useEffect(() => {
    setToastDisplayed(false);
    clearTimeout(timeoutRef.current);
    if (lastAction.action) {
      let message;
      let undoFunc;

      if (lastAction.action === "edit-inventory") {
        message = "Inventory Updated";
        undoFunc = async () => {};
      } else if (lastAction.action === "edit-order") {
        message = "Order Updated";
        undoFunc = async () => {};
      } else if (lastAction.action === "delete") {
        message = "Deletion Complete";
        undoFunc = async () => {};
      } else if (lastAction.action === "email") {
        message = "Email Sent";
        undoFunc = async () => {};
      }

      requestAnimationFrame(() => {
        setToastInfo({ message, undoFunc });
        setToastDisplayed(true);
      });

      timeoutRef.current = setTimeout(() => {
        setLastAction({ action: "", obj: {} });
      }, 4000);
    }
  }, [lastAction]);

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

      console.log(fetchedInventory);

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
            stock: d.stock
          };
        })
        .sort((a, b) => a.size.localeCompare(b.size));

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
          switch (p.code) {
            case "B7":
              idx = 0;
              break;
            case "R5":
              idx = 1;
              break;
            case "R6":
              idx = 2;
              break;
            case "R7":
              idx = 3;
              break;
            case "R8":
              idx = 4;
              break;
            case "R9":
              idx = 5;
              break;
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
        setLastAction={setLastAction}
        transactions={transactions}
      />
      <Toast
        toastDisplayed={toastDisplayed}
        message={toastInfo.message}
        undoFunc={toastInfo.undoFunc}
        dismissFunc={() => {
          setLastAction({ action: "", obj: {} });
        }}
      />
    </>
  );
}

export default App;
