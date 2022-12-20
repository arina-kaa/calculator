import { describe, expect, test } from '@jest/globals'
import { parser } from './parser'
import { createNumber, createOperator } from './lexer'

describe('tokens parser', () => {
	test('number', () => {
		const tree = parser([createNumber('1')])
		expect(tree).toEqual(1)
	})

	test('add', () => {
		const tree = parser([createNumber('1'), createOperator('+'), createNumber('2')])
		expect(tree).toEqual({
			operation: '+',
			left: 1,
			right: 2,
		})
	})

	test('subtract', () => {
		const tree = parser([createNumber('3'), createOperator('-'), createNumber('1')])
		expect(tree).toEqual({
			operation: '-',
			left: 3,
			right: 1,
		})
	})

	test('multiply', () => {
		const tree = parser([createNumber('2'), createOperator('*'), createNumber('3')])
		expect(tree).toEqual({
			operation: '*',
			left: 2,
			right: 3,
		})
	})

	test('divide', () => {
		const tree = parser([createNumber('4'), createOperator('/'), createNumber('2')])
		expect(tree).toEqual({
			operation: '/',
			left: 4,
			right: 2,
		})
	})

	test('pow', () => {
		const tree = parser([createNumber('2'), createOperator('^'), createNumber('3')])
		expect(tree).toEqual({
			operation: '^',
			left: 2,
			right: 3,
		})
	})

	test('square', () => {
		const tree = parser([createNumber('3'), createOperator('**')])
		expect(tree).toEqual({
			operation: '**',
			left: 3,
		})
	})

	test('factorial', () => {
		const tree = parser([createNumber('3'), createOperator('!')])
		expect(tree).toEqual({
			operation: '!',
			left: 3,
		})
	})

	test('closed parentheses', () => {
		const tree = parser([
			createOperator('('),
			createNumber('1'),
			createOperator('+'),
			createNumber('2'),
			createOperator(')'),
		])
		expect(tree).toEqual({
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
		const tree = parser([
			createNumber('5'),
			createOperator('-'),
			createOperator('('),
			createNumber('1'),
			createOperator('+'),
			createNumber('2'),
			createOperator(')'),
		])
		expect(tree).toEqual({
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
		const tree = parser([
			createNumber('2'),
			createOperator('*'),
			createOperator('('),
			createNumber('4'),
			createOperator('-'),
			createNumber('1'),
			createOperator(')'),
		])
		expect(tree).toEqual({
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
		const tree = parser([
			createNumber('1'),
			createOperator('+'),
			createNumber('2'),
			createOperator('*'),
			createNumber('3'),
			createOperator('+'),
			createNumber('4'),
		])
		expect(tree).toEqual({
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
