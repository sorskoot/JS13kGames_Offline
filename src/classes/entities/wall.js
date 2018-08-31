import { Entity } from './entity';

export class Wall extends Entity {

    constructor(scene, position) {
        super(scene,position,"wall");
        
        this.uvs = [0.25,0.25, 0.25,0.25, 0.25,0.5, 0.25,0.5, 0.0,0.25, 0.0,0.25, 0.0,0.5, 0.0,0.5, 0.25,0.25, 0.0,0.25, 0.25,0.5, 0.0,0.5, 0.0,0.25, 0.25,0.25, 0.0,0.5, 0.25,0.5, 0.25,0.25, 0.0,0.25, 0.25,0.5, 0.0,0.5];
        
        this.buildMesh();
    }

}