import React, { Component, RefObject } from 'react';
import cytoscape from 'cytoscape';
// @ts-ignore
import elk from 'cytoscape-elk';
import { elkLayout } from './config/layout';
import { cyStyle, conf } from './config/config';
import { CytoscapeProps, CytoscapeState } from './config/types';
import './style/cy.style.css';

cytoscape.use(elk);

class CytoscapeComponent extends Component<CytoscapeProps, CytoscapeState> {
    private cyRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private cy: cytoscape.Core | null = null;

    constructor(props: CytoscapeProps) {
        super(props);
        this.state = { cy: null };
    }

    componentDidMount() {
        this.initializeCytoscape();
    }

    componentDidUpdate(prevProps: CytoscapeProps) {
        const nodesChanged = prevProps.data.nodes.length !== this.props.data.nodes.length;
        const edgesChanged = prevProps.data.edges.length !== this.props.data.edges.length;

        if (nodesChanged || edgesChanged) {
            this.updateCytoscape();
        }
    }

    componentWillUnmount() {
        if (this.cy) {
            this.cy.destroy();
        }
    }

    initializeCytoscape() {
        if (this.cyRef.current) {
            const { data, onNodeClick } = this.props;
            conf.container = this.cyRef.current;
            conf.elements = data;
            this.cy = cytoscape(conf);
            this.cy.layout(elkLayout).run();
            this.setState({ cy: this.cy });

            this.cy.on('tap', 'node', (event) => {
                const nodeId = event.target.id();
                if (onNodeClick) onNodeClick(nodeId);
            });
        }
    }

    updateCytoscape() {
        if (this.cy) {
            this.cy.destroy();
        }
        this.initializeCytoscape();
    }

    render() {
        return <div style={cyStyle} ref={this.cyRef} />;
    }
}

export default CytoscapeComponent;
