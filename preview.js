const game = JSON.parse(localStorage.getItem("obbyData")) //get json file
const parts = game.Data.Children
const hue = document.getElementById("hue")

const canvas = document.getElementById("preview")
const ctx = canvas.getContext("2d") //copy straight from google is there a 3d thing
//draw :scream:
const bigboi = 5
function shape(part, x, y, width, height) {
	ctx.fillStyle = part.Properties.Color
	ctx.beginPath()
	//this wont be long i hope
	if (part.ClassName === "Part") {
		ctx.fillRect(x, y, width, height)
	} else if (part.ClassName === "BallPart") {
		ctx.arc(x+width/2,
				y+width/2,
				width/2, //orp only accept ball with width = height sooo
				0, Math.PI*2)
		ctx.fill()
	} else if (part.ClassName === "WedgePart") {
		ctx.moveTo(x, y + height) //bottom left blah blah blah
        ctx.lineTo(x + width, y + height)
        ctx.lineTo(x + width, y)
        ctx.closePath()
        ctx.fill()
	} else if (part.ClassName === "CornerWedgePart") {
		alert("fuck corner wedge :cry:")
	} else if (part.ClassName == "Cylinder") {
		alert("fuck cylinder")
	} else {
		ctx.fillRect(x, y, width, height) //spawnpoint
	}
}
function draw() {
	ctx.fillStyle = "white" //clear
	ctx.fillRect(400, 300, 800, 400)
	let a = 0
	if (hue.checked) { //top down go brr
		a = 2
	} else {
		a = 1
	}
	for (const part of parts) { //const soup! mhm
		const pos = part.Properties.Position
		const size = part.Properties.Size
		const boi = 400 + Number(pos[0]) * bigboi //x
		const boiz = 300 - Number(pos[a]) * bigboi //y or z
		const boi_width = Number(size[0]) * bigboi
		const boi_height = Number(size[a]) * bigboi
		shape(part, boi, boiz, boi_width, boi_height)
	}
}
draw()
hue.addEventListener("change", draw)
console.log(game)
console.log(parts)