export class Entity {

    constructor(scene, position, name = "entity") {
        this.name = name;
        this.scene = scene;
        this.position = position;

        this.vertices = [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5];
        this.faces = [8, 10, 11, 11, 9, 8, 12, 13, 15, 15, 14, 12, 1, 3, 7, 7, 5, 1, 17, 16, 18, 18, 19, 17, 2, 0, 4, 4, 6, 2];
        this.uvs = [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0];

        this.mesh = new BABYLON.Mesh(this.name, this.scene);

        this.mat = new BABYLON.StandardMaterial("mat", this.scene);
        var texture = new BABYLON.Texture("tiles.png", this.scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        this.mat.diffuseTexture = texture;
        this.onPick = () => {};
        this.onPicked = () => {};
    }

    render() {}


    buildMesh() {

        //Create a vertexData object
        var vertexData = new BABYLON.VertexData();
        var normals = [];

        //Calculations of normals added
        BABYLON.VertexData.ComputeNormals(this.vertices, this.faces, normals);

        //Assign positions and indices to vertexData
        vertexData.positions = this.vertices;
        vertexData.indices = this.faces;
        vertexData.normals = normals;
        vertexData.uvs = this.uvs;

        //Apply vertexData to custom mesh
        vertexData.applyToMesh(this.mesh);
        this.mesh.material = this.mat;
        this.mesh.material.backFaceCulling = false;
        this.mesh.position = new BABYLON.Vector3(...this.position);
      
        this.mesh.actionManager = new BABYLON.ActionManager(this.scene);
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (function (mesh) {
           this.onPick(this);
           this.onPicked(this);
        }).bind(this, this.mesh)));

        return this.mesh;
    }
}