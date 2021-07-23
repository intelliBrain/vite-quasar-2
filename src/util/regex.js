export const passwordRegex = (val) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{12,}$/.test(val)
}
export const phoneRegex = (val) => {
  return /^[1]([3-9])[0-9]{9}$/.test(val)
}
export const emailRegex = (val) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)
}
