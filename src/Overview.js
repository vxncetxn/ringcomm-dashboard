import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { select } from "d3-selection";
import { max } from "d3-array";
import { scaleLinear, scaleOrdinal } from "d3-scale";

const Overview = styled.div`
  background-color: var(--color-element);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 25%;
  height: calc(100vh - 100px - 60px);
`;

const dimensions = {
  width: (window.innerWidth - 100) * 0.25,
  height: (window.innerHeight - 100 - 60) * 0.8
};

const OverviewHead = styled.div`
  font-family: var(--font-primary);
  font-size: 16px;
  color: #5d79d5;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  background-color: #152351;
`;

const Viz = styled.svg`
  width: ${dimensions.width}px;
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

const renderViz = wrapper => {
  const data = [
    {
      size: "6",
      orders: {
        total: 16,
        pending: 13,
        // processed: 3,
        // prepared: 6,
        collected: 3
      },
      stock: 52
    },
    {
      size: "7",
      orders: {
        total: 6,
        pending: 5,
        // processed: 2,
        // prepared: 2,
        collected: 1
      },
      stock: 33
    },
    {
      size: "8",
      orders: {
        total: 24,
        pending: 24,
        // processed: 6,
        // prepared: 0,
        collected: 0
      },
      stock: 20
    },
    {
      size: "9",
      orders: {
        total: 23,
        pending: 15,
        // processed: 5,
        // prepared: 5,
        collected: 8
      },
      stock: 12
    },
    {
      size: "10",
      orders: {
        total: 4,
        pending: 3,
        // processed: 0,
        // prepared: 0,
        collected: 1
      },
      stock: 22
    }
  ];

  const bounds = wrapper.append("g").style("transform", "translateX(40px)");

  const dataGroups = bounds
    .selectAll("g")
    .data(data)
    .join("g");

  const maxVal = Math.max(
    max(data, d => d.orders.total),
    max(data, d => d.stock)
  );

  //   const scaleY = scaleLinear()
  //     .domain([0, maxY])
  //     .range([0, 200]);

  //   const scaleX = scaleOrdinal()
  //     .domain(["6", "7", "8", "9", "10"])
  //     .range([100, 200, 300, 400, 500]);

  const scaleX = scaleLinear()
    .domain([0, maxVal])
    .range([0, dimensions.width - 80]);
  const scaleY = scaleOrdinal()
    .domain(["6", "7", "8", "9", "10"])
    .range([
      (1 / 6) * dimensions.height,
      (2 / 6) * dimensions.height,
      (3 / 6) * dimensions.height,
      (4 / 6) * dimensions.height,
      (5 / 6) * dimensions.height
    ]);

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size))
    .attr("width", d => scaleX(d.stock))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "#184ff7");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
    .attr("width", d => scaleX(d.orders.pending) + scaleX(d.orders.collected))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "#bf18f7");

  //   dataGroups
  //     .append("rect")
  //     .attr("x", 0)
  //     .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
  //     .attr(
  //       "width",
  //       d =>
  //         scaleX(d.orders.pending) +
  //         scaleX(d.orders.processed) +
  //         scaleX(d.orders.prepared)
  //     )
  //     .attr("height", (1 / 15) * dimensions.height)
  //     .attr("fill", "#bf18f7");

  //   dataGroups
  //     .append("rect")
  //     .attr("x", 0)
  //     .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
  //     .attr("width", d => scaleX(d.orders.pending) + scaleX(d.orders.processed))
  //     .attr("height", (1 / 15) * dimensions.height)
  //     .attr("fill", "#e86b34");

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
    .attr("width", d => scaleX(d.orders.pending))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "#f7bb18");
};

const OverviewComp = () => {
  const d3Ref = useRef(null);

  useEffect(() => {
    renderViz(select(d3Ref.current));
  }, []);

  return (
    <Overview>
      <OverviewHead>Overview</OverviewHead>
      <Viz ref={d3Ref} />
      <Legend>
        <LegendItem>
          <LegendBadge color="#f7bb18" />
          <LegendText>Pending</LegendText>
        </LegendItem>
        {/* <LegendItem>
          <LegendBadge color="#e86b34" />
          <LegendText>Processed</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBadge color="#bf18f7" />
          <LegendText>Prepared</LegendText>
        </LegendItem> */}
        <LegendItem>
          <LegendBadge color="#bf18f7" />
          <LegendText>Collected</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBadge color="#184ff7" />
          <LegendText>Stock</LegendText>
        </LegendItem>
      </Legend>
    </Overview>
  );
};

export default OverviewComp;
