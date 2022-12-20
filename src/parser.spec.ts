import { describe, expect, test } from '@jest/globals'
import { parser } from './parser'
import { createNumber, createOperator } from './lexer'

describe('tokens parser', () => {
	test('number', () => {
		const p = parser([createNumber('1')])
		expect(p).toEqual(1)
	})

	test('add', () => {
		const p = parser([createNumber('1'), createOperator('+'), createNumber('2')])
		expect(p).toEqual({
			operation: '+',
			left: 1,
			right: 2,
		})
	})

	test('subtract', () => {
		const p = parser([createNumber('1'), createOperator('-'), createNumber('2')])
		expect(p).toEqual({
			operation: '-',
			left: 1,
			right: 2,
		})
	})

	test('multiply', () => {
		const p = parser([createNumber('1'), createOperator('*'), createNumber('2')])
		expect(p).toEqual({
			operation: '*',
			left: 1,
			right: 2,
		})
	})

	test('divide', () => {
		const p = parser([createNumber('1'), createOperator('/'), createNumber('2')])
		expect(p).toEqual({
			operation: '/',
			left: 1,
			right: 2,
		})
	})

	test('pow', () => {
		const p = parser([createNumber('1'), createOperator('^'), createNumber('2')])
		expect(p).toEqual({
			operation: '^',
			left: 1,
			right: 2,
		})
	})

	test('square', () => {
		const p = parser([createNumber('1'), createOperator('**')])
		expect(p).toEqual({
			operation: '**',
			left: 1,
		})
	})

	test('factorial', () => {
		const p = parser([createNumber('1'), createOperator('!')])
		expect(p).toEqual({
			operation: '!',
			left: 1,
		})
	})

	test('closed parentheses', () => {
		const p = parser([
			createOperator('('),
			createNumber('1'),
			createOperator('+'),
			createNumber('2'),
			createOperator(')'),
		])
		expect(p).toEqual({
			operation: '+',
			left: 1,
			right: 2,
		})
	})

	test('unclosed parentheses', () => {
		expect(() =>
			parser([
				createOperator('('),
				createNumber('1'),
				createOperator('+'),
				createNumber('2'),
			]),
		).toThrow()
	})

	test('subtract sum', () => {
		const p = parser([
			createNumber('5'),
			createOperator('-'),
			createOperator('('),
			createNumber('1'),
			createOperator('+'),
			createNumber('2'),
			createOperator(')'),
		])
		expect(p).toEqual({
			operation: '-',
			left: 5,
			right: {
				operation: '+',
				left: 1,
				right: 2,
			},
		})
	})

	test('multiply division', () => {
		const p = parser([
			createNumber('2'),
			createOperator('*'),
			createOperator('('),
			createNumber('4'),
			createOperator('-'),
			createNumber('1'),
			createOperator(')'),
		])
		expect(p).toEqual({
			operation: '*',
			left: 2,
			right: {
				operation: '-',
				left: 4,
				right: 1,
			},
		})
	})

	test('sum different', () => {
		const p = parser([
			createNumber('1'),
			createOperator('+'),
			createNumber('2'),
			createOperator('*'),
			createNumber('3'),
			createOperator('+'),
			createNumber('4'),
		])
		expect(p).toEqual({
			operation: '+',
			left: 1,
			right: {
				operation: '+',
				left: {
					operation: '*',
					left: 2,
					right: 3,
				},
				right: 4,
			},
		})
	})
})
