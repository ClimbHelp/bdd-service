describe('Basic Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should handle basic math', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('test');
    expect(result).toBe('test');
  });
});
