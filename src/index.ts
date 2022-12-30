import { lexer } from './lexer'
import { parser } from './parser'
import { calc } from './calc'

const start = (expression: string): number => {
	const tokens = lexer(expression)
	const tree = parser(tokens)
	return calc(tree)
}

exports.start = start
