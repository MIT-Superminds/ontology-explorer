import dagre from '@dagrejs/dagre';
import { Position } from '@xyflow/react';
import { OntologyEdge, OntologyNode } from '../config/types';

export function generateLayout(
  nodes: OntologyNode[],
  edges: OntologyEdge[],
  nodeWidth: number,
  nodeHeight: number,
  nodeSep = nodeHeight * .5, //Defines vertical distance between nodes
  rankSep = nodeWidth * 1, //Defines horizontal distance between nodes
): {
  nodes: OntologyNode[];
  edges: OntologyEdge[];
} {
  const graph = new dagre.graphlib.Graph();
  graph
    .setDefaultEdgeLabel(() => ({}))
    .setGraph({
      rankdir: 'LR', //`LR` For horizontal direction: https://github.com/dagrejs/dagre/wiki#configuring-the-layout
      nodesep: nodeSep,
      ranksep: rankSep,
    });

  nodes.forEach((node) => {
    graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  nodes.forEach((node) => {
    const nodeWithPosition = graph.node(node.id);
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
}
    