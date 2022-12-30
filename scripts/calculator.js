const { createInterface } = require('readline')
const { start } = require('../dist/index')

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
})

const question = () =>
	new Promise(resolve => {
		rl.question('> ', expression => {
			const result = start(expression)

			console.log(result)
			resolve(null)
		})
	})

async function app() {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		await question()
	}
}

app()
