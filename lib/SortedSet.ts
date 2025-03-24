class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    height: number;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // Khởi tạo chiều cao bằng 1
    }
}

export class SortedSet<T> {
    private root: TreeNode<T> | null;

    constructor(arr?: T[]) {
        this.root = null;
        if (arr && arr.length > 0) {
            for (const value of arr) {
                this.add(value);
            }
        }
    }

    // Lấy chiều cao của một nút
    private getHeight(node: TreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Cập nhật chiều cao của nút
    private updateHeight(node: TreeNode<T>): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Tính hệ số cân bằng: chênh lệch giữa chiều cao của con trái và con phải
    private getBalance(node: TreeNode<T>): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Phép quay phải: giúp khắc phục trường hợp lệch trái
    private rotateRight(y: TreeNode<T>): TreeNode<T> {
        const x = y.left!;
        const T2 = x.right;

        // Thực hiện quay
        x.right = y;
        y.left = T2;

        // Cập nhật chiều cao
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    // Phép quay trái: giúp khắc phục trường hợp lệch phải
    private rotateLeft(x: TreeNode<T>): TreeNode<T> {
        const y = x.right!;
        const T2 = y.left;

        // Thực hiện quay
        y.left = x;
        x.right = T2;

        // Cập nhật chiều cao
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    // Hàm cân bằng lại nút nếu bị mất cân bằng
    private rebalance(node: TreeNode<T>): TreeNode<T> {
        this.updateHeight(node);
        const balance = this.getBalance(node);

        // Trường hợp Left Left
        if (balance > 1 && this.getBalance(node.left!) >= 0) {
            return this.rotateRight(node);
        }

        // Trường hợp Left Right
        if (balance > 1 && this.getBalance(node.left!) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Trường hợp Right Right
        if (balance < -1 && this.getBalance(node.right!) <= 0) {
            return this.rotateLeft(node);
        }

        // Trường hợp Right Left
        if (balance < -1 && this.getBalance(node.right!) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Thêm giá trị vào cây
    add(value: T): void {
        this.root = this._insert(this.root, value);
    }

    private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
        // Nếu nút rỗng, tạo mới nút chứa value
        if (node === null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            // Tránh trùng lặp
            return node;
        }
        // Cân bằng lại cây sau khi chèn
        return this.rebalance(node);
    }

    // Xóa giá trị khỏi cây
    remove(value: T): void {
        this.root = this._delete(this.root, value);
    }

    private _delete(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) return node;

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
            node.right = this._delete(node.right, value);
        } else {
            // Tìm thấy nút cần xóa
            if (node.left === null || node.right === null) {
                node = node.left ? node.left : node.right;
            } else {
                // Tìm nút nhỏ nhất ở nhánh bên phải
                const minNode = this._minValueNode(node.right);
                node.value = minNode.value;
                node.right = this._delete(node.right, minNode.value);
            }
        }
        if (node === null) return node;

        // Cân bằng lại cây sau khi xóa
        return this.rebalance(node);
    }

    // Hàm tìm nút có giá trị nhỏ nhất trong cây con
    private _minValueNode(node: TreeNode<T>): TreeNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Kiểm tra sự tồn tại của một giá trị trong cây
    has(value: T): boolean {
        return this._search(this.root, value) !== null;
    }

    private _search(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null || node.value === value) return node;
        return value < node.value ? this._search(node.left, value) : this._search(node.right, value);
    }

    // Hỗ trợ duyệt theo thứ tự (in-order traversal)
    * [Symbol.iterator](): Generator<T, void, unknown> {
        yield* this._inOrderTraversal(this.root);
    }

    public toString() {
        return Array.from(this).toString();
    }

    public toJSON(): T[] {
        return [...this];
    }

    private* _inOrderTraversal(node: TreeNode<T> | null): Generator<T, void, unknown> {
        if (node !== null) {
            yield* this._inOrderTraversal(node.left);
            yield node.value;
            yield* this._inOrderTraversal(node.right);
        }
    }
}
