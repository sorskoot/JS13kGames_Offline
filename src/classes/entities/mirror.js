import {
    Entity
} from './entity';

export class Mirror extends Entity {

    constructor(scene, position, rotation) {
        super(scene, position, "mirror", rotation);

        this.vertices = [-0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5];
        this.faces = [6, 8, 9, 9, 7, 6, 4, 1, 3, 3, 5, 4, 11, 10, 12, 2, 0, 4, 4, 5, 2];
        this.uvs = [0.0, 0.75, 0.25, 0.5, 0.25, 0.75, 0.25, 0.75, 0.0, 0.5, 0.25, 0.5, 0.5, 0.25, 0.25, 0.25, 0.5, 0.5, 0.25, 0.5, 0.0, 0.75, 0.25, 0.75, 0.25, 0.5];

        this.buildMesh();

        this.onPick = () => {
            this.rotation = (this.rotation + 1) % 4;
            this.mesh.rotation.y = Math.PI * this.rotation / 2;
        };
    }

    onHitByLaser(faceId, angle) {
        if (faceId == 1) {
            this.mesh.getFacetNormal(faceId);
            if (angle > 0) return 1; // left
            if (angle < 0) return 2; // right
        } else {
            return 0; //stop
        }

    }
}