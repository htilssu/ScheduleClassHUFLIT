class TreeNode<T> {
    value: T | null;
    color: "RED" | "BLACK";
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    parent: TreeNode<T> | null;

    constructor(value: T | null, color: "RED" | "BLACK" = "RED") {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

export class SortedSet<T> {
    private readonly nullNode: TreeNode<T>;
    private root: TreeNode<T>;

    constructor(arr?: T[]) {
        this.nullNode = new TreeNode<T>(null, "BLACK");
        this.root = this.nullNode;
        if (arr && arr.length > 0) {
            for (const value of arr) {
                this.add(value);
            }
        }
    }

    private _transplant(u: TreeNode<T>, v: TreeNode<T>): void {
        if (u.parent === null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    private _minimum(node: TreeNode<T>): TreeNode<T> {
        while (node.left !== this.nullNode) {
            node = node.left!;
        }
        return node;
    }


    remove(value: T): void {
        let node = this._search(this.root, value);
        if (node === this.nullNode) return;

        let y = node;
        let yOriginalColor = y.color;
        let x: TreeNode<T>;

        if (node.left === this.nullNode) {
            x = node.right!;
            this._transplant(node, node.right!);
        } else if (node.right === this.nullNode) {
            x = node.left!;
            this._transplant(node, node.left!);
        } else {
            y = this._minimum(node.right!);
            yOriginalColor = y.color;
            x = y.right!;
            if (y.parent === node) {
                x.parent = y;
            } else {
                this._transplant(y, y.right!);
                y.right = node.right;
                y.right!.parent = y;
            }
            this._transplant(node, y);
            y.left = node.left;
            y.left!.parent = y;
            y.color = node.color;
        }
        if (yOriginalColor === "BLACK") {
            this._fixDelete(x);
        }
    }

    private _fixDelete(node: TreeNode<T>): void {
        while (node !== this.root && node.color === "BLACK") {
            let sibling = node.parent?.left === node ? node.parent.right! : node.parent!.left!;
            if (sibling.color === "RED") {
                sibling.color = "BLACK";
                node.parent!.color = "RED";
                this._rotateLeft(node.parent!);
                sibling = node.parent?.right!;
            }
            if (sibling.left!.color === "BLACK" && sibling.right!.color === "BLACK") {
                sibling.color = "RED";
                node = node.parent!;
            } else {
                if (sibling.right!.color === "BLACK") {
                    sibling.left!.color = "BLACK";
                    sibling.color = "RED";
                    this._rotateRight(sibling);
                    sibling = node.parent!.right!;
                }
                sibling.color = node.parent!.color;
                node.parent!.color = "BLACK";
                sibling.right!.color = "BLACK";
                this._rotateLeft(node.parent!);
                node = this.root;
            }
        }
        node.color = "BLACK";
    }


    add(value: T): void {
        let newNode = new TreeNode(value);
        let parent: TreeNode<T> | null = null;
        let current: TreeNode<T> = this.root;

        while (current !== this.nullNode) {
            parent = current;
            if (value < current.value!) current = current.left!;
            else if (value > current.value!) current = current.right!;
            else return; // Tránh trùng lặp
        }

        newNode.parent = parent;
        if (parent === null) this.root = newNode;
        else if (value < parent.value!) parent.left = newNode;
        else parent.right = newNode;

        newNode.left = this.nullNode;
        newNode.right = this.nullNode;
        newNode.color = "RED";

        this._fixInsert(newNode);
    }

    private _fixInsert(node: TreeNode<T>): void {
        while (node.parent?.color === "RED") {
            let grandparent = node.parent.parent!;
            if (node.parent === grandparent.left) {
                let uncle = grandparent.right!;
                if (uncle.color === "RED") {
                    node.parent.color = "BLACK";
                    uncle.color = "BLACK";
                    grandparent.color = "RED";
                    node = grandparent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this._rotateLeft(node);
                    }
                    if (node.parent) {
                        node.parent!.color = "BLACK";
                    }
                    grandparent.color = "RED";
                    this._rotateRight(grandparent);
                }
            } else {
                let uncle = grandparent.left!;
                if (uncle.color === "RED") {
                    node.parent.color = "BLACK";
                    uncle.color = "BLACK";
                    grandparent.color = "RED";
                    node = grandparent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this._rotateRight(node);
                    }
                    if (node.parent) {
                        node.parent!.color = "BLACK";
                    }
                    grandparent.color = "RED";
                    this._rotateLeft(grandparent);
                }
            }
        }
        this.root.color = "BLACK";
    }

    private _rotateLeft(node: TreeNode<T>): void {
        let rightChild = node.right!;
        node.right = rightChild.left;
        if (rightChild.left !== this.nullNode) rightChild.left!.parent = node;
        rightChild.parent = node.parent;
        if (node.parent === null) this.root = rightChild;
        else if (node === node.parent.left) node.parent.left = rightChild;
        else node.parent.right = rightChild;
        rightChild.left = node;
        node.parent = rightChild;
    }

    private _rotateRight(node: TreeNode<T>): void {
        let leftChild = node.left!;
        node.left = leftChild.right;
        if (leftChild.right !== this.nullNode) leftChild.right!.parent = node;
        leftChild.parent = node.parent;
        if (node.parent === null) this.root = leftChild;
        else if (node === node.parent.right) node.parent.right = leftChild;
        else node.parent.left = leftChild;
        leftChild.right = node;
        node.parent = leftChild;
    }

    has(value: T): boolean {
        return this._search(this.root, value) !== this.nullNode;
    }

    private _search(node: TreeNode<T>, value: T): TreeNode<T> {
        if (node === this.nullNode || node.value === value) return node;
        return value < node.value! ? this._search(node.left!, value) : this._search(node.right!, value);
    }

    * [Symbol.iterator](): Generator<T, void, unknown> {
        yield* this._inOrderTraversal(this.root);
    }

    private* _inOrderTraversal(node: TreeNode<T>): Generator<T, void, unknown> {
        if (node !== this.nullNode) {
            yield* this._inOrderTraversal(node.left!);
            yield node.value!;
            yield* this._inOrderTraversal(node.right!);
        }
    }
}