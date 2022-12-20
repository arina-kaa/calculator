import { createInterface } from 'readline'
import { lexer } from './lexer'
import { parser } from './parser'
import { calc } from './calc'

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
})

const question = (): Promise<null> =>
	new Promise((resolve) => {
		rl.question('> ', (expression: string) => {
			const tokens = lexer(expression)
			const tree = parser(tokens)
			const result = calc(tree)

			console.log(result)
			resolve(null)
		})
	})

async function app(): Promise<null> {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		await question()
	}
}

app()
