// @ts-ignore
import elk from 'cytoscape-elk';
import klay from 'cytoscape-klay';
import { elkLayout, klayLayout } from './layout';
import { CytoscapeOptions } from 'cytoscape';
import { graphHeight, graphWidth, graphStyle } from './style';

const cyStyle: React.CSSProperties = {
    width: graphWidth,
    height: graphHeight,
    display: 'block',
};

const conf: CytoscapeOptions = {
    style: graphStyle,
    boxSelectionEnabled: false,
    autounselectify: true,
    autoungrabify: true,
    minZoom: 0.5,
    maxZoom: 2,
    zoomingEnabled: true,
    panningEnabled: true,
};

export { cyStyle, conf };
