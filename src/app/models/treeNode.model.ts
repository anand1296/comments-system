import { __Comment } from "./comment.model";

export class Node {
    data: __Comment;
    children: Array<Node>;
    constructor(data: __Comment) {
        this.data = data;
        this.children = [];
    }

    addChild(childNode: Node) {
        this.children.push(childNode);
    }
}