import { useMemo } from "react";
import { ScaleLinear } from "d3";

// tick length
const TICK_LENGTH = 10;

export const AxisBottom = ({ xScale, pixelsPerTick, height }) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      Ticks and Labels
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          <line
            y1={TICK_LENGTH}
            y2={-height - TICK_LENGTH}
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "#767676",
            }}
          >
            {value}
          </text>
        </g>
      ))}

    <text
        x={(range[0] + range[1]) / 2}
        y={50} // Adjust the y-coordinate to position the label
        textAnchor="middle"
        fontSize="12px"
        fill="#767676"
      >
        Number of Listings per Price Point
      </text>

      <text
        x={200} // Adjust the x-coordinate to position the label
        y={-50}
        transform="rotate(-90)"
        textAnchor="middle"
        fontSize="12px"
        fill="#767676"
      >
        Asking Price
      </text>
    </>
  );
};
