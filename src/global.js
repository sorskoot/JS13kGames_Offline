window.rnd = m => ~~(Math.random() * m);

window.rotate = (v, degrees) => {
    var ca = Math.cos(degrees);
    var sa = Math.sin(degrees);
    return new BABYLON.Vector3(ca * v.x - sa * v.z, 0, -sa * v.x + ca * v.z);
}