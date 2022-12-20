import { describe, expect, test } from '@jest/globals'
import { factorial, pow, square } from './mathOperations'

describe('math operations', () => {
	test.each([
		['^', () => pow(6, 2), 36],
		['**', () => square(6), 36],
		['!', () => factorial(6), 720],
	])('operation %s', (_, fn, expected) => {
		const result = fn()
		expect(result).toEqual(expected)
	})
})
