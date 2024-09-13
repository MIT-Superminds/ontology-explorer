import React, { useEffect, useMemo } from 'react';
import '@xyflow/react/dist/style.css';
import { generateLayout } from './util/layout';
import { useGraphStore } from './store/graphStore';
import { NodeTypes, ReactFlow } from '@xyflow/react';
import { graphDirection, NodeType, OntologyEdge, OntologyNode } from './config/types';
import Node, { nodeHeight, nodeWidth } from './components/Nodes/Node';

const nodeTypes: NodeTypes = { [NodeType.baseOntologyNode]: Node };
interface ReactFlowComponentProps {
    _nodes: OntologyNode[];
    _edges: OntologyEdge[];
    currentActivityId?: string;
    direction: graphDirection;
}
const ReactFlowComponent: React.FC<ReactFlowComponentProps> = ({
    _nodes,
    _edges,
    currentActivityId,
    direction
}) => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onConnect,
        onNodesChange,
        onEdgesChange,
        clearSelectedNode,
        setSelectedNodeById,
    } = useGraphStore();

    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
        return generateLayout(_nodes, _edges, nodeWidth, nodeHeight, direction);
    }, [_nodes, _edges]);
    
    useEffect(() => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

    useEffect(() => {
        if (currentActivityId) {
            setSelectedNodeById(currentActivityId);
        } else {
            clearSelectedNode();
        }
    }, [currentActivityId]);

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
