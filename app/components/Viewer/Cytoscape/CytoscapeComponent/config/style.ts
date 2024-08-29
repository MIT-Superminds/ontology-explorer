import { Stylesheet } from 'cytoscape';

export const graphWidth = '100%';
export const graphHeight = '100vh';

export const nodeWidth = 200;
export const nodeHeight = 80;

export const graphStyle = [
    {
        selector: 'node',
        style: {
            shape: 'round-rectangle',
            label: 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            color: 'black',
            height: nodeHeight,
            width: nodeWidth,
            'border-width': '2px',
            'border-color': 'black',
            'background-color': 'white',
        },
    },
    {
        selector: 'edge',
        style: {
            width: 2,
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'line-color': '#737373',
            'target-arrow-color': '#737373',
        },
    }
] as Stylesheet[];
