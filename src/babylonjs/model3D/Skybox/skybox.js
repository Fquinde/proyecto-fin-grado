let skybox = null;
// Función para crear un cielo en la escena
const createSkyBox = function (scene) {
    // Material del cielo
    var skyboxMaterial = new BABYLON.SkyMaterial("SkyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;

    // Malla del cielo (caja)
    skybox = BABYLON.Mesh.CreateBox("skyBox", 7000.0, scene);
    skybox.material = skyboxMaterial;

    /*
    * Teclas:
    * - 1: Día
    * - 2: Tarde
    * - 3: Incrementar Luminancia
    * - 4: Disminuir Luminancia
    * - 5: Incrementar Turbidez
    * - 6: Disminuir Turbidez
    * - 7: Mover horizonte a -50
    * - 8: Restaurar horizonte a 0
    */
   // Función para configurar el cielo con una animación
    var setSkyConfig = function (property, from, to) {
      var keys = [
        { frame: 0, value: from },
        { frame: 100, value: to }
      ];

      var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      animation.setKeys(keys);

      scene.stopAnimation(skybox);
      scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
    };
    // Escuchar eventos de teclas para cambiar la configuración del cielo
    window.addEventListener("keydown", function (evt) {
      switch (evt.keyCode) {
        case 49: setSkyConfig("material.inclination", skyboxMaterial.inclination, 0); break; // 1
        case 50: setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5); break; // 2

        case 51: setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1); break; // 3
        case 52: setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0); break; // 4

        case 53: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 40); break; // 5
        case 54: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5); break; // 6

        case 55: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50); break; // 7
        case 56: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0); break; // 8
        default: break;
      }
    });

    // Configurar a Día
    setSkyConfig("material.inclination", skyboxMaterial.inclination, 0);

    // Arreglo con las configuraciones del cielo en orden
    var skyConfigs = [
      { property: "material.inclination", value: 0 },     // Día
      { property: "material.inclination", value: -0.5 },  // Tarde
      { property: "material.luminance", value: 0.1 },     // Incrementar Luminancia
      { property: "material.luminance", value: 1.0 },     // Disminuir Luminancia
      { property: "material.turbidity", value: 40 },      // Incrementar Turbidez
      { property: "material.turbidity", value: 5 },       // Disminuir Turbidez
      { property: "material.cameraOffset.y", value: 50 }, // Mover horizonte a -50
      { property: "material.cameraOffset.y", value: 0 }   // Restaurar horizonte a 0
    ];

    // Función para aplicar la configuración del cielo
    var index = 0;
    var applyNextSkyConfig = function () {
      var config = skyConfigs[index];
      setSkyConfig(config.property, skyboxMaterial[config.property.split('.')[1]], config.value);
      index = (index + 1) % skyConfigs.length;
    };

    // Configurar el cambio de cielo 30seg
    setInterval(applyNextSkyConfig, 30000);

    return skybox;
};
// Exportar las funciones para crear y utilizar el skybox
export { createSkyBox, skybox }
