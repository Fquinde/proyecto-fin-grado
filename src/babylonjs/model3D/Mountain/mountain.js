// Exporta una función llamada "mountain" que toma un parámetro llamado "scene".
export function mountain(scene) {

    // Ground
    const groundMaterial = new BABYLON.StandardMaterial("ground");
    groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/mountain-texture.jpg");
    // Permitir renderizado de doble cara
    groundMaterial.backFaceCulling = false;

    // donde se crean los parametros de la montaña y añadimos fisicas y si algo colisiona con la montama que 
    // nos rediriga al index2
    const options = {
        width: 7096,
        height: 7096,
        subdivisions: 250,
        minHeight: 0,
        maxHeight: 1300,
        onReady: function (ground) {
            ground.material = groundMaterial;

            // Añadir físicas al terreno
            ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                ground,
                BABYLON.PhysicsImpostor.HeightmapImpostor,
                { mass: 0, restitution: 0.9 },
                scene
            );

            ground.physicsImpostor.onCollideEvent = () => {
                window.location.href = "index2.html"; // Redirigir a la página de carga
            }
            // Establecer la altura del terreno a 1 metro del suelo
            ground.position.y = -180;
        }
    }
    // Crea un terreno a partir de una foto 
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "./assets/ground/mountain-heightmap.png", options, scene);
    // Habilita la detección de colisiones para el terreno
    ground.checkCollisions = true
   // Desactiva la visualización de las líneas de contorno del terreno
    ground.showBounding = false

}
