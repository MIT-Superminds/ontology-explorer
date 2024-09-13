import React from 'react';
import { useGraphStore } from '../../store/graphStore';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { OntologyNode as OntologyNodeType } from '../../config/types';

export const nodeWidth = 150;
export const nodeHeight = 80;

const Node: React.FC<NodeProps<OntologyNodeType>> = ({ id, data }) => {
    const { selectedNode, setSelectedNode, getNodeById } = useGraphStore();

    const node = getNodeById(id);

    if (!node) return null;

    const handleNodeClick = () => {
        setSelectedNode(node);
        if(data.changeCurrentActivity) data.changeCurrentActivity(id);
    }

    const nodeStyles = `relative p-4 rounded border border-[#1a192b] text-xs ${selectedNode?.id === id && 'bg-purple-100'} hover:cursor-pointer`
    return (
        <div onClick={handleNodeClick} className={nodeStyles} style={{ width: nodeWidth }}>
            {/* Handle for incoming connections */}
            <Handle
                type='target'
                position={data.direction === 'LR' ? Position.Left : Position.Top}
                isConnectable={false}
            />
            <div>{data.label}</div>
            {/* Handle for outgoing connections */}
            <Handle
                className='absolute top-1/2 right-[-2rem] transform -translate-y-1/2'
                type='source'
                position={data.direction === 'LR' ? Position.Right : Position.Bottom}
                isConnectable={false}
            />
        </div>
    );
};

export default Node;
