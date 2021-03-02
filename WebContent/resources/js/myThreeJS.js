class MyThreeJS{
	renderer;
	scene;
	camera;
	
	createStage(htmlElement){
		this.#setRenderal(htmlElement);
		this.scene = new THREE.Scene();
		this.#setCamera(htmlElement);
		this.#setControls();		
		this.#setLight();		
	}	
	
	#setRenderal(e){
		//렌더링 할 요소와 화면 크기를 설정
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(e.clientWidth, e.clientHeight );
		e.appendChild(this.renderer.domElement);	
	}
	
	#setLight(){
		const light = new THREE.SpotLight("white", 2); //reference 에서 target 확인
		light.position.set( 10, 10, 10 );		
		this.scene.add(light);
	}
	
	#setCamera(e){
		this.camera = new THREE.PerspectiveCamera(75, e.clientWidth / e.clientHeight, 0.1, 1000 );
		this.camera.position.set(0,0,8);
	}
	
	#setControls(){
		const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		controls.target.set(0, 0, 0);
		controls.update();
	}
		
    createObject(geometry, property, material){	
		let mashMaterial = material?material:new THREE.MeshPhongMaterial(property);
		return new THREE.Mesh(geometry,mashMaterial);	
    }

	createText(url,text,color,size,height,material){
		let resText;		 
		return this.#loadFont(url)
			.then((font)=>{
				const geometry = new THREE.TextGeometry(text, {
				    font: font,
				    size: size?size:1,
				    height: height?height:0.3,
				    curveSegments: 12
		    	});
		    
				resText = new THREE.Mesh(geometry, material?material:new THREE.MeshPhongMaterial( { color:color} ));
				this.scene.add(resText);
				return resText;			
			})		
	}
	
	#loadFont(url) {		
	    return new Promise((resolve, reject) => {
	      new THREE.FontLoader().load(url, resolve);
	    });
	}	
	
	createBackgroundWithTexture(texture){		 
	    this.scene.background = new THREE.CubeTextureLoader().load(texture);	
	}
				
	createObjObject(objUrl,mtlUrl){		
		 return this.#loadMtl(mtlUrl)
		 .then((mtl)=>{
			mtl.preload();
			return this.#loadObj(objUrl,mtl)
				.then((obj)=>{
					this.scene.add(obj);
					return obj;
				})
		 })
	}
	
	#loadMtl(url){
		return new Promise((resolve, reject) => {
	      new THREE.MTLLoader().load(url, resolve);
	    });
	}
	
	#loadObj(url,mtl){
		const objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(mtl);
		return new Promise((resolve, reject) => {
	      objLoader.load(url, resolve);
	    });
	}
	
	
	
}

