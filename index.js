/**
 * Simple draw
 *
 * ^ - up 10 pixel
 * v - down 10 pixel
 * < - left 10 pixel
 * > - right 10 pixel
 * @ - center
 * d - start drawing
 * e - end drawing
 * c(index) - change color to index
 */
const canvas = document.getElementById("canvas");
const input = document.getElementById("input");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

/** Simple 10x10 square */
const code =
	"d@^^>>vv<<^^<<vvvv>><<><><^^<><e<><d>><<<^^^^^^^vvvv<><v<v<<>><>vv";

const colors = "000,FFD151,E77728,1F0318,9B6A6C,226CE0,AF125A,1F1300,EA526F,00A6A6"
	.split`,`;

const run = (code) => {
	code = [...code];

	let x = 0;
	let y = 0;
	let drawing = false;
	let color = 0;

	function draw() {
		if (drawing) {
			ctx.fillStyle = "#" + (colors[color] || "000");
			ctx.fillRect(x, y, 10, 10);
		}
	}

	code.forEach((c, i) => {
		switch (c) {
			case "^":
				/** Up 10 pixels */
				y -= 10;
				draw();
				break;
			case "v":
				/** Down 10 pixels */
				y += 10;
				draw();
				break;
			case "<":
				/** Left 10 pixels */
				x -= 10;
				draw();
				break;
			case ">":
				/** Right 10 pixels */
				x += 10;
				draw();
				break;
			case "@":
				/** Center */
				x = canvas.width / 2;
				y = canvas.height / 2;
				draw();
				break;
			case "d":
				/** Start drawing */
				drawing = true;
				break;
			case "e":
				/** End drawing */
				drawing = false;
				break;
			case "c":
				/** Change color */
				color = +code[i + 1];
				break;
		}
	});
};

run(code);

input.addEventListener("keyup", (e) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	console.log("KEYUP");
	run(e.target.value);
});
