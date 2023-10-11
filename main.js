const { schema } = require('./schema')

function generateRandomValue(schema) {
  if (schema.type === "integer") {
    const minValue = schema.minimum || 0
    const maxValue = schema.maximum || 100
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
  } else if (schema.type === "string") {
    if (schema.format === "regex" && schema.pattern) {
      const regex = new RegExp(schema.pattern)
      return "GeneratedString".replace(/./g, (c) => {
        if (c === 'G') return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        if (c === 's') return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        if (c === 'd') return Math.floor(Math.random() * 10)
        return c
      })
    } else {
      return "RandomString" + Math.random().toString(36).substring(7)
    }
  } else if (schema.type === "boolean") {
    return Math.random() < 0.5
  } else if (schema.type === "array") {
    if (schema.items) {
      const result = []
      const itemCount = schema.minItems || 1
      for (let i = 0; i < itemCount; i++) {
        result.push(generateRandomValue(schema.items))
      }
      return result
    } else {
      return []
    }
  } else if (schema.type === "object") {
    if (schema.properties) {
      const result = {}
      for (const prop in schema.properties) {
        const propSchema = schema.properties[prop]
        result[prop] = generateRandomValue(propSchema)
      }
      return result
    } else {
      return {}
    }
  } else {
    return null
  }
}

function generateRandomObject(schema) {
  const { properties } = schema
  const result = {}
  for (const prop in properties) {
    const propSchema = properties[prop]
    result[prop] = generateRandomValue(propSchema)
  }
  return result
}

const randomObject = generateRandomObject(schema)
console.log(randomObject)

module.exports = { schema, generateRandomObject, generateRandomValue }