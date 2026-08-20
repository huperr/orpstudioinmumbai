const game = JSON.parse(localStorage.getItem("obbyData"))
const parts = game.Data.Children
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
scene.background = new THREE.Color('#E5FEFF')
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
camera.position.set(0, 0, 20)
const hemiLight = new THREE.HemisphereLight('#E5FEFF', '#444444', 0.8)
scene.add(hemiLight)

//sum shit
function render() { //no more draw!
	for (const part of parts) {
		let geometry
		if (part.Shape === "Part") {
			geometry = new THREE.BoxGeometry(part.Properties.Size[0], part.Properties.Size[1], part.Properties.Size[2]) //normal part
		}
		if (part.Shape === "Ball") {
			if (part.Properties.Size[0] === part.Properties.Size[1] && part.Properties.Size[1] === part.Properties.Size[2]) {
				geometry = new THREE.DodecahedronGeometry((part.Properties.Size[0]/2), 5) //ball
			}  else {
			alert("error in ball part: scale x must be equal to y and z") 
			}
		}
		if (part.Shape === "Cylinder") {
			geometry = new THREE.CylinderGeometry((part.Properties.Size[1]/2),(part.Properties.Size[1]/2), part.Properties.Size[0], 32) //cylinder yay
			geometry.rotateZ(Math.PI / 2)
		}
		if (part.Shape === "Wedge") {
			const x = part.Properties.Size[0]
			const y = part.Properties.Size[1]
			const z = part.Properties.Size[2]
			const wedge = new THREE.Shape()
			wedge.moveTo(-z/2, -y/2) //start
			wedge.lineTo(z/2, -y/2) //bttm
			wedge.lineTo(z/2, y/2) //end
			wedge.closePath()
			geometry = new THREE.ExtrudeGeometry(wedge, {depth: x, bevelEnabled: false})
			geometry.rotateY(-Math.PI/2)
			geometry.translate(-x/2, 0, 0) 
		}
		//fuck corner wedge i hate i kill
		const material = new THREE.MeshStandardMaterial({color: part.Properties.Color, opacity: (1 - part.Transparency), transparent: true})
		const prt = new THREE.Mesh(geometry, material)
		console.log(part.Transparency)
		console.log(part.Properties.Rotation[0])
		prt.position.set(part.Properties.Position[0], part.Properties.Position[1], part.Properties.Position[2])
		prt.rotation.set(part.Properties.Rotation[0], part.Properties.Rotation[1], part.Properties.Rotation[2])
		scene.add(prt)
	}
}
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
const controls = new THREE.OrbitControls(camera, renderer.domElement)
function main() {
	controls.update()
	renderer.render(scene, camera)
	requestAnimationFrame(main)
}
render()
main()