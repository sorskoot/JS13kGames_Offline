export class PuzzleManager {
    constructor() {

        this.puzzles = [
            [{
                    type: 'start',
                    pos: [5, 0.5, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'end',
                    pos: [1, 0.5, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'mirror',
                    pos: [1, 0.5, 1],
                    rot: 0
                },
                {
                    type: 'mirror',
                    pos: [5, 0.5, 1],
                    rot: 0
                },
                {
                    type: 'wall',
                    pos: [3, 0.5, 5],
                    rot: 0
                }
            ],
            [{
                    type: 'start',
                    pos: [5, 0.5, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'end',
                    pos: [1, 0.5, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'mirror',
                    pos: [1, 0.5, 1],
                    rot: 0
                },
                {
                    type: 'mirror',
                    pos: [5, 0.5, 1],
                    rot: 0
                },
                {
                    type: 'wall',
                    pos: [3, 0.5, 5],
                    rot: 0
                },
                {
                    type: 'wall',
                    pos: [3, 1.5, 5],
                    rot: 0
                },
                {
                    type: 'wall',
                    pos: [3, 2.5, 5],
                    rot: 0
                }
            ]
        ];
        this.currentPuzzle = -1;
        this.next();
    }

    next() {
        this.currentPuzzle++;
        this.puzzle = this.puzzles[this.currentPuzzle];
    }
}