import { type Node, type Edge } from '@xyflow/react';

export enum NodeType {
    base = 'base',
}

export type OntologyNodeData = { label: string; childIds: string[], changeCurrentActivity: Function | undefined};
export type OntologyNode = Node<OntologyNodeData>;

export type OntologyEdge = Edge;
