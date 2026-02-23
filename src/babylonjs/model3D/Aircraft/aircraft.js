import { aircraftController } from "../../controller/ControllerTeclado/aircraftController.js";
import { initXRExperience } from "../../initXRExperience/initXRExperience.js";

export async function aircraft(scene) {
    // Crear una caja que represente el avión con un tamaño más pequeño
    const cajaAvion = BABYLON.MeshBuilder.CreateBox("cajaAvion", scene);
    cajaAvion.position.x = -3.2;
    cajaAvion.position.y = 330;
    cajaAvion.position.z = -3124;
    cajaAvion.visibility = 1; // Hacer que la caja sea semi-transparente

    // Aplicar físicas a la caja sin gravedad inicial
    cajaAvion.physicsImpostor = new BABYLON.PhysicsImpostor(
        cajaAvion,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9 },
        scene
    );
    console.log(cajaAvion.physicsImpostor);

    // Configurar colisiones para la caja
    cajaAvion.checkCollisions = true;
    cajaAvion.gravity = true;


    console.log("Iniciando avióna")
    // Cargar el modelo del avión y ajustar su posición respecto a la caja
    const airplane = await new Promise((resolve, reject) => {
        BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "f18.glb", scene, function (meshes) {
            console.log("Avión importado")
            const airplane = meshes[0];
            console.log(airplane)
            airplane.scaling.x = 5;
            airplane.scaling.y = 5;
            airplane.scaling.z = 5;

            // Colocar el avión en el centro de la caja y hacer que sea hijo de la caja
            airplane.position = BABYLON.Vector3.Zero();
            airplane.parent = cajaAvion;

            // Ajustar la rotación del avión
            airplane.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 0), Math.PI / 8);

            resolve(airplane);
        }, undefined, reject);
    });
    
    console.log("Avión cargado")

    // Guardar la caja en la escena para referencia
    scene.airplane = cajaAvion;

    // Configurar la cámara de tercera persona para seguir la caja
    if (scene.thirdPersonCamera) {
        scene.thirdPersonCamera.lockedTarget = cajaAvion;
    }

    // Configurar la cámara de primera persona para seguir la caja
    if (scene.firstPersonCamera) {
        scene.firstPersonCamera.parent = cajaAvion;
        scene.firstPersonCamera.position.set(0, 1.90, 1.60);
    }

    // Inicializar el controlador de entrada
    const inputController = aircraftController(scene);
    inputController.addEventListeners();

    // Actualizar el avión en cada cuadro
    scene.onBeforeRenderObservable.add(() => {
        inputController.update();
    });

    // Inicializar la experiencia XR
    const xr = await initXRExperience(scene);

    // Configurar la cámara XR para seguir la caja
    xr.baseExperience.onInitialXRPoseSetObservable.add(() => {
        console.log("Inicializando pose XR");
        const rotationParent = new BABYLON.TransformNode("rotationParent", scene);

        // Hacer que la cámara XR siga a la caja
        rotationParent.parent = cajaAvion;

        rotationParent.position.set(0, -2, 1);
        rotationParent.rotationQuaternion = BABYLON.Quaternion.RotationAxis(
            new BABYLON.Vector3(0, 1, 0),
            BABYLON.Tools.ToRadians(0)
        );

        const xrCamera = xr.baseExperience.camera;
        xrCamera.parent = rotationParent;
        xrCamera.applyGravity = true;
        xrCamera.checkCollisions = true;
        xrCamera.position.set(0, 2.7, 1.2);
    });
}