class ThreeJSBoot{
	renderer;
	scene;
	camera;
	light;
	controls;
	
	createStage(htmlElement){
		this.scene = new THREE.Scene();
		this.#setRenderar(htmlElement);
		this.#setCamera(htmlElement);
		this.#setLight();
		this.#setControls();
	}
	
	#setRenderar(htmlElement){
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( htmlElement.clientWidth, htmlElement.clientHeight );
		htmlElement.appendChild(this.renderer.domElement);
	}
	
	#setCamera(htmlElement){
		this.camera = new THREE.PerspectiveCamera( 75, htmlElement.clientWidth / htmlElement.clientHeight, 0.1, 1000 );
		this.camera.position.z = 8;
	}
	
	#setLight(){
		  this.light = new THREE.DirectionalLight('white', 1);
		  this.light.position.set(-1, 2, 4);
		  this.scene.add(this.light);
	}
	
	#setControls(){
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.target.set(0, 0, 0);
		this.controls.update();
	}
	
	createObject(geometry,property,material){
		let mashMaterial = material?material:new THREE.MeshPhongMaterial(property);
		return new THREE.Mesh(geometry,mashMaterial);		
	}
	
	
	#loadFont(url){
		return new Promise((resolve) =>{
			new THREE.FontLoader().load(url,resolve)
		})		
	}
	
	createText(url,text,color,size,height,material){
		//async함수는 return값이 있을 경우 return값을 resolve하는 promise를 반환한다.
		let asyncText = async () =>{
			let font = await this.#loadFont(url);
			const geometry = new THREE.TextGeometry(text, {
					font: font,
					size: size?size:1,
					height: height?height:0.3,
					curveSegments: 12			
			});
			
			const meshMaterial = material?material:new THREE.MeshPhongMaterial({color: color});
			return new THREE.Mesh(geometry,meshMaterial);
		}
		
		return asyncText();
	}
	
	createObjectFromObj(objUrl,mtlUrl){
		let asyncObj = async () =>{
			let mtl = await this.#loadMtl(mtlUrl);
			return await this.#loadObj(objUrl,mtl);
		}
		
		return asyncObj();
	}
	
	#loadMtl(url){
		return new Promise(resolve =>{
			new THREE.MTLLoader().load(url,resolve);
		})
	}
	
	#loadObj(url,mtl){
		 mtl.preload();
	     const objLoader = new THREE.OBJLoader();
		 objLoader.setMaterials(mtl);
		 return new Promise(resolve => {
			objLoader.load(url,resolve);
		})
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}