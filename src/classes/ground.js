export class Ground{
    constructor(scene){
        this.scene = scene;
        
        this.mesh = new BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {
            xmin: -10,
            zmin: -10,
            xmax: 10,
            zmax: 10,
            subdivisions: {
                'h': 20,
                'w': 20
            }
        }, this.scene);

        var texture = new BABYLON.Texture("tiles.png", this.scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        var groundmat = new BABYLON.StandardMaterial("groundmat", this.scene);
        groundmat.diffuseTexture = texture;
        groundmat.diffuseTexture.uScale = 0.249;
        groundmat.diffuseTexture.vScale = 0.249;
        groundmat.diffuseTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
        groundmat.diffuseTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;

        groundmat.specularTexture = texture;
        groundmat.specularTexture.uScale = 0.249;
        groundmat.specularTexture.vScale = 0.249;
        groundmat.specularTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
        groundmat.specularTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;

        groundmat.specularColor = new BABYLON.Color3(0, 0, 0);
        this.mesh.material = groundmat;
        this.mesh.checkCollisions = true;
    }
}