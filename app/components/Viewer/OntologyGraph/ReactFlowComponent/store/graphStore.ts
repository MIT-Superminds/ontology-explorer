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

// TODO:: Fix types
interface GraphState {
    nodes: any[];
    edges: OntologyEdge[];
    selectedNode: any | null;

    setNodes: (nodes: any[]) => void;
    setEdges: (edges: OntologyEdge[]) => void;
    setSelectedNode: (node: any | null) => void;

    onNodesChange: (nodeChanges: NodeChange[]) => void;
    onEdgesChange: (edgeChanges: EdgeChange[]) => void;
    onConnect: (params: Connection) => void;

    getNodeById: (id: string | null) => any | undefined;
}

export const useGraphStore = create<GraphState>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: null,

    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    setSelectedNode: (node: any | null) => set({ selectedNode: node }),

    onNodesChange: (nodeChanges: NodeChange[]) =>
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
}));
