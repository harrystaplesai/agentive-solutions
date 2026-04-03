"use client";

import type { WorkflowNode } from "@/content/blueprints";

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  size?: "small" | "large";
}

export function WorkflowDiagram({ nodes, size = "small" }: WorkflowDiagramProps) {
  const isLarge = size === "large";
  const nodeSize = isLarge ? 56 : 44;
  const fontSize = isLarge ? 11 : 9;
  const gap = isLarge ? 80 : 56;
  const totalWidth = nodes.length * nodeSize + (nodes.length - 1) * gap;
  const svgHeight = isLarge ? 100 : 80;
  const centerY = svgHeight / 2;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${svgHeight}`}
      className="w-full h-auto"
      aria-hidden="true"
    >
      {nodes.map((node, i) => {
        const x = i * (nodeSize + gap);
        const centerX = x + nodeSize / 2;

        return (
          <g key={i}>
            {/* Connector line to next node */}
            {i < nodes.length - 1 && (
              <>
                <line
                  x1={x + nodeSize + 4}
                  y1={centerY}
                  x2={x + nodeSize + gap - 4}
                  y2={centerY}
                  stroke="#2a2a2a"
                  strokeWidth="1.5"
                />
                {/* Arrow dot */}
                <circle
                  cx={x + nodeSize + gap - 8}
                  cy={centerY}
                  r="2.5"
                  fill={nodes[i + 1].color}
                  opacity="0.6"
                />
              </>
            )}

            {/* Node circle */}
            <rect
              x={x}
              y={centerY - nodeSize / 2}
              width={nodeSize}
              height={nodeSize}
              rx={isLarge ? 14 : 10}
              fill={node.color + "18"}
              stroke={node.color + "40"}
              strokeWidth="1"
            />

            {/* Node icon dot */}
            <circle
              cx={centerX}
              cy={centerY - (isLarge ? 6 : 4)}
              r={isLarge ? 4 : 3}
              fill={node.color}
            />

            {/* Label below */}
            <text
              x={centerX}
              y={centerY + nodeSize / 2 + (isLarge ? 16 : 12)}
              textAnchor="middle"
              fill="#a0a0a0"
              fontSize={fontSize}
              fontFamily="var(--font-geist-mono)"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
