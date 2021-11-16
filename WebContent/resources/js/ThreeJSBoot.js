class ThreeJSBoot {
	renderer;
	scene;
	camera;
	light;
	controls;
	
	loadFont(fontUrl){
		const loader = new THREE.FontLoader();
		return new Promise(resolve => {
			loader.load(fontUrl,resolve);
		})
	}

	createStage(htmlElement){
		this.scene = new THREE.Scene();
		this.#createRenderer(htmlElement);
		this.#createCamera(htmlElement);
		this.#createLight();
		this.#createControls();
	}
	
	#createRenderer(htmlElement){
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( htmlElement.clientWidth, htmlElement.clientHeight);
		htmlElement.appendChild( this.renderer.domElement );
	}
	
	#createCamera(htmlElement){
		this.camera = new THREE.PerspectiveCamera(90, htmlElement.clientWidth / htmlElement.clientHeight, 0.1, 1000 );
		this.camera.position.set( 0, 0, 0);
		this.camera.position.z = 6;
	}
	
	#createLight(){
		const color = 0xFFFFFF;
		this.light = new THREE.DirectionalLight(color,1);
		this.light.position.set(-1, 2, 4);
		this.scene.add( this.light );
	}
	
	#createControls(){
		this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		this.controls.update();
	}
	
	createObject3D(geometry,property,material){
		let mashMaterial = material?material:new THREE.MeshPhongMaterial(property);
		return new THREE.Mesh(geometry, mashMaterial);		
	}
	
	//'resources/models/apollo/apollo.mtl'
	async createObjectFrom3DModel(mtlUrl, objUrl){
		let mtl = await this.#loadMtlFile(mtlUrl);
		return await this.#loadObjFile(mtl,objUrl);
	}
	
	#loadMtlFile(mtlUrl){
		return new Promise(resolve => {
			new THREE.MTLLoader().load(mtlUrl, resolve);
		})
	}
	
	#loadObjFile(mtl, objUrl){
		return new Promise(resolve => {
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(mtl);
			objLoader.load(objUrl, resolve);
		})
	}
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
}