export enum TokenType {
	NUMBER = 'number',
	OPERATOR = 'operator',
}

interface NumberToken {
	type: TokenType.NUMBER
	value: number
}

interface OperatorToken {
	type: TokenType.OPERATOR
	value: '+' | '-' | '*' | '/' | '**' | '^' | '!' | '(' | ')'
}

export type Token = NumberToken | OperatorToken
export type Tokens = Token[]

const isOperator = (ch: string) => /[+\-*/^!()]/.test(ch)
const isDigit = (ch: string) => /[0-9]/.test(ch)
const isWhiteSpace = (ch: string) => /\s/.test(ch)

export const createNumber = (input: string): NumberToken => {
	const number = parseFloat(input)
	if (!isNaN(number)) {
		return {
			type: TokenType.NUMBER,
			value: parseFloat(input),
		}
	}

	throw new Error(`Invalid number: ${input}`)
}

export const createOperator = (input: string): OperatorToken => {
	if (
		input === '+' ||
		input === '-' ||
		input === '*' ||
		input === '/' ||
		input === '**' ||
		input === '^' ||
		input === '!' ||
		input === '(' ||
		input === ')'
	) {
		return {
			type: TokenType.OPERATOR,
			value: input,
		}
	}

	throw new Error(`Unsupported operator: ${input}`)
}

export const lexer = (input: string): Tokens => {
	const tokens: Tokens = []
	let ch = ''
	let i = 0

	const nextChar = () => (ch = input[++i])

	while (i < input.length) {
		ch = input[i]
		if (isWhiteSpace(ch)) {
			nextChar()
		} else if (isOperator(ch)) {
			let chars = ch
			if (ch === '*') {
				if (nextChar() === '*') {
					chars += ch
					nextChar()
				}
			} else {
				nextChar()
			}
			tokens.push(createOperator(chars))
		} else if (isDigit(ch)) {
			let chars = ch
			while (isDigit(nextChar())) {
				chars += ch
			}
			tokens.push(createNumber(chars))
		} else {
			throw new Error(`Unrecognized token: ${ch}`)
		}
	}

	return tokens
}
