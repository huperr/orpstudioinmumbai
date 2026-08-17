//time for some bad codes
const coordX = document.getElementById("coordX")
const coordY = document.getElementById("coordY")
const coordZ = document.getElementById("coordZ")

const sizeX = document.getElementById("sizeX")
const sizeY = document.getElementById("sizeY")
const sizeZ = document.getElementById("sizeZ")

const selectPart = document.getElementById("selectPart")

const output = document.getElementById("outputJSON") //oh no..
//hey future me these down here do nothing
const outputX = document.getElementById("X")
const outputY = document.getElementById("Y")
const outputZ = document.getElementById("Z")

const sX = document.getElementById("sX")
const sY = document.getElementById("sY")
const sZ = document.getElementById("sZ")

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

update(selectPart, sP)

//array :fear:
const parts = []

//super annoying thing
const game = new Object()
game.Difficulty = "10"
game.ObbyName = "My Obby"
game.Creator = "Your Name"
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
	part.Name = "Part" //change later
	part.ClassName = "Part"
	parts.push(part)
	console.log(parts) //testing sensei
}
function addSpawn() {
    let spawn = new Object()
    spawn.Properties = new Object()
    spawn.Properties.Rotation = [0, 0, 0]
    spawn.Properties.Color = "green" //lol
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
}
selectPart.addEventListener("input", loadPart)
//delete thing
function deletePart() {
	parts.splice((selectPart.value - 1), 1)
}
function exportJSON() {
	output.textContent = JSON.stringify(game, null, 2)
}
addSpawn()