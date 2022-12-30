export const checkNever = (
	value: never,
	message = `Unexpected value: ${JSON.stringify(value, null, ' ')}`,
) => {
	throw new Error(message)
}
