export function aircraftController(scene) {
    // Variables para la velocidad y la aceleración del avión
    let speed = 0; // Velocidad inicial del avión
    let acceleration = 0; // Aceleración inicial del avión
    const airResistance = 0.005; // Factor de resistencia del aire
    const maxSpeed = 3; // Velocidad máxima permitida

    // Para evitar múltiples registros de eventos
    let eventListenersAdded = false;

    // Objeto para almacenar el estado de las acciones de vuelo
    const flightData = {
        lowerNose: false, // Bajar la nariz del avión
        raiseNose: false, // Elevar la nariz del avión
        turnLeft: false, // Rotar a la izquierda
        turnRight: false, // Rotar a la derecha
        yawLeft: false, // Girar a la izquierda
        yawRight: false, // Girar a la derecha
        accelerate: false, // Acelerar
        brake: false // Frenar
    };

    // Función para agregar event listeners para el teclado
    function addEventListeners() {
        if (!eventListenersAdded) {
            // Listener para cuando se presiona una tecla
            window.addEventListener("keydown", handleKeydown);
            // Listener para cuando se suelta una tecla
            window.addEventListener("keyup", handleKeyup);
            eventListenersAdded = true; // Marcar que los event listeners han sido añadidos
        }
    }

    // Función para asignar el estado de las teclas a las acciones correspondientes
    function setKeyState(key, state) {
        const keys = {
            "w": "lowerNose", // Bajar la nariz del avión 
            "s": "raiseNose", // Elevar la nariz del avión 
            "a": "turnLeft", // Rotar a la izquierda
            "d": "turnRight", // Rotar a la derecha
            "q": "yawLeft", // Girar a la izquierda 
            "e": "yawRight", // Girar a la derecha 
            "shift": "accelerate", // Acelerar con 'Shift'
            " ": "brake" // Frenar con la barra espaciadora
        };
        if (keys[key]) {
            flightData[keys[key]] = state; // Actualizar el estado de la acción correspondiente
        }
    }

    // Función para manejar el evento de tecla presionada
    function handleKeydown(event) {
        const key = event.key.toLowerCase();
        setKeyState(key, true); // Establecer la acción correspondiente como activa
        if (key === "shift") {
            activateMass(); // Activar la masa del avión si se presiona 'Shift'
        }
    }

    // Función para manejar el evento de tecla soltada
    function handleKeyup(event) {
        const key = event.key.toLowerCase(); 
        setKeyState(key, false); 
    }

    let debounce = true; // Variable para evitar múltiples activaciones

    // Función para activar la masa de la cajaAvion
    function activateMass() {
        if (scene.airplane && scene.airplane.physicsImpostor && debounce) {
            debounce = false;
            scene.airplane.physicsImpostor.setMass(1); // Establecer la masa del avión a 1
        }
    }

    // Función para actualizar la física y el estado del avión en cada cuadro
    function update() {
        if (scene.airplane) {
            if (!scene.airplane.rotationQuaternion) {
                scene.airplane.rotationQuaternion = new BABYLON.Quaternion(); // Asegurarse de que el avión tenga una rotación cuaternión
            }

            updateVelocity(scene.airplane); // Actualizar la velocidad del avión
            updateOrientation(scene.airplane); // Actualizar la orientación del avión
            moveAirplane(scene.airplane); // Mover el avión según su velocidad y dirección
        }
    }

    // Función para actualizar la velocidad del avión
    function updateVelocity(plane) {
        if (flightData.accelerate && speed < maxSpeed) {
            acceleration = 0.02; // Aumentar la velocidad si se está acelerando y no se ha alcanzado la velocidad máxima
        } else if (flightData.brake && speed > 0) {
            acceleration = -0.03; // Disminuir la velocidad si se está frenando y la velocidad es mayor a 0
        } else {
            acceleration = -airResistance * speed; // Aplicar la resistencia del aire si no se está acelerando ni frenando
        }

        speed += acceleration; // Actualizar la velocidad
        speed = Math.max(0, Math.min(speed, maxSpeed)); // Asegurarse de que la velocidad se mantenga entre 0 y la velocidad máxima
    }

    // Función para actualizar la orientación del avión
    function updateOrientation(plane) {
        let yawChange = 0;
        let pitchChange = 0;
        let rollChange = 0;

        if (flightData.yawLeft) {
            yawChange -= 0.01; 
        }
        if (flightData.yawRight) {
            yawChange += 0.01; 
        }
        if (flightData.turnLeft) {
            rollChange += 0.01;
        }
        if (flightData.turnRight) {
            rollChange -= 0.01; 
        }
        if (flightData.lowerNose) {
            pitchChange += 0.01; 
        }
        if (flightData.raiseNose) {
            pitchChange -= 0.01; 
        }

        var quaternion = plane.rotationQuaternion;
        var incrementalQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(yawChange, pitchChange, rollChange);

        quaternion.multiplyInPlace(incrementalQuaternion); // Aplicar los cambios de rotación
    }

    // Función para mover el avión según su velocidad y dirección
    function moveAirplane(plane) {
        if (speed > 0) {
            plane.position.addInPlace(plane.forward.scale(speed)); // Mover el avión hacia adelante basado en su velocidad actual
        }
    }

    return {
        addEventListeners, 
        update 
    };
}
