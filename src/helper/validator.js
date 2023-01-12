const telephoneValidator = (value) => /^1[3457]\d{9}$/.test(value)

export default {
  telephoneValidator,
}
