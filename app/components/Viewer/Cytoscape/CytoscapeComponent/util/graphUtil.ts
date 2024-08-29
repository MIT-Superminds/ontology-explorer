// TODO: fix types

export function createNode(id: string, label: string, childIds: string[] = []): any {
  return {
    data: {
      id: id,
      label: label,
      childIds: childIds,
      parentIds: [],
    },
  };
}

export function generateLinks(nodes: any[]): any[] {
  const links: any[] = [];
  nodes.forEach((parentNode) => {
    parentNode.data.childIds.forEach((childNodeId: string) => {
      links.push({
        data: {
          source: parentNode.data.id,
          target: childNodeId,
          bendPoints: [],
        },
        bendPoints: [],
      });
    });
  });
  return links;
}

// export function generateDataFromJSON(json: any): { nodes: any[], edges: any[] } {
//   const nodes = json.map((item: any) =>
//     createNode(item.id, item.name, item.childIds || [])
//   );
//   const links = generateLinks(nodes);
//   return {
//     nodes: nodes,
//     edges: links,
//   };
// }

