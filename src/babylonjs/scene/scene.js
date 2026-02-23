import { createSkyBox } from "../model3D/Skybox/skybox.js";
import { airport } from "../model3D/Airport/airport.js";
import { mountain } from "../model3D/Mountain/mountain.js";
import { aircraft } from "../model3D/Aircraft/aircraft.js";
import { setupPhysics } from "../physics/physics.js"
import { createHUD } from "../scene/createHUD.js"
import ocean from "../model3D/Ocean/ocean.js";

// Creo la función de escena donde se llamaran a todos los recursos necesirios o se creara
export async function createScene(canvas, engine) {
    const scene = new BABYLON.Scene(engine);
    // Configurar las físicas de la escena
    setupPhysics(scene);

    //Genero la luz de la escena
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);


    //Importo la musica
    const music = new BABYLON.Sound("Music", "./assets/sounds/f18.mp3", scene, null, {
        loop: true,
        autoplay: true,
    });
    

    //Gnero las dos camaras para ver que seran de primera persona o tercera persona.
    const firstPersonCamera = new BABYLON.UniversalCamera("FirstPersonCamera", new BABYLON.Vector3(0, 0, 0), scene);
    const thirdPersonCamera = new BABYLON.FollowCamera("ThirdPersonCamera", new BABYLON.Vector3(0, 0, 0), scene);
    firstPersonCamera.applyGravity = true;
    thirdPersonCamera.applyGravity = false; // Desactiva la gravedad de la cámara

    thirdPersonCamera.ellipsoid = new BABYLON.Vector3(1, 2, 1);
    thirdPersonCamera.checkCollisions = false; // Desactiva las colisiones de la cámara

    // Ajusta las propiedades de la cámara para mantener una distancia mínima del avión
    thirdPersonCamera.radius = 19; // La distancia inicial de la cámara
    thirdPersonCamera.heightOffset = 6.5;
    thirdPersonCamera.rotationOffset = 180;

    // Bloque las funcionalidades del ratón.
    thirdPersonCamera.inputs.attached.mousewheel.axisControlRadius = false;
    thirdPersonCamera.inputs.attached.pointers.axisXControlRotation = false;
    thirdPersonCamera.inputs.attached.pointers.axisYControlHeight = false;

    thirdPersonCamera.attachControl(canvas, true);

    scene.firstPersonCamera = firstPersonCamera;
    scene.thirdPersonCamera = thirdPersonCamera;

    scene.activeCamera = thirdPersonCamera;
    scene.activeCamera.attachControl(canvas, true);

    // Evento para cambiar las camaras a 1 o 3
    window.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "v") {
            if (scene.activeCamera === thirdPersonCamera) {
                scene.activeCamera = firstPersonCamera;
            } else {
                scene.activeCamera = thirdPersonCamera;
            }

            scene.activeCamera.attachControl(canvas, true);
        }
    });


    //Llamo a todos los objetos necesarios a la escena
    createSkyBox(scene);
    mountain(scene);
    airport(scene);
    const airplane = await aircraft(scene);
    ocean(scene);

    // Crear el HUD
    createHUD(scene);

    // Cuando se carga todos los recursos de la escena que la pantalla de carga sea display  = 'none'
    scene.executeWhenReady(function () {
        document.getElementById('loadingDiv').style.display = 'none';
    });

    return scene;
}
