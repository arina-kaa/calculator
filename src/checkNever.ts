export const checkNever = (value: never) => {
	throw new Error(`Unexpected value: ${JSON.stringify(value)}`)
}
