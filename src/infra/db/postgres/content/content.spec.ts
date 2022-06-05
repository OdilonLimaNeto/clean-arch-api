describe('Content Postgres Repository', () => {
  beforeAll(async () => { })

  afterAll(async () => { })

  it('should return an content on success', async () => {
    const sut = new ContentPostgresRepository()
    const content = await sut.create({})
    expect(content).toBeTruthy()
    expect(content.id).toBeTruthy()
    expect(content.title).toBe('title')
    expect(content.description).toBe('description')
    expect(content.thumbnail).toBe('thumbnail')
    expect(content.published).toBe('published')
    expect(content.sourceDuration).toBe('sourceDuration')
    expect(content.sourceSize).toBe('sourceSize')
  })
})