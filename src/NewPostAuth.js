import React, { useState, useEffect, useContext } from "react";
import { useQuery, queryCache } from "react-query";

import fetchUpdate from "./fetch/fetchUpdate";
import fetchOrder from "./fetch/fetchOrder";
import fetchFinance from "./fetch/fetchFinance";
import fetchProduct from "./fetch/fetchProduct";

import { ToastContext, SettingsContext } from "./Context";

import Navbar from "./Navbar";
import Main from "./Main";

function PostAuthComp() {
  const setToastInfo = useContext(ToastContext);

  const [orderUpdateID, setOrderUpdateID] = useState(null);
  const [financeUpdateID, setFinanceUpdateID] = useState(null);
  const [productUpdateID, setProductUpdateID] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [autoReload, setAutoReload] = useState(
    localStorage.getItem("autoReload")
      ? JSON.parse(localStorage.getItem("autoReload"))
      : false
  );
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
      : "Date Recent First"
  );

  useQuery("updateID", fetchUpdate, {
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    onSuccess: res => {
      const fetchedOrderUpdateID = res.update.find(d => d.table === "Order")
        .update_id;
      const fetchedFinanceUpdateID = res.update.find(d => d.table === "Finance")
        .update_id;
      const fetchedProductUpdateID = res.update.find(d => d.table === "Product")
        .update_id;

      if (orderUpdateID) {
        if (fetchedOrderUpdateID !== orderUpdateID) {
          if (autoReload) {
            queryCache.refetchQueries("Order");
            setOrderUpdateID(fetchedOrderUpdateID);
          } else {
            setToastInfo({
              triggered: true,
              message: "New data available",
              persistent: true,
              otherFuncs: [
                {
                  label: "Load",
                  func: () => {
                    queryCache.refetchQueries("Order");
                    setOrderUpdateID(fetchedOrderUpdateID);
                  }
                }
              ]
            });
          }
        }
      } else {
        setOrderUpdateID(fetchedOrderUpdateID);
      }

      if (financeUpdateID) {
        if (fetchedFinanceUpdateID !== financeUpdateID) {
          if (autoReload) {
            queryCache.refetchQueries("Finance");
            setFinanceUpdateID(fetchedFinanceUpdateID);
          } else {
            setToastInfo({
              triggered: true,
              message: "New data available",
              persistent: true,
              otherFuncs: [
                {
                  label: "Load",
                  func: () => {
                    queryCache.refetchQueries("Finance");
                    setFinanceUpdateID(fetchedFinanceUpdateID);
                  }
                }
              ]
            });
          }
        }
      } else {
        setFinanceUpdateID(fetchedFinanceUpdateID);
      }

      if (productUpdateID) {
        if (fetchedProductUpdateID !== productUpdateID) {
          if (autoReload) {
            queryCache.refetchQueries("Product");
            setProductUpdateID(fetchedProductUpdateID);
          } else {
            setToastInfo({
              triggered: true,
              message: "New data available",
              persistent: true,
              otherFuncs: [
                {
                  label: "Load",
                  func: () => {
                    queryCache.refetchQueries("Product");
                    setProductUpdateID(fetchedProductUpdateID);
                  }
                }
              ]
            });
          }
        }
      } else {
        setProductUpdateID(fetchedProductUpdateID);
      }
    }
  });
  useQuery("Order", fetchOrder);
  useQuery("Finance", fetchFinance);
  useQuery("Product", fetchProduct);

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <>
      <SettingsContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
          autoReload: autoReload,
          setAutoReload: setAutoReload,
          searchVal: searchVal,
          setSearchVal: setSearchVal,
          searchCriteria: searchCriteria,
          setSearchCriteria: setSearchCriteria,
          ordersSortCriteria: ordersSortCriteria,
          setOrdersSortCriteria: setOrdersSortCriteria,
          financesSortCriteria: financesSortCriteria,
          setFinancesSortCriteria: setFinancesSortCriteria
        }}
      >
        <Navbar />
        <Main />
      </SettingsContext.Provider>
    </>
  );
}

export default React.memo(PostAuthComp);
