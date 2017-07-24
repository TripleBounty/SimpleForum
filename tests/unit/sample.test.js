const { expect } = require('chai');

it('should return 55', () => {
    // Arrange
    const x = 53;
    const y = 2;

    // Act
    const expected = x + y;

    // Assert
    expect(expected).to.eq(55);
});
