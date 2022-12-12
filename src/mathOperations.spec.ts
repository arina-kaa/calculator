import { describe, expect, test } from '@jest/globals'
import {
	add,
	divide,
	factorial,
	getLeftOperatorFn,
	getRightOperatorFn,
	multiply,
	pow,
	square,
	subtract,
} from './mathOperations'
import { MathOperator } from './lexer'

describe('math operations', () => {
	test.each([
		['+', () => add(6, 3), 9],
		['-', () => subtract(6, 3), 3],
		['*', () => multiply(6, 3), 18],
		['/', () => divide(6, 3), 2],
		['^', () => pow(6, 2), 36],
		['**', () => square(6), 36],
		['!', () => factorial(6), 720],
	])('operation %s', (_, fn, expected) => {
		const result = fn()
		expect(result).toEqual(expected)
	})

	test.each([
		['+', 9, 3, 12],
		['-', 9, 3, 6],
		['*', 9, 3, 27],
		['/', 9, 3, 3],
		['^', 9, 3, 729],
	])('left associativity operation %s', (operator, a, b, expected) => {
		const fn = getLeftOperatorFn(operator as MathOperator)
		expect(fn).toBeDefined()
		if (fn) {
			expect(fn(a, b)).toEqual(expected)
		}
	})

	test.each(['**', '!'])('invalid left associativity operation %s', (operator) => {
		const fn = getLeftOperatorFn(operator as MathOperator)
		expect(fn).not.toBeDefined()
	})

	test.each([
		['**', 3, 9],
		['!', 3, 6],
	])('right associativity operation %s', (operator, a, expected) => {
		const fn = getRightOperatorFn(operator as MathOperator)
		expect(fn).toBeDefined()
		if (fn) {
			expect(fn(a)).toEqual(expected)
		}
	})

	test.each(['+', '-', '*', '/', '^'])('invalid right associativity operation %s', (operator) => {
		const fn = getRightOperatorFn(operator as MathOperator)
		expect(fn).not.toBeDefined()
	})
})
