import { graphDirection, NodeType, OntologyEdge, OntologyNode } from '../config/types';

const position = { x: 0, y: 0 };
const edgeType = 'straight';

export function createNode(
    id: string,
    label: string,
    childIds: string[] = [],
    changeCurrentActivity: Function,
    direction: graphDirection,
): OntologyNode {
    return {
        id: id,
        data: {
            label: label,
            childIds: childIds,
            changeCurrentActivity: changeCurrentActivity,
            direction: direction,
        },
        position,
        selectable: true,
        draggable: false,
        deletable: false,
        type: NodeType.baseOntologyNode,
    };
}

export function generateEdges(nodes: OntologyNode[]): OntologyEdge[] {
    const edges: OntologyEdge[] = [];
    nodes.forEach((parentNode) => {
        parentNode.data.childIds.forEach((childNodeId: string) => {
            edges.push({
                id: generateEdgeId(parentNode.id, childNodeId),
                source: parentNode.id,
                target: childNodeId,
                type: edgeType,
            });
        });
    });
    return edges;
}

function generateEdgeId(sourceId: string, targetId: string): string {
    return 'edge-' + sourceId + '<->' + targetId;
}