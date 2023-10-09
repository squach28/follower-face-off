const mode = import.meta.env.MODE

export const baseUrl = mode === 'DEV' ? 'http://localhost:4000/' : 