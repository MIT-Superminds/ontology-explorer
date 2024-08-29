import { LayoutOptions } from 'cytoscape';

export const klayLayout = {
    name: 'klay',
    klay: {
        spacing: 100,
    },
} as LayoutOptions;

export const elkLayout = {
    name: 'elk',
    elk: {
        algorithm: 'layered',
        'elk.direction': 'RIGHT',
        'elk.layered.spacing.baseValue': 100,
    },
} as LayoutOptions;
