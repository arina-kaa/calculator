import { MathOperator } from './lexer'
import { checkNever } from './checkNever'

export const add = (a: number, b: number) => a + b
export const subtract = (a: number, b: number) => a - b
export const multiply = (a: number, b: number) => a * b
export const divide = (a: number, b: number) => a / b
export const pow = (a: number, b: number) => Math.pow(a, b)
export const square = (a: number) => Math.pow(a, 2)
export const factorial = (a: number): number => (a !== 1 ? a * factorial(a - 1) : 1)

export const getLeftOperatorFn = (operator: MathOperator) => {
	switch (operator) {
		case '+':
			return add
		case '-':
			return subtract
		case '*':
			return multiply
		case '/':
			return divide
		case '^':
			return pow
		case '**':
		case '!':
			return undefined
		default:
			checkNever(operator)
	}
}

export const getRightOperatorFn = (operator: MathOperator) => {
	switch (operator) {
		case '+':
		case '-':
		case '*':
		case '/':
		case '^':
			return undefined
		case '**':
			return square
		case '!':
			return factorial
		default:
			checkNever(operator)
	}
}
