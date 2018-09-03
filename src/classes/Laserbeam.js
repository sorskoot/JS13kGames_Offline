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
        let direction = start.rot;
        let target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100);


        let laserPoints = [origin];
        let nextTarget = origin;
        let numhops = 0;
        let hitStatus = 0;
        let lastHit;
        do {
            numhops++;
            ({
                nextTarget,
                hitStatus,
                lastHit
            } = this.calculateBeam(nextTarget, direction, lastHit));

            if (!!nextTarget) {
                laserPoints.push(nextTarget);
            }

            if (hitStatus == 3) {
                console.log("You won!");
                break;
            }
            if (hitStatus == 1) {
                direction = (direction - 1) % 4;
            }
            if (hitStatus == 2) {
                direction = (direction + 1) % 4;
            }

        } while (hitStatus != 0 && numhops < 25);

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

    calculateBeam(origin, direction, lastHit) {
        let rayDirection = new BABYLON.Vector3(Math.sin(Math.PI * direction / 2), 0, Math.cos(Math.PI * direction / 2));
        var ray = new BABYLON.Ray(origin, rayDirection, 100);
        // let rayHelper = new BABYLON.RayHelper(ray);
        // rayHelper.show(this.scene);
        var hit = this.scene.pickWithRay(ray, (mesh) => {
            if (mesh.name.startsWith("startLaser") || !mesh.isPickable || mesh.name === lastHit) {
                return false;
            }
            return true;
        });

        if (hit.pickedMesh && hit.pickedMesh.entity) {
            let ref = hit.pickedMesh.getFacetNormal(hit.faceId);
            var angle = Math.round(Math.asin(BABYLON.Vector3.Cross(ref, ray.direction).y) * 180 / Math.PI);
            let hitStatus = hit.pickedMesh.entity.onHitByLaser(hit.faceId, angle);
            return {
                nextTarget: hit.pickedMesh.position,
                hitStatus,
                lastHit: hit.pickedMesh.name
            };
        }
        return {
            nextTarget: new BABYLON.Vector3(origin.x + Math.sin(Math.PI * direction / 2) * 100, 0.5, origin.z + Math.cos(Math.PI * direction / 2) * 100),
            hitStatus: 0,
            lastHit: undefined
        };
    }


}