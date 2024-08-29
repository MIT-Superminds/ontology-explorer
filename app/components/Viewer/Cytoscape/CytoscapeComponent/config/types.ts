export interface NodeData {
    data: {
        id: string;
        label: string;
    };
}

export interface EdgeData {
    data: {
        source: string;
        target: string;
    };
}

export interface CytoscapeProps {
    data: { nodes: NodeData[]; edges: EdgeData[] };
    onNodeClick?: Function;
}

export interface CytoscapeState {
    cy: cytoscape.Core | null;
}
