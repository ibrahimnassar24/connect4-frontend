import Movement from "./movement";

export class Grid {

    private grid: (Movement | null)[][];
    private columns: number;
    private rows: number;
    private counter: { p1: number, p2: number }
    private winner: 'p1' | 'p2' | '';

    constructor(grid: (Movement | null)[][]) {
        this.grid = grid;
        this.columns = grid.length;
        this.rows = grid[0].length;
        this.winner = '';
        this.counter = {
            p1: 0,
            p2: 0
        };
    }


    static buildGrid = (columns: number, rows: number) => {
        const grid: (Movement | null)[][] = [];

        for (let c = 0; c < columns; c++) {
            grid[c] = [];
            for (let r = 0; r < rows; r++) {
                grid[c][r] = null;
            }
        }
        return grid;
    }


    addMovement(movement: Movement) {
        const temp: (Movement | null)[][] = [
            ...this.grid!
        ];
        const c = movement.column;
        const r = temp[movement.column].indexOf(null);
        temp[c] = [...temp[c]];
        temp[c][r] = movement;
        this.grid = temp;
        return temp
    }

    private addToCounter(movement: Movement) {
        if (movement.player === 'p1') {
            this.counter.p1 += 1;
            this.counter.p2 = 0;
        } else {
            this.counter.p2 += 1;
            this.counter.p1 = 0;
        }
        return this.checkCounter();
    }


    private checkCounter() {
        if (this.counter['p1'] === 4) {
            this.winner = 'p1';
            return true;
        } else if (this.counter['p2'] === 4) {
            this.winner = 'p2';
            return true;
        } else {
            return false;
        }

    }


    private resetCounter() {
        this.counter.p1 = 0;
        this.counter.p2 = 0;
    }


    scan() {
        return this.scanHorizontally(this.columns, this.rows) ||
            this.scanVirtically(this.columns, this.rows) ||
            this.scanleftToRight() ||
            this.scanRightToLeft();
    }


    scanVirtically(width: number, height: number) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const temp = this.grid[i][j];
                if (temp === null) continue;
                if (this.addToCounter(temp)) return true;
            }
            this.resetCounter();
        }

        return false;
    }

    scanHorizontally(width: number, height: number) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < height; j++) {
                const temp = this.grid[j][i];
                if (temp === null) continue;
                if (this.addToCounter(temp)) return true;
            }
            this.resetCounter();
        }

        return false;
    }

    scanRightToLeft() {
        const columns = this.columns;
        const rows = this.rows;

        for (let i = rows - 1; i > 2; i--) {
            let c = 0;
            let r = i;

            while (c < columns && r > -1) {
                const temp = this.grid[c][r];
                r--;
                c++;
                if (temp === null) continue;
                if (this.addToCounter(temp)) return true;
            }
            this.resetCounter();
        }

        for (let i = 1; i < columns - 3; i++) {
            let c = i;
            let r = rows - 1;

            while (c < columns && r > -1) {
                const temp = this.grid[c][r];
                r--;
                c++;

                if (temp === null) continue;
                if (this.addToCounter(temp)) return true;
            }
            this.resetCounter();
        }

        return false;
    }

    scanleftToRight() {
        const columns = this.columns;
        const rows = this.rows;

        for (let j = 0; j < rows - 3; j++) {
            let c = 0;
            let r = j;

            while (c < columns && r < rows) {
                const temp = this.grid[c][r];
                c++;
                r++;

                if (temp === null) continue;
                if (this.addToCounter(temp)) return true;
            }
            this.resetCounter();
        }

        for (let i = 1; i < columns - 3; i++) {
            let r = 0;
            let c = i;
            while (r < rows && c < columns) {
                const temp = this.grid[c][r];
                c++;
                r++;

                if (temp === null) continue;
                if (this.addToCounter(temp)) return true;
            }
            this.resetCounter();
        }

        return false;
    }



    stop(n: number) {
        return new Promise<void>((res, rej) => {
            setTimeout(() => {
                res();
            }, n * 1000);
        });
    }



}