import { type Node, type Edge } from '@xyflow/react';

export enum NodeType {
    baseOntologyNode = 'baseOntologyNode',
}
export type graphDirection = 'LR' | 'TB';

export type OntologyNodeData = {
    label: string;
    childIds: string[];
    changeCurrentActivity: Function;
    direction: graphDirection;
};
export type OntologyNode = Node<OntologyNodeData, NodeType.baseOntologyNode>;

export type OntologyEdge = Edge;
