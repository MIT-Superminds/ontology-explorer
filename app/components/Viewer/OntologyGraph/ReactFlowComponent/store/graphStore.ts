import { create } from 'zustand';
import { OntologyEdge, OntologyNode } from '../config/types';
import {
    addEdge,
    NodeChange,
    EdgeChange,
    Connection,
    applyEdgeChanges,
    applyNodeChanges,
} from '@xyflow/react';

interface GraphState {
    nodes: OntologyNode[];
    edges: OntologyEdge[];
    selectedNode: OntologyNode | null;

    setNodes: (nodes: OntologyNode[]) => void;
    setEdges: (edges: OntologyEdge[]) => void;
    setSelectedNode: (node: OntologyNode | undefined) => void;
    clearSelectedNode: () => void;

    onNodesChange: (nodeChanges: NodeChange<OntologyNode>[]) => void;
    onEdgesChange: (edgeChanges: EdgeChange[]) => void;
    onConnect: (params: Connection) => void;

    getNodeById: (id: string | null) => OntologyNode | undefined;
    setSelectedNodeById: (id: string | null) => void;
}

export const useGraphStore = create<GraphState>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: null,

    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    setSelectedNode: (node: OntologyNode | undefined) => set({ selectedNode: node }),
    clearSelectedNode:() => set({ selectedNode: null }),

    onNodesChange: (nodeChanges: NodeChange<OntologyNode>[]) =>
        set((state) => ({
            nodes: applyNodeChanges(nodeChanges, state.nodes),
        })),
    onEdgesChange: (edgeChanges: EdgeChange[]) =>
        set((state) => ({
            edges: applyEdgeChanges(edgeChanges, state.edges),
        })),
    onConnect: (params: Connection) =>
        set((state) => ({
            edges: addEdge(params, state.edges),
        })),

    getNodeById: (id: string | null) => {
        const nodes = get().nodes;
        return nodes.find((node) => node.id === id);
    },
    setSelectedNodeById: (id: string | null) => {
        const node = get().getNodeById(id);
        get().setSelectedNode(node);
    },
}));
