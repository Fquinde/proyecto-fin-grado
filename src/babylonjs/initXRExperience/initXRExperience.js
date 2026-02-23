// Importa las funciones necesarias desde otros módulos
import { handleControllers } from "../controller/ControllerVR/aircraftControllerVR.js";
import { setupPhysics } from '../physics/physics.js';

// Función asíncrona para inicializar la experiencia XR
export async function initXRExperience(scene) {
    // Crea la experiencia XR predeterminada con opciones específicas
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-vr", // Modo de sesión de realidad virtual inmersiva
            referenceSpaceType: "local-floor" // Tipo de espacio de referencia, en este caso el piso local
        },
        optionalFeatures: ["local-floor", "bounded-floor"] // Características opcionales, como el piso local y el piso delimitado
    });
    console.log("Experiencia XR creada");

    // Configura la física para la escena
    setupPhysics(scene);

    // Maneja los controladores VR para la escena
    handleControllers(xr, scene);

    // Devuelve la experiencia XR creada
    return xr;
}
