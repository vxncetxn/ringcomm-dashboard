import React, { useState, useEffect, useRef } from "react";
import ky from "ky";

import { DataContext, SortCriteriaContext } from "./Context";

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
    amount: -56.7,
    submitDate: new Date(),
    references: ["./receipt-sample-three.png", "./receipt-sample-one.jpg"]
  }
];

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [ordersFetchStatus, setOrdersFetchStatus] = useState("fetching");
  const [orders, setOrders] = useState([]);
  const [processedOrders, setProcessedOrders] = useState([]);
  const [inventoryFetchStatus, setInventoryFetchStatus] = useState("fetching");
  const [inventory, setInventory] = useState([]);
  const [processedInventory, setProcessedInventory] = useState([]);
  const [processedTransactions, setProcessedTransactions] = useState([]);
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
  const [ordersSortCriteria, setOrdersSortCriteria] = useState(
    localStorage.getItem("ordersSortCriteria")
      ? localStorage.getItem("ordersSortCriteria")
      : "No. Ascending"
  );
  const [financesSortCriteria, setFinancesSortCriteria] = useState(
    localStorage.getItem("financesSortCriteria")
      ? localStorage.getItem("financesSortCriteria")
      : "Date Most Recent First"
  );
  const [lastAction, setLastAction] = useState({ action: "", obj: {} });
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    message: "",
    undoFunc: () => {}
  });

  // TEMP VARS START

  const autoRefresh = true;

  const getUpdateID = () => "64";

  const notifyUpdateAvail = () => {
    console.log("Update is available!");
  };

  // TEMP VARS END

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
      } else if (lastAction.action === "add-order") {
        message = "Order Added";
        undoFunc = async () => {};
      } else if (lastAction.action === "add-record") {
        message = "Record Added";
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

  const formatOrders = raw => {
    return raw.order.map(d => {
      const products = {
        "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4": 0,
        "222b1dd6-ce67-47b8-b763-52da91581597": 0,
        "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc": 0,
        "d75a6df2-1284-4e2f-808b-6e3753718d6d": 0,
        "ad99a78d-3e2e-4718-9c59-c4913f9d612f": 0,
        "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2": 0
      };
      d.items.forEach(i => (products[i.product_id] += i.quantity));

      return {
        orderID: d.order_id,
        name: d.customer.full_name,
        studentID: d.customer.customer_id,
        email: d.customer.email,
        submitDate: d.date_ordered,
        status: ["Pending", "Processed", "Collected"][
          Math.floor(Math.random() * 3)
        ],
        products: products
      };
    });
  };

  const formatInventory = raw => {
    return raw.product
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
  };

  const fetchData = async (
    url,
    formatDataFunc,
    setDataFunc,
    setDataFetchStatusFunc,
    updateIDName,
    cacheName
  ) => {
    try {
      const fetchedData = await ky.get(url).json();
      const fetchedDataUpdateID = getUpdateID();
      const formattedData = formatDataFunc(fetchedData);
      setDataFunc(formattedData);
      localStorage.setItem(updateIDName, fetchedDataUpdateID);
      localStorage.setItem(cacheName, JSON.stringify(formattedData));
      setDataFetchStatusFunc("success");
      console.log("Succeeded in fetching new data!");
    } catch (error) {
      const cachedData = localStorage.getItem(cacheName);

      if (cachedData) {
        setDataFunc(JSON.parse(cachedData));
        setDataFetchStatusFunc("failure-cache");
        console.log("Failed to fetch data. Using cached data!");
      } else {
        setDataFetchStatusFunc("failure-nocache");
        console.log("Failed to fetch data. No cache available!");
      }
    }
  };

  const initialDataFetchSeq = (
    url,
    formatDataFunc,
    setDataFunc,
    setDataFetchStatusFunc,
    updateIDName,
    cacheName
  ) => {
    const dataUpdateID = localStorage.getItem(updateIDName);
    const cachedData = localStorage.getItem(cacheName);

    if (dataUpdateID) {
      const fetchedDataUpdateID = getUpdateID();

      if (dataUpdateID === fetchedDataUpdateID) {
        if (cachedData) {
          setDataFunc(JSON.parse(cachedData));
          setDataFetchStatusFunc("success");
          console.log("No updates to data detected. Using cached data!");
        } else {
          localStorage.setItem(updateIDName, "");
          fetchData(
            url,
            formatDataFunc,
            setDataFunc,
            setDataFetchStatusFunc,
            updateIDName,
            cacheName
          );
        }
      } else {
        fetchData(
          url,
          formatDataFunc,
          setDataFunc,
          setDataFetchStatusFunc,
          updateIDName,
          cacheName
        );
      }
    } else {
      fetchData(
        url,
        formatDataFunc,
        setDataFunc,
        setDataFetchStatusFunc,
        updateIDName,
        cacheName
      );
    }
  };

  /* Initial useEffect for fetching Orders */
  useEffect(() => {
    initialDataFetchSeq(
      "https://rc-inventory.herokuapp.com/order/get",
      formatOrders,
      setOrders,
      setOrdersFetchStatus,
      "ordersUpdateID",
      "cachedOrders"
    );
  }, []);

  /* Initial useEffect for fetching Inventory */
  useEffect(() => {
    initialDataFetchSeq(
      "https://rc-inventory.herokuapp.com/product/get",
      formatInventory,
      setInventory,
      setInventoryFetchStatus,
      "inventoryUpdateID",
      "cachedInventory"
    );
  }, []);

  /* Initial useEffect for fetching Transactions */
  // useEffect(() => {
  //   initialDataFetchSeq(
  //     "https://rc-inventory.herokuapp.com/order/get",
  //     formatOrders,
  //     setOrders,
  //     setOrdersFetchStatus,
  //     "ordersUpdateID",
  //     "cachedOrders"
  //   );
  // }, []);

  /* useEffect for processing Orders */
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

      switch (ordersSortCriteria) {
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
  }, [orders, searchVal, ordersSortCriteria]);

  /* useEffect for processing Inventory */
  useEffect(() => {
    if (inventory.length) {
      let processed = JSON.parse(JSON.stringify(inventory));
      orders.forEach(d => {
        processed[0].orders[d.status] +=
          d.products["0ae22821-d150-42bf-a7ae-d6c4e0a16fb4"];
        processed[1].orders[d.status] +=
          d.products["222b1dd6-ce67-47b8-b763-52da91581597"];
        processed[2].orders[d.status] +=
          d.products["117a72a4-83bd-4539-8cb9-ecc8bbddb3bc"];
        processed[3].orders[d.status] +=
          d.products["d75a6df2-1284-4e2f-808b-6e3753718d6d"];
        processed[4].orders[d.status] +=
          d.products["ad99a78d-3e2e-4718-9c59-c4913f9d612f"];
        processed[5].orders[d.status] +=
          d.products["9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2"];
      });

      setProcessedInventory(processed);
    }
  }, [orders, inventory]);

  /* useEffect for processing Transactions */
  useEffect(() => {
    let processed = JSON.parse(JSON.stringify(transactions));

    switch (financesSortCriteria) {
      case "Date Most Recent First":
        processed.sort((a, b) => a.submitDate - b.submitDate);
        break;
      case "Date Most Recent Last":
        processed.sort((a, b) => b.submitDate - a.submitDate);
        break;
      case "Title Ascending":
        processed.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title Descending":
        processed.sort((a, b) => -a.title.localeCompare(b.title));
        break;
      case "Submitter Ascending":
        processed.sort((a, b) => a.submitter.localeCompare(b.submitter));
        break;
      case "Submitter Descending":
        processed.sort((a, b) => -a.submitter.localeCompare(b.submitter));
        break;
      case "Amount Ascending":
        processed.sort((a, b) => a.amount - b.amount);
        break;
      default:
        processed.sort((a, b) => b.amount - a.amount);
    }

    setProcessedTransactions(processed);
  }, [transactions, financesSortCriteria]);

  /* useEffect for setting up Polling */
  useEffect(() => {
    setInterval(() => {
      try {
        const fetchedDataUpdateID = getUpdateID();
        const ordersUpdateID = localStorage.getItem("ordersUpdateID");
        const inventoryUpdateID = localStorage.getItem("inventoryUpdateID");
        // // const transactionsUpdateID = localStorage.getItem("transactionsUpdateID");

        if (ordersUpdateID !== fetchedDataUpdateID) {
          if (autoRefresh) {
            fetchData(
              "https://rc-inventory.herokuapp.com/order/get",
              formatOrders,
              setOrders,
              setOrdersFetchStatus,
              "ordersUpdateID",
              "cachedOrders"
            );
          } else {
            notifyUpdateAvail();
          }
        }

        if (inventoryUpdateID !== fetchedDataUpdateID) {
          if (autoRefresh) {
            fetchData(
              "https://rc-inventory.herokuapp.com/product/get",
              formatInventory,
              setInventory,
              setInventoryFetchStatus,
              "inventoryUpdateID",
              "cachedInventory"
            );
          } else {
            notifyUpdateAvail();
          }
        }
      } catch {
        console.log("Failed to get updateID!");
      }
    }, 60000);
  }, []);

  return (
    <>
      <Defaults />
      <SortCriteriaContext.Provider
        value={{
          ordersSortCriteria: ordersSortCriteria,
          setOrdersSortCriteria: setOrdersSortCriteria,
          financesSortCriteria: financesSortCriteria,
          setFinancesSortCriteria: setFinancesSortCriteria
        }}
      >
        <Navbar
          theme={theme}
          setTheme={setTheme}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
        />
        <DataContext.Provider
          value={{
            ordersFetchStatus: ordersFetchStatus,
            orders: orders,
            setOrders: setOrders,
            processedOrders: processedOrders,
            inventoryFetchStatus: inventoryFetchStatus,
            setInventory: setInventory,
            processedInventory: processedInventory,
            processedTransactions: processedTransactions,
            setLastAction: setLastAction
          }}
        >
          <Main />
        </DataContext.Provider>
      </SortCriteriaContext.Provider>
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
