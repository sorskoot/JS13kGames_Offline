export class Laserbeam {

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
        let rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(this.scene);
        var hit = this.scene.pickWithRay(ray, this.predicate);

        let target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100)

        if (hit.pickedMesh && hit.pickedMesh.entity) {
            let ref = hit.pickedMesh.getFacetNormal(hit.faceId);
            var angle = Math.round(Math.asin(BABYLON.Vector3.Cross(ref, ray.direction).y) * 180 / Math.PI);

            hit.pickedMesh.entity.onHitByLaser(hit.faceId, angle);
            target = hit.pickedMesh.position;
        }

        var myPoints = [
            origin,
            target
        ];

        if (this.laser) {
            this.laser = BABYLON.MeshBuilder.CreateTube("lines", {
                path: myPoints,
                radius: .15,
                instance: this.laser
            });
        } else {
            this.laser = BABYLON.MeshBuilder.CreateTube("lines", {
                path: myPoints,
                updatable: true,
                radius: .15
            }, this.scene);
        }
        this.laser.isPickable = false;
    }

    predicate(mesh) {
        if (mesh.name == "startLaser" || !mesh.isPickable) {
            return false;
        }
        return true;
    }
}