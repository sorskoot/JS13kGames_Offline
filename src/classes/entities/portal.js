import { Entity } from './entity';

export class Portal extends Entity {

    constructor(scene, position, rotation) {
        super(scene,position,"portal", rotation);
        
        this.uvs = [0.5,0.75, 0.25,0.75, 0.5,1.0, 0.25,1.0, 0.25,1.0, 0.25,1.0, 0.25,0.75, 0.5,1.0, 0.25,0.75, 0.5,0.75, 0.25,1.0, 0.5,1.0, 0.5,0.75, 0.25,0.75, 0.5,1.0, 0.25,1.0, 0.5,0.5, 0.25,0.5, 0.5,0.75, 0.25,0.75, 0.5,0.75, 0.5,1.0, 0.25,0.75, 0.5,0.75];
                
        this.buildMesh();

        this.onPick = () => this.mesh.rotation.y = this.mesh.rotation.y + Math.PI / 2;
    }

}