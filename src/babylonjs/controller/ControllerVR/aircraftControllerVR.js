export function handleControllers(xr, scene) {
    // Variables para el estado de los controladores y los botones
    let isTriggerPressed = false; // Indica si el gatillo derecho está presionado
    let rightController = null; // Referencia al controlador derecho
    let lastRotation = new BABYLON.Quaternion(); // Última rotación conocida de la caja del avión
    let lastPosition = new BABYLON.Vector3(); // Última posición conocida de la caja del avión
    let actualRotationQuaternion = null; // Cuaternión de rotación actual del controlador derecho

    // Constantes para la velocidad y la rotación
    const rotationThreshold = 0.01; // Umbral para detectar rotación
    const maxRotationIntensity = 0.02; // Máxima intensidad de rotación permitida
    const speed = 2.5; // Velocidad de movimiento hacia adelante

    // Obtener la caja del avión de la escena
    const boxplane = scene.getMeshByName("cajaAvion");

    console.log("Hemos entrado ControllerVR");

    // Accede a los controladores y escucha eventos
    xr.input.onControllerAddedObservable.add((controller) => {
        controller.onMotionControllerInitObservable.add((motionController) => {
            if (motionController.handness === 'right') {
                // Manejo del controlador derecho
                rightController = motionController;
                const triggerComponent = motionController.getComponent('xr-standard-trigger');

                // Manejo del gatillo derecho
                if (triggerComponent) {
                    triggerComponent.onButtonStateChangedObservable.add(() => {
                        isTriggerPressed = triggerComponent.pressed;

                        if (isTriggerPressed) {
                            // Si el gatillo derecho está presionado, almacenar la rotación actual del controlador
                            console.log("Gatillo derecho pulsado", rightController.rootMesh._parentNode._rotationQuaternion);
                            actualRotationQuaternion = rightController.rootMesh._parentNode._rotationQuaternion.clone();
                            activateMass(); // Activar la masa del avión
                        } else {
                            // Si el gatillo derecho no está presionado, restablecer la rotación actual
                            console.log("Gatillo derecho soltado");
                            actualRotationQuaternion = null;
                            if (boxplane) {
                                lastPosition.copyFrom(boxplane.position);
                                lastRotation.copyFrom(boxplane.rotationQuaternion);
                            }
                        }
                    });
                }
            }
        });
    });

    // Función para activar la masa de la cajaAvion
    function activateMass() {
        if (scene.airplane && scene.airplane.physicsImpostor) {
            scene.airplane.physicsImpostor.setMass(1); // Establecer la masa del avión a 1
        }
    }

    // Detectar movimiento y comparar con el quaternion base
    scene.onBeforeRenderObservable.add(() => {
        if (isTriggerPressed && rightController && actualRotationQuaternion) {
            const currentRotation = rightController.rootMesh._parentNode._rotationQuaternion;
            const deltaRotation = currentRotation.subtract(actualRotationQuaternion);

            const rotationIntensity = {
                x: deltaRotation.x,
                y: deltaRotation.y,
                z: deltaRotation.z,
            };

            // Aplicar un límite a la intensidad de la rotación
            rotationIntensity.x = Math.max(-maxRotationIntensity, Math.min(maxRotationIntensity, rotationIntensity.x));
            rotationIntensity.y = Math.max(-maxRotationIntensity, Math.min(maxRotationIntensity, rotationIntensity.y));
            rotationIntensity.z = Math.max(-maxRotationIntensity, Math.min(maxRotationIntensity, rotationIntensity.z));

            if (Math.abs(rotationIntensity.x) > rotationThreshold || Math.abs(rotationIntensity.y) > rotationThreshold || Math.abs(rotationIntensity.z) > rotationThreshold) {
                console.log('Movimiento detectado:', rotationIntensity);
                if (Math.abs(rotationIntensity.x) > rotationThreshold) {
                    boxplane.rotationQuaternion.multiplyInPlace(BABYLON.Quaternion.FromEulerAngles(-rotationIntensity.x, 0, 0));
                }
                if (Math.abs(rotationIntensity.y) > rotationThreshold) {
                    boxplane.rotationQuaternion.multiplyInPlace(BABYLON.Quaternion.FromEulerAngles(0, -rotationIntensity.y, 0));
                }
                if (Math.abs(rotationIntensity.z) > rotationThreshold) {
                    boxplane.rotationQuaternion.multiplyInPlace(BABYLON.Quaternion.FromEulerAngles(0, 0, -rotationIntensity.z));
                }
            }
        }

        if (boxplane) {
            if (isTriggerPressed) {
                // Movimiento hacia adelante cuando el gatillo derecho está presionado
                const forward = new BABYLON.Vector3(0, 0, 1);
                let direction = BABYLON.Vector3.TransformNormal(forward, boxplane.getWorldMatrix());
                direction.normalize();
                boxplane.position.addInPlace(direction.scale(speed));
                lastPosition.copyFrom(boxplane.position);
            }
        }
    });
}
