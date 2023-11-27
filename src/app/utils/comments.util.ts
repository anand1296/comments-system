import { __Comment } from "../models/comment.model";
import { Node } from "../models/treeNode.model";

export class CommentUtils {
    static createNaryTreeFromArray(arr: Array<__Comment>): { comments: { children: Node[] } } {
        const nodeMap: { [key: string]: Node } = {};

        // Create nodes for each object in the array
        arr.forEach(obj => {
            const node = new Node(obj);
            const nodeId = obj.id; // Assuming there's an 'id' property in each object

            nodeMap[nodeId] = node;
        });

        // Link nodes together to form the tree structure
        arr.forEach(obj => {
            const nodeId = obj.id;
            const parentNodeId = obj.parentId; // Assuming there's a 'parentId' property indicating parent-child relationship

            if (parentNodeId) {
                const parentNode = nodeMap[parentNodeId];
                const currentNode = nodeMap[nodeId];

                if (parentNode && currentNode) {
                    parentNode.addChild(currentNode);
                }
            }
        });

        // Find and return the root node(s)
        const roots = arr.filter(obj => !obj.parentId).map(obj => nodeMap[obj.id]);
        return { comments: { children: roots } };
    }
}