//time for some bad codes
const coordX = document.getElementById("coordX")
const coordY = document.getElementById("coordY")
const coordZ = document.getElementById("coordZ")

const sizeX = document.getElementById("sizeX")
const sizeY = document.getElementById("sizeY")
const sizeZ = document.getElementById("sizeZ")

const rotateX = document.getElementById("rotateX")
const rotateY = document.getElementById("rotateY")
const rotateZ = document.getElementById("rotateZ")

const color = document.getElementById("colorInput")

const selectPart = document.getElementById("selectPart")

const output = document.getElementById("outputJSON") //oh no..
const textOutput = document.getElementById("outputText")

const download = document.getElementById("download")
//obby thing
const obbyName = document.getElementById("obbyName")
const obbyDifficulty = document.getElementById("obbyDifficulty")
const obbyCreator = document.getElementById("obbyCreator")
//hey future me these down here do nothing
const outputX = document.getElementById("X")
const outputY = document.getElementById("Y")
const outputZ = document.getElementById("Z")

const colorOutput = document.getElementById("color")

const sX = document.getElementById("sX")
const sY = document.getElementById("sY")
const sZ = document.getElementById("sZ")

const rX = document.getElementById("rX")
const rY = document.getElementById("rY")
const rZ = document.getElementById("rZ")

const sP = document.getElementById("sP")
//ger
function update(input, output) {
    output.textContent = input.value

    input.addEventListener("input", () => {
        output.textContent = input.value
    })
}
//update thing
update(coordX, outputX)
update(coordY, outputY)
update(coordZ, outputZ)

update(sizeX, sX)
update(sizeY, sY)
update(sizeZ, sZ)

update(rotateX, rX)
update(rotateY, rY)
update(rotateZ, rZ)

update(selectPart, sP)

update(color, colorOutput)

//array :fear:
const parts = []

//super annoying thing
const game = new Object()
game.Difficulty = obbyDifficulty.value
game.ObbyName = obbyName.value
game.Creator = obbyCreator.value
game.Data = new Object()
game.Data.Children = parts
game.Data.Name = "Obby"
game.Data.ClassName = "Folder"


//rel script.. :scream:
function addPart() {
	let part = new Object()
    part.Properties = new Object()
	part.Properties.Position = [coordX.value, coordY.value, coordZ.value]
	part.Properties.Size = [sizeX.value, sizeY.value, sizeZ.value]
	part.Properties.Rotation = [rotateX.value, rotateY.value, rotateZ.value]
	part.Properties.Color = color.value
	part.Name = "Part" //change later
	part.ClassName = "Part"
	parts.push(part)
	console.log(parts) //testing sensei
}
function addSpawn() {
    let spawn = new Object()
    spawn.Properties = new Object()
    spawn.Properties.Rotation = [0, 0, 0]
    spawn.Properties.Color = "#03bd00" //lol
    spawn.Properties.Position = [coordX.value, coordY.value, coordZ.value]
    spawn.Properties.Size = [1, 1, 1]
    spawn.Name = "SpawnLocation"
    spawn.ClassName = "Spawn"
    parts.push(spawn)
}
//confirm change
function editPart() {
	let id = parts[selectPart.value - 1]
	id.Properties.Position = [coordX.value, coordY.value, coordZ.value]
	id.Properties.Size = [sizeX.value, sizeY.value, sizeZ.value]
	id.Properties.Rotation = [rotateX.value, rotateY.value, rotateZ.value]
	id.Properties.Color = color.value
	console.log(id)
}
//load shit
function loadPart() {
	let id = parts[selectPart.value - 1] //again again again ahhahahhha
	coordX.value = id.Properties.Position[0]
	coordY.value = id.Properties.Position[1] //sori for the repetitive code its 2am
	coordZ.value = id.Properties.Position[2]
	
	sizeX.value = id.Properties.Size[0]
	sizeY.value = id.Properties.Size[1]
	sizeZ.value = id.Properties.Size[2] 
	
	rotateX.value = id.Properties.Rotation[0]
	rotateY.value = id.Properties.Rotation[1]
	rotateZ.value = id.Properties.Rotation[2]
	
	color.value = id.Properties.Color
}
selectPart.addEventListener("input", loadPart)
//delete thing
function deletePart() {
	parts.splice((selectPart.value - 1), 1)
}
function exportJSON() {
	game.ObbyName = obbyName.value //update again cuz yes 
	game.Difficulty = obbyDifficulty.value
	game.Creator = obbyCreator.value
	let json = JSON.stringify(game, null, 2)
	output.textContent = json //give u the json in da output thing
	if (download.checked) { //downloading everytime is annoying as fuck
		let file = new Blob([json], {type: "application/json"})
		let link = document.createElement("a")
	
		link.href = URL.createObjectURL(file)
		link.download = game.ObbyName + ".json"
		link.click()
	}
}
function exportText() {
	let a = ""
	for (let i = 0; i < parts.length; i++){
	let part = parts[i]
	a += part.Name + " ("+part.ClassName +")"+ "\n"
	a += "(Position: " + part.Properties.Position.join(",") + "\n"
	a += "Size: " + part.Properties.Size.join(",") + "\n"
	a += "Rotation: " + part.Properties.Rotation.join(",") + "\n"
	a += "Color: " + part.Properties.Color +")"+ "\n"
	a += "\n"
	}
	textOutput.textContent = a
}
addSpawn()
