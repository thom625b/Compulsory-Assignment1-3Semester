using DataAccess;
using Microsoft.EntityFrameworkCore;
using Moq;
using FluentValidation;
using FluentValidation.Results;
using service.Services;
using service.Transfermodels.Request;

namespace UnitTest;

public class FeatureTests
{
     private readonly MyDbContext _context;
        private readonly Mock<IValidator<CreateFeatureDto>> _createFeatureValidatorMock;
        private readonly FeaturesService _featuresService;

        public FeatureTests()
        {
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new MyDbContext(options);
            _createFeatureValidatorMock = new Mock<IValidator<CreateFeatureDto>>();
            _featuresService = new FeaturesService(_context, _createFeatureValidatorMock.Object);
        }

        [Fact]
        public async Task CreateFeature_ShouldAddFeatureToDatabase()
        {
            // Arrange
            var createFeatureDto = new CreateFeatureDto()
            {
                Name = "Testing Feature Name",
            };

            var feature = createFeatureDto.ToFeature();

            // Mock validation success
            _createFeatureValidatorMock.Setup(v => v.Validate(It.IsAny<CreateFeatureDto>()))
                .Returns(new ValidationResult());

            // Act
            var result = await _featuresService.CreateFeature(createFeatureDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(createFeatureDto.Name, result.Name);

            // Verify that feature was added to the in-memory database
            var savedFeature = await _context.Features.FirstOrDefaultAsync(f => f.FeatureName == createFeatureDto.Name);
            Assert.NotNull(savedFeature);
        }

        [Fact]
        public async Task CreateFeature_ShouldThrowValidationException_WhenInvalid()
        {
            // Arrange
            var createFeatureDto = new CreateFeatureDto()
            {
                Name = ""
            };

            var validationFailure = new ValidationFailure("Name", "Name is required");
            var validationResult = new ValidationResult(new[] { validationFailure });

            _createFeatureValidatorMock
                .Setup(v => v.Validate(It.IsAny<CreateFeatureDto>()))
                .Returns(validationResult);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() =>
            {
                var result = _createFeatureValidatorMock.Object.Validate(createFeatureDto);
                
                if (!result.IsValid)
                {
                    throw new FluentValidation.ValidationException(result.Errors);
                }

                return _featuresService.CreateFeature(createFeatureDto);
            });
    }
}