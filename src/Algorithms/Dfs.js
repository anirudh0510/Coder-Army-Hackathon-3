async function Dfs(grid, startNode, finishNode) {
    const nodes = [];
    const visitedNodesInOrder = [];
    nodes.push(startNode);
    while (!!nodes.length) {
        const currentNode = nodes.pop();
        if (currentNode.isWall) continue;


        visitedNodesInOrder.push(currentNode);
        currentNode.isVisited = true;

        if (currentNode === finishNode) return visitedNodesInOrder;

        const nodesToPush = getUnvisitedNeighbors(currentNode, grid);

        for (const nodeToPush of nodesToPush) {

            nodeToPush.previousNode = currentNode;
            nodes.push(nodeToPush);

        }


    }

    return visitedNodesInOrder;


}
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export { Dfs };