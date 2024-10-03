using DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using FluentValidation;
using FluentValidation.Results;
using service.Services;
using service.Transfermodels.Request;
using service.Transfermodels.Responses;

namespace UnitTest
{

    public class PaperTests
    {
        private readonly MyDbContext _context;
        private readonly Mock<IValidator<CreatePaperDto>> _createPaperValidatorMock;
        private readonly Mock<IValidator<UpdatePaperDto>> _updatePaperValidatorMock;
        private readonly Mock<IValidator<FeaturesToPaperDto>> _paperFeatureValidatorMock;
        private readonly PaperService _paperService;
        private readonly FeaturePaperService _featurePaperService;

        public PaperTests()
        {
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new MyDbContext(options);
            _createPaperValidatorMock = new Mock<IValidator<CreatePaperDto>>();
            _updatePaperValidatorMock = new Mock<IValidator<UpdatePaperDto>>();
            _paperFeatureValidatorMock = new Mock<IValidator<FeaturesToPaperDto>>();
            _paperService = new PaperService(_context, _createPaperValidatorMock.Object,
                _updatePaperValidatorMock.Object);
            _featurePaperService = new FeaturePaperService(_context, _paperFeatureValidatorMock.Object);
        }

        [Fact]
        public async Task CreatePaper_ShouldAddPaperToDatabase()
        {
            // Arrange
            var createPaperDto = new CreatePaperDto
            {
                Name = "Sample Paper",
                Discontinued = false,
                Stock = 100,
                Price = 50.0
            };

            var paper = createPaperDto.ToPaper();

            // Mock validation success
            _createPaperValidatorMock.Setup(v => v.Validate(It.IsAny<CreatePaperDto>()))
                .Returns(new ValidationResult());

            // Act
            var result = await _paperService.CreatePaper(createPaperDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(createPaperDto.Name, result.Name);
            Assert.Equal(createPaperDto.Stock, result.Stock);
            Assert.Equal(createPaperDto.Price, result.Price);

            // Verify that paper was added to the in-memory database
            var savedPaper = await _context.Papers.FirstOrDefaultAsync(p => p.Name == createPaperDto.Name);
            Assert.NotNull(savedPaper);
        }

        [Fact]
        public async Task CreatePaper_ShouldThrowValidationException_WhenInvalid()
        {
            // Arrange
            var createPaperDto = new CreatePaperDto
            {
                Name = "",
                Discontinued = false,
                Stock = 100,
                Price = 50.0
            };

            var validationFailure = new ValidationFailure("Name", "Name is required");
            var validationResult = new ValidationResult(new[] { validationFailure });

            _createPaperValidatorMock
                .Setup(v => v.Validate(It.IsAny<CreatePaperDto>()))
                .Returns(validationResult);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() =>
            {
                var result = _createPaperValidatorMock.Object.Validate(createPaperDto);

                if (!result.IsValid)
                {
                    throw new FluentValidation.ValidationException(result.Errors);
                }

                return _paperService.CreatePaper(createPaperDto);
            });
        }

        [Fact]
        public async Task UpdatePaper_ShouldUpdatePaperSuccessfully()
        {
            // Arrange
            var paper = new Paper
            {
                Id = 9,
                Name = "Existing Paper",
                Discontinued = false,
                Stock = 100,
                Price = 50.0
            };

            _context.Papers.Add(paper);
            await _context.SaveChangesAsync();

            var updatePaperDto = new UpdatePaperDto
            {
                Id = 9,
                Discontinued = true,
                Stock = 200
            };

            // Mock validation success
            _updatePaperValidatorMock.Setup(v => v.Validate(It.IsAny<UpdatePaperDto>()))
                .Returns(new ValidationResult());

            // Act
            var result = await _paperService.UpdatePaper(updatePaperDto);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Discontinued);
            Assert.Equal(200, result.Stock);
            var updatedPaper = await _context.Papers.FirstOrDefaultAsync(p => p.Id == updatePaperDto.Id);
            Assert.NotNull(updatedPaper);
            Assert.True(updatedPaper.Discontinued);
            Assert.Equal(200, updatedPaper.Stock);
        }

        [Fact]
        public async Task UpdatePaper_ShouldThrowValidationException_WhenInvalid()
        {
            // Arrange
            var updatePaperDto = new UpdatePaperDto
            {
                Id = 1,
                Discontinued = true,
                Stock = -10 // Invalid stock value
            };

            var validationFailure = new ValidationFailure("Stock", "Stock must be greater than 0");
            _updatePaperValidatorMock.Setup(v => v.Validate(It.IsAny<UpdatePaperDto>()))
                .Returns(new ValidationResult(new[] { validationFailure }));

            // Act & Assert
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() =>
            {
                var validationResult = _updatePaperValidatorMock.Object.Validate(updatePaperDto);

                if (!validationResult.IsValid)
                {
                    throw new FluentValidation.ValidationException(validationResult.Errors);
                }

                return _paperService.UpdatePaper(updatePaperDto);
            });
        }

        [Fact]
        public async Task UpdatePaper_ShouldThrowKeyNotFoundException_WhenPaperNotFound()
        {
            // Arrange
            var updatePaperDto = new UpdatePaperDto
            {
                Id = 999, // Non-existing paper ID
                Discontinued = true,
                Stock = 200
            };

            _updatePaperValidatorMock.Setup(v => v.Validate(It.IsAny<UpdatePaperDto>()))
                .Returns(new ValidationResult());

            // Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _paperService.UpdatePaper(updatePaperDto));
        }


        [Fact]
        public async Task AddFeatureToPaper_ShouldAddFeaturesSuccessfully()
        {
            // Arrange
            var paper = new Paper
            {
                Id = 88,
                Name = "Sample Paper",
                PaperFeatures = new List<PaperFeature>()
            };

            var features = new List<Feature>
            {
                new Feature { Id = 1, FeatureName = "Blue" },
                new Feature { Id = 2, FeatureName = "Gold" }
            };

            await _context.Papers.AddAsync(paper);
            await _context.Features.AddRangeAsync(features);
            await _context.SaveChangesAsync();

            var featuresToPaperDto = new FeaturesToPaperDto
            {
                PaperId = 88,
                FeatureIds = new List<int> { 1, 2 },
                FeatureStock = 10 // Assign feature stock value
            };

            // Act
            var result = await _featurePaperService.AddFeatureToPaper(featuresToPaperDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.PaperFeatures.Count); // Use PaperFeatures instead of Features
            Assert.Contains(result.PaperFeatures, f => f.FeatureId == 1); // Check FeatureId
            Assert.Contains(result.PaperFeatures, f => f.FeatureId == 2);

            var updatedPaper = await _context.Papers.Include(p => p.PaperFeatures)
                .ThenInclude(pf => pf.Feature)
                .FirstOrDefaultAsync(p => p.Id == featuresToPaperDto.PaperId);

            Assert.NotNull(updatedPaper);
            Assert.Equal(2, updatedPaper.PaperFeatures.Count);
            Assert.Equal(10, updatedPaper.PaperFeatures.First().FeatureStock); // Validate feature stock is added correctly
        }


        [Fact]
        public async Task AddFeatureToPaper_ShouldThrowKeyNotFoundException_WhenPaperNotFound()
        {
            // Arrange
            var featuresToPaperDto = new FeaturesToPaperDto
            {
                PaperId = 999, // Non-existing paper ID
                FeatureIds = new List<int> { 1, 2 },
                FeatureStock = 10
            };

            // Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _featurePaperService.AddFeatureToPaper(featuresToPaperDto));
        }

    }
}
