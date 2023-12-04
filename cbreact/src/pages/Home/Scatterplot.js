import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";


const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

export const Scatterplot = ({ width, height, data }) => {
    
      
  console.log("What's tweakin", data);
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  //find the max element of x for y scale
  let max_y_scale = -1;
  let max_x_scale = -1;
  for (let i = 0; i < data.length; i++){
    max_x_scale = Math.max(max_x_scale, data[i].y)
    max_y_scale = Math.max(max_y_scale, data[i].x)

  }

  // Scales
  const yScale = d3.scaleLinear().domain([0, max_y_scale]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, max_x_scale]).range([0, boundsWidth]);

  console.log(yScale)

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={13}
        cx={xScale(d.y)}
        cy={yScale(d.x)}
        opacity={1}
        stroke="#2774AF"
        fill="#2774AF"
        fillOpacity={0.2}
        strokeWidth={1}
      />
    );
  });

  

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
