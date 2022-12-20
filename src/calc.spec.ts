import { describe, expect, test } from '@jest/globals'
import { calc, factorial, pow, square } from './calc'

describe('math operations', () => {
	test.each([
		['^', () => pow(6, 2), 36],
		['**', () => square(6), 36],
		['!', () => factorial(6), 720],
	])('operation %s', (_, fn, expected) => {
		const result = fn()
		expect(result).toEqual(expected)
	})

	test('calc number', () => {
		const result = calc(1)
		expect(result).toBe(1)
	})

	test('calc add', () => {
		const result = calc({
			operation: '+',
			left: 1,
			right: 2,
		})
		expect(result).toBe(3)
	})

	test('calc subtract', () => {
		const result = calc({
			operation: '-',
			left: 3,
			right: 1,
		})
		expect(result).toBe(2)
	})

	test('calc multiply', () => {
		const result = calc({
			operation: '*',
			left: 2,
			right: 3,
		})
		expect(result).toBe(6)
	})

	test('calc divide', () => {
		const result = calc({
			operation: '/',
			left: 4,
			right: 2,
		})
		expect(result).toBe(2)
	})

	test('calc pow', () => {
		const result = calc({
			operation: '^',
			left: 2,
			right: 3,
		})
		expect(result).toBe(8)
	})

	test('calc square', () => {
		const result = calc({
			operation: '**',
			left: 3,
		})
		expect(result).toBe(9)
	})

	test('calc factorial', () => {
		const result = calc({
			operation: '!',
			left: 3,
		})
		expect(result).toBe(6)
	})

	test('calc subtract sum', () => {
		const result = calc({
			operation: '-',
			left: 5,
			right: {
				operation: '+',
				left: 1,
				right: 2,
			},
		})
		expect(result).toBe(2)
	})

	test('calc multiply division', () => {
		const result = calc({
			operation: '*',
			left: 2,
			right: {
				operation: '-',
				left: 4,
				right: 1,
			},
		})
		expect(result).toBe(6)
	})

	test('calc sum different', () => {
		const result = calc({
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
		expect(result).toBe(11)
	})
})
