import type { Scene } from '@babylonjs/core';

export async function createShowcaseScene(scene: Scene) {
	const {
		ArcRotateCamera,
		Color3,
		CubeTexture,
		HemisphericLight,
		MeshBuilder,
		PBRMaterial,
		Vector3
	} = await import('@babylonjs/core');

	scene.clearColor.set(0.04, 0.1, 0.16, 1);

	const camera = new ArcRotateCamera(
		'camera',
		-Math.PI / 2,
		Math.PI / 2.5,
		7,
		Vector3.Zero(),
		scene
	);
	camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
	camera.lowerRadiusLimit = 4;
	camera.upperRadiusLimit = 12;
	camera.wheelDeltaPercentage = 0.01;

	const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);
	light.intensity = 1.2;

	const sphere = MeshBuilder.CreateSphere(
		'hero',
		{ diameter: 2.2, segments: 48 },
		scene
	);
	sphere.position.y = 1.3;

	const ribbon = MeshBuilder.CreateTorus(
		'ribbon',
		{ diameter: 3.6, thickness: 0.18, tessellation: 128 },
		scene
	);
	ribbon.rotation.x = Math.PI / 2.2;

	const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
	ground.position.y = -0.05;

	const glass = new PBRMaterial('glass', scene);
	glass.albedoColor = Color3.FromHexString('#66B2FF');
	glass.metallic = 0.25;
	glass.roughness = 0.14;
	glass.alpha = 0.9;
	sphere.material = glass;

	const bronze = new PBRMaterial('bronze', scene);
	bronze.albedoColor = Color3.FromHexString('#90CAF9');
	bronze.metallic = 0.85;
	bronze.roughness = 0.24;
	ribbon.material = bronze;

	const floor = new PBRMaterial('floor', scene);
	floor.albedoColor = Color3.FromHexString('#132F4C');
	floor.roughness = 0.92;
	ground.material = floor;

	scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
		'https://assets.babylonjs.com/environments/environmentSpecular.env',
		scene
	);
	scene.createDefaultSkybox(scene.environmentTexture, true, 1000, 0.08);

	scene.onBeforeRenderObservable.add(() => {
		sphere.rotation.y += 0.008;
		ribbon.rotation.z -= 0.01;
	});
}
