import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { select } from "d3-selection";
import { max } from "d3-array";
import { scaleLinear, scaleOrdinal } from "d3-scale";

const Overview = styled.div`
  background-color: var(--color-element-dark);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 25%;
  height: calc(100vh - 100px - 60px);
  transition: background-color 0.5s ease-out;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

let dimensions = {
  width: window.matchMedia("(max-width: 960px)").matches
    ? window.innerWidth - 100
    : (window.innerWidth - 100) * 0.25,
  height: (window.innerHeight - 100 - 60) * 0.8
};

const OverviewHead = styled.div`
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-accent-main);
  padding: 15px;
  border-radius: 10px 10px 0 0;
  background-color: var(--color-element-light);
  transition: background-color 0.5s ease-out;
`;

const Viz = styled.svg`
  width: 100%;
  height: ${dimensions.height}px;
`;

const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px;
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
  font-size: 12px;
  color: var(--color-text);
  text-transform: uppercase;
  margin-left: 5px;
`;

const renderViz = (wrapper, data) => {
  select(".bounds").remove();

  // const data = [
  //   {
  //     size: "XS",
  //     orders: {
  //       total: 16,
  //       pending: 2,
  //       processed: 11,
  //       collected: 3
  //     },
  //     stock: 52
  //   },
  //   {
  //     size: "S",
  //     orders: {
  //       total: 6,
  //       pending: 0,
  //       processed: 5,
  //       collected: 1
  //     },
  //     stock: 33
  //   },
  //   {
  //     size: "M",
  //     orders: {
  //       total: 24,
  //       pending: 4,
  //       processed: 20,
  //       collected: 0
  //     },
  //     stock: 20
  //   },
  //   {
  //     size: "L",
  //     orders: {
  //       total: 23,
  //       pending: 5,
  //       processed: 10,
  //       collected: 8
  //     },
  //     stock: 12
  //   },
  //   {
  //     size: "XL",
  //     orders: {
  //       total: 4,
  //       pending: 1,
  //       processed: 2,
  //       collected: 1
  //     },
  //     stock: 22
  //   }
  // ];

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
    .attr("y", d => scaleY(d.size))
    .attr("width", d => scaleX(d.stock))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-stock)");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
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
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
    .attr("width", d => scaleX(d.orders.Pending) + scaleX(d.orders.Processed))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-processed)");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
    .attr("width", d => scaleX(d.orders.Pending))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "var(--color-accent-pending)");

  dataGroups
    .append("text")
    .attr("text-anchor", "middle")
    .text(d => d.size)
    .attr("x", -20)
    .attr("y", d => scaleY(d.size) + 20)
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
    .attr("y", d => scaleY(d.size) + 20)
    .attr("font-family", "var(--font-primary)")
    .attr("font-size", "12px")
    .attr("font-weight", "600")
    .attr("fill", "var(--color-text)")
    .attr("pointer-events", "none");
};

const OverviewComp = ({ processedInventory }) => {
  const d3Ref = useRef(null);

  const onWindowResize = () => {
    dimensions = {
      width: window.matchMedia("(max-width: 960px)").matches
        ? window.innerWidth - 100
        : (window.innerWidth - 100) * 0.25,
      height: (window.innerHeight - 100 - 60) * 0.8
    };

    renderViz(select(d3Ref.current), processedInventory);
  };

  useEffect(() => {
    onWindowResize();

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [processedInventory]);

  return (
    <Overview>
      <OverviewHead>Inventory</OverviewHead>
      <Viz ref={d3Ref} />
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
    </Overview>
  );
};

export default OverviewComp;
