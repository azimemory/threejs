class DoubleLineFont{
	color; 
	message; 
	size;
	
	fontGeometry; 
	shapes;
	xMid;
	matLite;
	matDark;
	
	constructor(font, color, message, size){
		this.color = color;
		this.message = message;
		this.size = size;
		this.shapes = font.generateShapes(this.message, this.size);
		this.fontGeometry = new THREE.ShapeGeometry(this.shapes);
		this.fontGeometry.computeBoundingBox();
		this.xMid = - 0.5 * ( this.fontGeometry.boundingBox.max.x - this.fontGeometry.boundingBox.min.x );
		
		this.matLite = new THREE.MeshBasicMaterial( {
			color: this.color,
			transparent: true,
			opacity: 0.4,
			side: THREE.DoubleSide
		} );
		
		this.matDark = new THREE.LineBasicMaterial( {
			color: this.color,
			side: THREE.DoubleSide
		});
	}
	
	#createText(){
		this.fontGeometry.translate(this.xMid, 0, 0 );
		return new THREE.Mesh( this.fontGeometry, this.matLite );
	}
	
	#createLine(){
		const lineText = new THREE.Object3D();
		this.shapes.push.apply(this.shapes, this.#createHoleShapes(this.shapes));
	
		this.shapes.forEach(shape =>{
			const points = shape.getPoints();
			const geometry = new THREE.BufferGeometry().setFromPoints( points );
			geometry.translate(this.xMid, 0, 0 );
			const lineMesh = new THREE.Line(geometry, this.matDark );
			lineText.add( lineMesh );
		})
	
		return lineText;
	}
	
	#createHoleShapes(shapes){
		const holeShapes = [];
		shapes.forEach(e => {
			if (e.holes) e.holes.forEach(hole => {holeShapes.push( hole )});
		})
		return holeShapes;
	}
	
	createLineText(){
		let text = this.#createText();
		let lineText = this.#createLine();	
		
		text.position.set(150,50,-70);
		lineText.position.set(150,50,-69.5);
		
		return {'text':text,'lineText':lineText};
	}
}


