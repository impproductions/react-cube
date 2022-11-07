export default class Matrix {
    constructor(data) {
        this.data = data;
    }

    get rows() { return this.data }
    get cols() { return this.data[0].map((c, i) => this.data.map(r => r[i])) }

    multiply(other) {
        if (this.cols.length != other.rows.length) throw new Error("The multiplied matrix must have the same number of rows as the original's columns")
        const newMatrix = [];
        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            const newRow = other.cols.map((col, j) => col.reduce((p, v, k) => p + v * row[k], 0));
            newMatrix.push(newRow);
        }

        return new Matrix(newMatrix);
    }

    static IDENTITY(size) {
        return new Matrix(Array(size).fill(0).map((r, i) => Array(size).fill(0).map((v, j) => i == j ? 1 : 0)));
    }
}

// 