import { MathOperator, Token, Tokens, TokenType } from './lexer'

export type Tree =
	| {
			operation: MathOperator
			left: Tree
			right: Tree
	  }
	| {
			operation: '!' | '**'
			left: Tree
	  }
	| number

export const parser = (tokens: Tokens): Tree => {
	let i = 0

	const parseExpression = (token: Token): Tree => {
		const t1 = parseT1(token)
		if (i === tokens.length) {
			return t1
		}

		const operator = tokens[i]
		if (
			operator &&
			operator.type === TokenType.OPERATOR &&
			(operator.value === '+' || operator.value === '-')
		) {
			i++
			return {
				operation: operator.value,
				left: t1,
				right: parseExpression(tokens[i]),
			}
		}

		return t1
	}

	const parseT1 = (token: Token): Tree => {
		const t2 = parseT2(token)
		if (i === tokens.length) {
			return t2
		}

		const operator = tokens[i]
		if (
			operator &&
			operator.type === TokenType.OPERATOR &&
			(operator.value === '*' || operator.value === '/')
		) {
			i++
			return {
				operation: operator.value,
				left: t2,
				right: parseT1(tokens[i]),
			}
		}

		return t2
	}

	const parseT2 = (token: Token): Tree => {
		const t3 = parseT3(token)
		if (i === tokens.length) {
			return t3
		}

		const operator = tokens[i]
		if (operator && operator.type === TokenType.OPERATOR && operator.value === '^') {
			i++
			return {
				operation: operator.value,
				left: t3,
				right: parseT2(tokens[i]),
			}
		}

		return t3
	}

	const parseT3 = (token: Token): Tree => {
		const t4 = parseT4(token)

		const operator = tokens[i]
		if (
			operator &&
			operator.type === TokenType.OPERATOR &&
			(operator.value === '!' || operator.value === '**')
		) {
			i++
			return {
				operation: operator.value,
				left: t4,
			}
		}

		return t4
	}

	const parseT4 = (token: Token): Tree => {
		if (token && token.type === TokenType.OPERATOR && token.value === '(') {
			i++
			const expr = parseExpression(tokens[i])
			console.log(i)
			if (i === tokens.length || tokens[i].value !== ')') {
				throw new Error(`Unexpected token ${tokens[i].value} in ${i}. Expected: )`)
			} else {
				i++
			}
			return expr
		}

		if (token.type === TokenType.NUMBER) {
			i++
			return token.value
		}

		throw new Error(`Unknown error`)
	}

	return parseExpression(tokens[i])
}
