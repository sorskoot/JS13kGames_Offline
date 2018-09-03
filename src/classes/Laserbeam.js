export class Laserbeam {

    // laser direction constants:
    // 0 stop progressing
    // 1 turn left
    // 2 turn right
    // 3 hitting target

    constructor(scene, puzzle) {
        this.scene = scene;
        this.puzzle = puzzle;
    }

    drawLaser() {
        let start = this.puzzle.find(b => b.type === "start");

        let origin = new BABYLON.Vector3(...start.pos);
        let direction = new BABYLON.Vector3(Math.sin(Math.PI * start.rot / 2), 0, Math.cos(Math.PI * start.rot / 2));
        let length = 100;

        var ray = new BABYLON.Ray(origin, direction, length);
        // let rayHelper = new BABYLON.RayHelper(ray);
        // rayHelper.show(this.scene);
        var hit = this.scene.pickWithRay(ray, this.predicate);

        let target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100);
        var laserPoints = [origin];

        if (hit.pickedMesh && hit.pickedMesh.entity) {
            let ref = hit.pickedMesh.getFacetNormal(hit.faceId);
            var angle = Math.round(Math.asin(BABYLON.Vector3.Cross(ref, ray.direction).y) * 180 / Math.PI);

            let direction = hit.pickedMesh.entity.onHitByLaser(hit.faceId, angle);
            laserPoints.push(hit.pickedMesh.position);
            if (direction == 1) {
                let currentPosition = hit.pickedMesh.position;
                let currentRotation = (start.rot - 1) % 4;

                let direction2 =
                    new BABYLON.Vector3(Math.sin(Math.PI * currentRotation / 2), 0, Math.cos(Math.PI * currentRotation / 2));

                var ray2 = new BABYLON.Ray(currentPosition, direction2, length);

                let rayHelper2 = new BABYLON.RayHelper(ray2);
                rayHelper2.show(this.scene);

                let target2 = new BABYLON.Vector3(currentPosition.x + Math.sin(Math.PI * currentRotation / 2) * 100, 0.5, currentPosition.z + Math.cos(Math.PI * currentRotation / 2) * 100);

                laserPoints.push(target2);
            }
        }

        if (laserPoints.length == 1) {
            laserPoints.push(target);
        }


        if (this.laser) {
            var laserbeamMesh = this.scene.getMeshByName("laserbeam");
            this.scene.removeMesh(laserbeamMesh);

        }
        this.laser = BABYLON.MeshBuilder.CreateTube("laserbeam", {
            path: laserPoints,
            radius: .15
        }, this.scene);

        this.laser.isPickable = false;
    }

    predicate(mesh) {
        if (mesh.name == "startLaser" || !mesh.isPickable) {
            return false;
        }
        return true;
    }
}