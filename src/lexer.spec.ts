import { describe, expect, test } from '@jest/globals'
import { createNumber, createOperator, lexer, TokenType } from './lexer'

describe('tokens creation', () => {
	test.each([
		['1', 1],
		['12', 12],
	])('create number %i', (input, expected) => {
		const result = createNumber(input)
		expect(result).toEqual({
			type: TokenType.NUMBER,
			value: expected,
		})
	})

	test('create invalid number', () => {
		expect(() => createNumber('+')).toThrow()
	})

	test.each(['+', '-', '*', '/', '**', '^', '!', '(', ')'])('create operator %s', (operator) => {
		const result = createOperator(operator)
		expect(result).toEqual({
			type: TokenType.OPERATOR,
			value: operator,
		})
	})

	test('create unsupported operator', () => {
		expect(() => createNumber('%')).toThrow()
	})
})

describe('lexer analyze', () => {
	test.each([
		['1', [createNumber('1')]],
		['11', [createNumber('11')]],
		['111', [createNumber('111')]],
		['1 + 2', [createNumber('1'), createOperator('+'), createNumber('2')]],
		['1+2', [createNumber('1'), createOperator('+'), createNumber('2')]],
		['1 - 2', [createNumber('1'), createOperator('-'), createNumber('2')]],
		['1-2', [createNumber('1'), createOperator('-'), createNumber('2')]],
		['1 * 2', [createNumber('1'), createOperator('*'), createNumber('2')]],
		['1*2', [createNumber('1'), createOperator('*'), createNumber('2')]],
		['1 / 2', [createNumber('1'), createOperator('/'), createNumber('2')]],
		['1/2', [createNumber('1'), createOperator('/'), createNumber('2')]],
		['1 **', [createNumber('1'), createOperator('**')]],
		['1**', [createNumber('1'), createOperator('**')]],
		['1 ^ 2', [createNumber('1'), createOperator('^'), createNumber('2')]],
		['1^2', [createNumber('1'), createOperator('^'), createNumber('2')]],
		['1 !', [createNumber('1'), createOperator('!')]],
		['1!', [createNumber('1'), createOperator('!')]],
		[
			'( 1 + 2 )',
			[
				createOperator('('),
				createNumber('1'),
				createOperator('+'),
				createNumber('2'),
				createOperator(')'),
			],
		],
		[
			'(1+2)',
			[
				createOperator('('),
				createNumber('1'),
				createOperator('+'),
				createNumber('2'),
				createOperator(')'),
			],
		],
	])('%s', (input, expected) => {
		const result = lexer(input)
		expect(result).toEqual(expected)
	})

	test('invalid input', () => {
		expect(() => lexer('1 % 2')).toThrow()
	})
})
