import React from "react";
import mermaid from "mermaid";


mermaid.initialize({
    startOnLoad: true,
    securityLevel: "loose",
});

interface MermaidProps{
    chart: string,
    chartRef: any,
}

interface MermaidState{
    chart: string,
    chartRef: any,
}

export default class Mermaid extends React.Component<MermaidProps, MermaidState> {
    constructor(props: MermaidProps) {
        super(props);
        this.state = {
            chart: this.props.chart,
            chartRef: this.props.chartRef
        };
    }

    componentDidMount() {
        this.updateMermaidRender()
    }

    updateMermaidRender() {
        this.state.chartRef.current.removeAttribute('data-processed');
        this.drawDiagram(this.state.chart);
        mermaid.contentLoaded();
    }

    async drawDiagram(chart: string) {
        let element = document.querySelector("#mermaid-container");
        if (element){
            const graphDefinition = chart
            mermaid.render("mermaid-chart", graphDefinition).then(({svg}) => {
                element.innerHTML = svg;
            })
        }
    }

    componentDidUpdate(prevProps: MermaidProps, prevState: MermaidState) {
        if (prevProps !== this.props){
            if (prevState.chart !== this.props.chart){
                this.setState({chart: this.props.chart}, () => {
                    this.updateMermaidRender();
                })
            }
        }
    }

    render() {
        return (
            <div ref={this.state.chartRef} className="mermaid" id="mermaid-chart">
                {this.state.chart}
            </div>
        );
    }
}