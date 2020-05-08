import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { select } from "d3-selection";
import { max } from "d3-array";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { useQuery } from "react-query";

import fetchOrder from "./fetch/fetchOrder";
import fetchProduct from "./fetch/fetchProduct";

import InventoryEditModal from "./InventoryEditModal";

import Shimmer from "./components/Shimmer";

import { ReactComponent as MenuDotsIcon } from "./icons/menu-dots.svg";

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: var(--color-element-dark);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 25%;
  height: calc(100vh - 100px - 60px);
  height: 100%;
  transition: background-color 0.5s ease-out;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

let dimensions = {
  width: window.matchMedia("(max-width: 630px)").matches
    ? window.innerWidth - 40
    : window.matchMedia("(max-width: 960px)").matches
    ? window.innerWidth - 100
    : window.matchMedia("(max-width: 1920px)").matches
    ? (window.innerWidth - 100) * 0.25
    : (1920 - 100) * 0.25,
  height: (window.innerHeight - 100 - 60) * 0.8
};

const OverviewHead = styled.div`
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-accent-main);
  padding: 15px;
  border-radius: 10px 10px 0 0;
  background-color: var(--color-element-light);
  transition: background-color 0.5s ease-out;

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
  }
`;

const BarShimmer = styled(Shimmer)`
  width: ${props => props.widthPercent}%;
  height: 10%;
`;

const VizShimmer = styled.div`
  width: 100%;
  height: ${dimensions.height}px;
  padding: 40px;

  & > div + div {
    margin-top: 10%;
  }
`;

const Viz = styled.svg`
  width: 100%;
  height: ${dimensions.height}px;
`;

const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 40px;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

const LegendBadge = styled.span`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
`;

const LegendText = styled.p`
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  text-transform: uppercase;
  margin-left: 5px;

  @media (max-width: 1440px) {
    font-size: 12px;
  }
`;

const StyledMenuDotsIcon = styled(MenuDotsIcon)`
  position: absolute;
  top: 10px;
  right: 20px;
  fill: var(--color-text);
  width: 20px;
  height: 20px;
`;

const renderViz = (wrapper, data) => {
  select(".bounds").remove();

  const bounds = wrapper
    .append("g")
    .attr("class", "bounds")
    .style("transform", "translateX(40px)");

  const dataGroups = bounds
    .selectAll("g")
    .data(data)
    .join("g");

  const maxVal = Math.max(
    max(data, d => d.orders.Total),
    max(data, d => d.stock)
  );

  const scaleX = scaleLinear()
    .domain([0, maxVal])
    .range([0, dimensions.width - 80]);
  const scaleY = scaleOrdinal()
    .domain(["B08", "R07", "R08", "R09", "R10", "R11"])
    .range([
      (1 / 7) * dimensions.height,
      (2 / 7) * dimensions.height,
      (3 / 7) * dimensions.height,
      (4 / 7) * dimensions.height,
      (5 / 7) * dimensions.height,
      (6 / 7) * dimensions.height
    ]);

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
    .attr("width", d => scaleX(d.stock))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-stock)");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size))
    .attr(
      "width",
      d =>
        scaleX(d.orders.Pending) +
        scaleX(d.orders.Processed) +
        scaleX(d.orders.Collected)
    )
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-collected)");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size))
    .attr("width", d => scaleX(d.orders.Pending) + scaleX(d.orders.Processed))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-processed)");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size))
    .attr("width", d => scaleX(d.orders.Pending))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-pending)");

  dataGroups
    .append("text")
    .attr("text-anchor", "middle")
    .text(d => d.size)
    .attr("x", -20)
    .attr("y", d => scaleY(d.size))
    .attr("font-family", "var(--font-primary)")
    .attr("font-size", "12px")
    .attr("font-weight", "600")
    .attr("fill", "var(--color-text)")
    .attr("pointer-events", "none");

  dataGroups
    .append("text")
    .attr("text-anchor", "middle")
    .text(d => d.stock)
    .attr("x", d => scaleX(d.stock) + 15)
    .attr("y", d => scaleY(d.size))
    .attr("font-family", "var(--font-primary)")
    .attr("font-size", "12px")
    .attr("font-weight", "600")
    .attr("fill", "var(--color-text)")
    .attr("pointer-events", "none");
};

const OverviewComp = () => {
  const { status: fetchOrderStatus, data: fetchOrderData } = useQuery(
    "Order",
    fetchOrder
  );
  const { status: fetchProductStatus, data: fetchProductData } = useQuery(
    "Product",
    fetchProduct
  );

  const processProduct = raw => {
    const processed = JSON.parse(JSON.stringify(raw));

    if (fetchOrderStatus === "success") {
      fetchOrderData.forEach(d => {
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
    }

    return processed;
  };

  const [inventoryEditOpen, setInventoryEditOpen] = useState(false);

  const d3Ref = useRef(null);

  const onWindowResize = () => {
    dimensions = {
      width: window.matchMedia("(max-width: 630px)").matches
        ? window.innerWidth - 40
        : window.matchMedia("(max-width: 960px)").matches
        ? window.innerWidth - 100
        : window.matchMedia("(max-width: 1920px)").matches
        ? (window.innerWidth - 100) * 0.25
        : (1920 - 100) * 0.25,
      height: (window.innerHeight - 100 - 60) * 0.8
    };

    if (fetchProductStatus === "success") {
      renderViz(select(d3Ref.current), processProduct(fetchProductData));
    }
  };

  useEffect(() => {
    onWindowResize();

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [fetchProductData]);

  return (
    <Overview>
      <OverviewHead>
        Inventory
        <button>
          <StyledMenuDotsIcon onClick={() => setInventoryEditOpen(true)} />
        </button>
      </OverviewHead>
      {fetchProductStatus === "success" ? (
        <Viz ref={d3Ref} />
      ) : fetchProductStatus === "loading" ? (
        <VizShimmer>
          {[...Array(6).keys()].map((_, idx) => (
            <BarShimmer
              key={idx}
              widthPercent={Math.max(10, Math.round(Math.random() * 100))}
            />
          ))}
        </VizShimmer>
      ) : null}
      <Legend>
        <LegendItem>
          <LegendBadge color="var(--color-accent-pending)" />
          <LegendText>Pending</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBadge color="var(--color-accent-processed)" />
          <LegendText>Processed</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBadge color="var(--color-accent-collected)" />
          <LegendText>Collected</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBadge color="var(--color-accent-stock)" />
          <LegendText>Stock</LegendText>
        </LegendItem>
      </Legend>
      {inventoryEditOpen &&
        ReactDOM.createPortal(
          <InventoryEditModal
            dismissFunc={() => setInventoryEditOpen(false)}
          />,
          document.querySelector("#modal")
        )}
    </Overview>
  );
};

export default OverviewComp;
