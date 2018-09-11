export class PuzzleManager {
    constructor() {

        this.puzzles = [
            [{type:'start',pos:[4.0, 0.5, 0.0],rot:1,},{type:'end',pos:[-4.0, 0.5, 0.0],rot:3,},],
            [{type:'start',pos:[2.0, 0.5, 3.0],rot:1,},{type:'end',pos:[-2.0, 0.5, 0.0],rot:3,},{type:'mirror',pos:[-2.0, 0.5, 3.0],rot:3,},],
            [{type:'start',pos:[2.0, 0.5, 3.0],rot:1,},{type:'mirror',pos:[-2.0, 0.5, -2.0],rot:3,},{type:'end',pos:[-2.0, 0.5, 3.0],rot:3,},{type:'wall',pos:[0.0, 0.5, 3.0],rot:1,},{type:'mirror',pos:[2.0, 0.5, -2.0],rot:3,},],
            [{type:'start',pos:[-3.0, 0.5, 5.0],rot:3,},{type:'end',pos:[3.0, 0.5, 5.0],rot:1,},{type:'mirror',pos:[-3.0, 0.5, -1.0],rot:3,},{type:'mirror',pos:[3.0, 0.5, -1.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 5.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 4.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-2.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-1.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-4.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 5.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 4.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-2.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-1.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-3.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-4.0, 1.5, 3.0],rot:1,},],
            [{type:'start',pos:[-3.0, 0.5, 5.0],rot:3,},{type:'end',pos:[0.0, 0.5, -1.0],rot:1,},{type:'mirror',pos:[-3.0, 0.5, 1.0],rot:3,},{type:'mirror',pos:[3.0, 0.5, 1.0],rot:1,},{type:'wall',pos:[-4.0, 0.5, 3.0],rot:1,},{type:'mirror',pos:[3.0, 0.5, -1.0],rot:1,},{type:'wall',pos:[-3.0, 0.5, -1.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 2.0],rot:1,},{type:'wall',pos:[3.0, 0.5, 5.0],rot:1,},{type:'wall',pos:[-3.0, 0.5, 0.0],rot:1,},{type:'wall',pos:[-4.0, 0.5, 2.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[3.0, 0.5, 2.0],rot:1,},],
            [{type:'start',pos:[-3.0, 0.5, 5.0],rot:3,},{type:'end',pos:[0.0, 0.5, 1.0],rot:1,},{type:'mirror',pos:[-3.0, 0.5, 1.0],rot:3,},{type:'mirror',pos:[1.0, 0.5, 5.0],rot:1,},{type:'wall',pos:[-3.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-4.0, 0.5, -1.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 2.0],rot:1,},{type:'wall',pos:[3.0, 0.5, 5.0],rot:1,},{type:'wall',pos:[-4.0, 0.5, -2.0],rot:1,},{type:'wall',pos:[-3.0, 0.5, 2.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[3.0, 0.5, 2.0],rot:1,},{type:'mirror',pos:[-3.0, 0.5, -3.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 0.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 0.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 1.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 2.0],rot:1,},{type:'mirror',pos:[1.0, 0.5, -3.0],rot:1,},{type:'wall',pos:[-2.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-1.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[0.0, 0.5, -2.0],rot:1,},{type:'wall',pos:[0.0, 0.5, -4.0],rot:1,},{type:'wall',pos:[0.0, 1.5, -4.0],rot:1,},{type:'wall',pos:[0.0, 1.5, -3.0],rot:1,},{type:'wall',pos:[0.0, 1.5, -2.0],rot:1,},{type:'wall',pos:[0.0, 2.5, -2.0],rot:1,},{type:'wall',pos:[0.0, 2.5, -1.0],rot:1,},{type:'wall',pos:[0.0, 2.5, 0.0],rot:1,},],
            [{type:'start',pos:[0.0, 0.5, 0.0],rot:3,},{type:'wall',pos:[0.0, 0.5, 1.0],rot:3,},{type:'wall',pos:[0.0, 0.5, -1.0],rot:3,},{type:'wall',pos:[0.0, 1.5, -1.0],rot:3,},{type:'wall',pos:[0.0, 1.5, 0.0],rot:3,},{type:'wall',pos:[0.0, 1.5, 1.0],rot:3,},{type:'mirror',pos:[-3.0, 0.5, 0.0],rot:3,},{type:'mirror',pos:[-3.0, 0.5, -2.0],rot:3,},{type:'mirror',pos:[3.0, 0.5, -2.0],rot:3,},{type:'mirror',pos:[3.0, 0.5, -4.0],rot:3,},{type:'end',pos:[0.0, 0.5, -4.0],rot:3,},{type:'wall',pos:[0.0, 1.5, -3.0],rot:3,},{type:'wall',pos:[0.0, 1.5, -5.0],rot:3,},{type:'wall',pos:[0.0, 0.5, -5.0],rot:3,},{type:'wall',pos:[0.0, 0.5, -3.0],rot:3,},{type:'wall',pos:[0.0, 1.5, -4.0],rot:3,},{type:'wall',pos:[-1.0, 0.5, 1.0],rot:3,},{type:'wall',pos:[-2.0, 0.5, 1.0],rot:3,},{type:'wall',pos:[-3.0, 0.5, 1.0],rot:3,},{type:'wall',pos:[1.0, 0.5, -5.0],rot:3,},{type:'wall',pos:[2.0, 0.5, -5.0],rot:3,},{type:'wall',pos:[3.0, 0.5, -5.0],rot:3,},{type:'wall',pos:[1.0, 0.5, 0.0],rot:3,},{type:'wall',pos:[-1.0, 0.5, -4.0],rot:3,},],
            [{type:'start',pos:[2.0, 0.5, 3.0],rot:1,},{type:'end',pos:[-4.0, 0.5, 3.0],rot:3,},{type:'wall',pos:[-1.0, 0.5, 3.0],rot:2,},{type:'mirror',pos:[2.0, 0.5, -2.0],rot:2,},{type:'mirror',pos:[-4.0, 0.5, -6.0],rot:1,},{type:'wall',pos:[-1.0, 2.5, 3.0],rot:2,},{type:'wall',pos:[-1.0, 1.5, 3.0],rot:2,},{type:'wall',pos:[-1.0, 0.5, -2.0],rot:2,},{type:'wall',pos:[-1.0, 0.5, -3.0],rot:2,},{type:'wall',pos:[-1.0, 0.5, -4.0],rot:2,},{type:'wall',pos:[-1.0, 0.5, -5.0],rot:2,},{type:'wall',pos:[-1.0, 0.5, -7.0],rot:2,},{type:'wall',pos:[-1.0, 2.5, -2.0],rot:2,},{type:'wall',pos:[-1.0, 1.5, -2.0],rot:2,},{type:'mirror',pos:[4.0, 0.5, -2.0],rot:2,},{type:'mirror',pos:[4.0, 0.5, -6.0],rot:2,},{type:'wall',pos:[-1.0, 2.5, -3.0],rot:2,},{type:'wall',pos:[-1.0, 1.5, -3.0],rot:2,},{type:'wall',pos:[-1.0, 2.5, -4.0],rot:2,},{type:'wall',pos:[-1.0, 1.5, -4.0],rot:2,},{type:'wall',pos:[-1.0, 2.5, -5.0],rot:2,},{type:'wall',pos:[-1.0, 1.5, -5.0],rot:2,},{type:'wall',pos:[-1.0, 2.5, -6.0],rot:2,},{type:'wall',pos:[-1.0, 1.5, -6.0],rot:2,},{type:'wall',pos:[-1.0, 2.5, -7],rot:2,},{type:'wall',pos:[-1.0, 1.5, -7],rot:2,},],
            [{type:'start',pos:[-3.0, 0.5, 5.0],rot:3,},{type:'end',pos:[3.0, 0.5, 5.0],rot:1,},{type:'mirror',pos:[-3.0, 0.5, -1.0],rot:3,},{type:'mirror',pos:[3.0, 0.5, -1.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 5.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 4.0],rot:1,},{type:'wall',pos:[0.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-2.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-1.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[-4.0, 0.5, 3.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 5.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 4.0],rot:1,},{type:'wall',pos:[0.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-2.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-1.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-3.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-4.0, 1.5, 3.0],rot:1,},{type:'wall',pos:[-1.0, 0.5, 2.0],rot:1,},{type:'wall',pos:[-1.0, 0.5, 0.0],rot:1,},{type:'wall',pos:[-1.0, 0.5, -2.0],rot:1,},{type:'wall',pos:[-1.0, 1.5, 0.0],rot:1,},{type:'wall',pos:[-1.0, 1.5, -1.0],rot:1,},{type:'wall',pos:[-1.0, 1.5, -2.0],rot:1,},{type:'wall',pos:[-1.0, 1.5, 2.0],rot:1,},{type:'wall',pos:[-1.0, 2.5, 2.0],rot:1,},{type:'wall',pos:[-1.0, 2.5, 1.0],rot:1,},{type:'wall',pos:[-1.0, 2.5, 0.0],rot:1,},{type:'wall',pos:[-1.0, 2.5, -1.0],rot:1,},{type:'wall',pos:[-1.0, 2.5, -2.0],rot:1,},],

                
                
            // [{
            //         type: 'start',
            //         pos: [5, 0.5, 5],
            //         rot: 1 // PI * rot/2 
            //     },
            //     {
            //         type: 'end',
            //         pos: [1, 0.5, 5],
            //         rot: 1 // PI * rot/2 
            //     },
            //     {
            //         type: 'mirror',
            //         pos: [1, 0.5, 1],
            //         rot: 0
            //     },
            //     {
            //         type: 'mirror',
            //         pos: [5, 0.5, 1],
            //         rot: 0
            //     },
            //     {
            //         type: 'wall',
            //         pos: [3, 0.5, 5],
            //         rot: 0
            //     }
            // ],
            // [{
            //         type: 'start',
            //         pos: [5, 0.5, 5],
            //         rot: 1 // PI * rot/2 
            //     },
            //     {
            //         type: 'end',
            //         pos: [1, 0.5, 5],
            //         rot: 1 // PI * rot/2 
            //     },
            //     {
            //         type: 'mirror',
            //         pos: [1, 0.5, 1],
            //         rot: 0
            //     },
            //     {
            //         type: 'mirror',
            //         pos: [5, 0.5, 1],
            //         rot: 0
            //     },
            //     {
            //         type: 'wall',
            //         pos: [3, 0.5, 5],
            //         rot: 0
            //     },
            //     {
            //         type: 'wall',
            //         pos: [3, 1.5, 5],
            //         rot: 0
            //     },
            //     {
            //         type: 'wall',
            //         pos: [3, 2.5, 5],
            //         rot: 0
            //     }
            // ]
        ];

        
        this.currentPuzzle = (window.location.href.split('#')[1] || 0)-1;
        this.next();
    }

    next() {
        this.currentPuzzle++;
        this.puzzle = this.puzzles[this.currentPuzzle];
    }
}