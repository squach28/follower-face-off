const mode = import.meta.env.MODE
console.log(mode)
export const baseUrl = mode === 'DEV' ? 'http://localhost:4000/' : ''