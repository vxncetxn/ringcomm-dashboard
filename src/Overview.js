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
  color: #5d79d5;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  background-color: #152351;
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

const renderViz = wrapper => {
  select(".bounds").remove();

  const data = [
    {
      size: "XS",
      orders: {
        total: 16,
        pending: 13,
        collected: 3
      },
      stock: 52
    },
    {
      size: "S",
      orders: {
        total: 6,
        pending: 5,
        collected: 1
      },
      stock: 33
    },
    {
      size: "M",
      orders: {
        total: 24,
        pending: 24,
        collected: 0
      },
      stock: 20
    },
    {
      size: "L",
      orders: {
        total: 23,
        pending: 15,
        collected: 8
      },
      stock: 12
    },
    {
      size: "XL",
      orders: {
        total: 4,
        pending: 3,
        collected: 1
      },
      stock: 22
    }
  ];

  const bounds = wrapper
    .append("g")
    .attr("class", "bounds")
    .style("transform", "translateX(40px)");

  const dataGroups = bounds
    .selectAll("g")
    .data(data)
    .join("g");

  const maxVal = Math.max(
    max(data, d => d.orders.total),
    max(data, d => d.stock)
  );

  const scaleX = scaleLinear()
    .domain([0, maxVal])
    .range([0, dimensions.width - 80]);
  const scaleY = scaleOrdinal()
    .domain(["XS", "S", "M", "L", "XL"])
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

  dataGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", d => scaleY(d.size) - (((1 / 15) * dimensions.height) / 3) * 2)
    .attr("width", d => scaleX(d.orders.pending))
    .attr("height", (1 / 15) * dimensions.height)
    .attr("fill", "#f7bb18");

  dataGroups
    .append("text")
    .attr("text-anchor", "middle")
    .text(d => d.size)
    .attr("x", -20)
    .attr("y", d => scaleY(d.size) + 10)
    .attr("font-family", "var(--font-primary)")
    .attr("font-size", "16px")
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
    .attr("font-size", "16px")
    .attr("font-weight", "600")
    .attr("fill", "var(--color-text)")
    .attr("pointer-events", "none");
};

const OverviewComp = () => {
  const d3Ref = useRef(null);

  const onWindowResize = () => {
    // if (window.innerWidth > 768) {
    //   width =
    //     window.innerWidth * 0.6 - 100 > window.innerHeight - 100
    //       ? window.innerHeight - 100
    //       : window.innerWidth * 0.6 - 100;
    //   height = width;
    //   widthOffset = window.innerWidth * 0.6 - width;
    //   heightOffset = window.innerHeight - height;
    // } else {
    //   width = window.innerWidth - 40;
    //   height = width;
    //   widthOffset = 40;
    //   heightOffset = 0;
    // }

    dimensions = {
      width: window.matchMedia("(max-width: 960px)").matches
        ? window.innerWidth - 100
        : (window.innerWidth - 100) * 0.25,
      height: (window.innerHeight - 100 - 60) * 0.8
    };

    renderViz(select(d3Ref.current));
    // renderViz(select(d3Ref.current), metric, region, setRegion, data);
  };

  useEffect(() => {
    onWindowResize();

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  //   useEffect(() => {
  //     renderViz(select(d3Ref.current));
  //   }, []);

  return (
    <Overview>
      <OverviewHead>Overview</OverviewHead>
      <Viz ref={d3Ref} />
      <Legend>
        <LegendItem>
          <LegendBadge color="#f7bb18" />
          <LegendText>Pending</LegendText>
        </LegendItem>
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
