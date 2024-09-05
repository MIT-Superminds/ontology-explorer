import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { NodeType, OntologyEdge, OntologyNode } from './config/types';
import Node, { nodeHeight, nodeWidth } from './components/Nodes/Node';
import { useGraphStore } from './store/graphStore';
import { generateLayout } from './util/layout';

const nodeTypes = {
    [NodeType.base]: Node,
};
interface ReactFlowComponentTypes {
    _nodes: OntologyNode[];
    _edges: OntologyEdge[];
}
const ReactFlowComponent: React.FC<ReactFlowComponentTypes> = ({
    _nodes,
    _edges,
}) => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useGraphStore();

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = generateLayout(
            _nodes,
            _edges,
            nodeWidth,
            nodeHeight
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [_nodes, _edges, setNodes, setEdges]);

    return (
        <>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                maxZoom={5}
                minZoom={0.4}
            />
        </>
    );
};

export default ReactFlowComponent;
