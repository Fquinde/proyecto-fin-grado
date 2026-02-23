export function createHUD(scene) {
    // Crear una textura avanzada para la interfaz de usuario que cubre toda la pantalla
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const createImage = (imagePath, top, left, width, height) => {
        const image = new BABYLON.GUI.Image("image", imagePath);
        image.width = width;
        image.height = height;
        image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        image.top = top;
        image.left = left;
        return image;
    };

    // Crear y agregar las imágenes al HUD

    const image4 = createImage("assets/image/jiantou2.png", "-1.9%", "0%", "140px", "20px");
    const image5 = createImage("assets/image/jiantou3.png", "-1.9%", "0%", "50px", "30px");

    advancedTexture.addControl(image4);
    advancedTexture.addControl(image5);


    // Mostrar/Ocultar HUD basado en la cámara activa, solo se activara en la camara 1
    scene.onAfterRenderObservable.add(() => {
        const isFirstPerson = scene.activeCamera === scene.firstPersonCamera;
        advancedTexture.rootContainer.isVisible = isFirstPerson;
    });
}