import { checkNever } from './checkNever'
import { Tree } from './parser'

export const pow = (a: number, b: number) => Math.pow(a, b)
export const square = (a: number) => Math.pow(a, 2)
export const factorial = (a: number): number => (a !== 1 ? a * factorial(a - 1) : 1)

export const calc = (tree: Tree): number => {
	if (typeof tree === 'number') {
		return tree
	}

	switch (tree.operation) {
		case '+':
			return calc(tree.left) + calc(tree.right)
		case '-':
			return calc(tree.left) - calc(tree.right)
		case '*':
			return calc(tree.left) * calc(tree.right)
		case '/':
			return calc(tree.left) / calc(tree.right)
		case '^':
			return pow(calc(tree.left), calc(tree.right))
		case '**':
			return square(calc(tree.left))
		case '!':
			return factorial(calc(tree.left))
		default:
			return checkNever(tree, `Unexpected operation: ${tree}`)
	}
}
