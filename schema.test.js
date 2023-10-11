const { generateRandomObject, generateRandomValue } = require('./main')

describe('generateRandomValue', () => {
  it('should generate a random integer within the given range', () => {
    const schema = { type: 'integer', minimum: 10, maximum: 20 }
    const result = generateRandomValue(schema)
    expect(result).toBeGreaterThanOrEqual(10)
    expect(result).toBeLessThanOrEqual(20)
  })

  it('should generate a random string', () => {
    const schema = { type: 'string' }
    const result = generateRandomValue(schema)
    expect(typeof result).toBe('string')
  })
})

describe('generateRandomObject', () => {
  it('should generate a random object based on the schema', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer', minimum: 0, maximum: 100 },
      },
    }
    const result = generateRandomObject(schema)
    expect(result).toHaveProperty('name')
    expect(typeof result.name).toBe('string')
    expect(result).toHaveProperty('age')
    expect(typeof result.age).toBe('number')
    expect(result.age).toBeGreaterThanOrEqual(0)
    expect(result.age).toBeLessThanOrEqual(100)
  })
  
})
