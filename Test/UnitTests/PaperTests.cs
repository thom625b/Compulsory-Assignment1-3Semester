using DataAccess;
using Microsoft.EntityFrameworkCore;
using Moq;
using FluentValidation;
using DataAccess.Models;
using FluentValidation.Results;
using service.Services;
using service.Transfermodels.Request;

namespace UnitTest
{
    
    public class PaperTests
    {
        private readonly MyDbContext _context;
        private readonly Mock<IValidator<CreatePaperDto>> _createPaperValidatorMock;
        private readonly Mock<IValidator<UpdatePaperDto>> _updatePaperValidatorMock;
        private readonly PaperService _paperService;

        public PaperTests()
        {
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new MyDbContext(options);
            _createPaperValidatorMock = new Mock<IValidator<CreatePaperDto>>();
            _updatePaperValidatorMock = new Mock<IValidator<UpdatePaperDto>>();
            _paperService = new PaperService(_context, _createPaperValidatorMock.Object, _updatePaperValidatorMock.Object);
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
                Features = new List<Feature>()
            };

            var features = new List<Feature>
            {
                new Feature { Id = 1, FeatureName = "Blue" },
                new Feature { Id = 2, FeatureName = "Gold" }
            };

            _context.Papers.Add(paper);
            _context.Features.AddRange(features);
            await _context.SaveChangesAsync();

            var featuresToPaperDto = new FeaturesToPaperDto
            {
                PaperId = 88,
                FeatureIds = new List<int> { 1, 2 }
            };

            // Act
            var result = await _paperService.AddFeatureToPaper(featuresToPaperDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Features.Count);
            Assert.Contains(result.Features, f => f.Id == 1);
            Assert.Contains(result.Features, f => f.Id == 2);

            var updatedPaper = await _context.Papers.Include(p => p.Features)
                .FirstOrDefaultAsync(p => p.Id == featuresToPaperDto.PaperId);
            Assert.NotNull(updatedPaper);
            Assert.Equal(2, updatedPaper.Features.Count);
        }

        [Fact]
        public async Task AddFeatureToPaper_ShouldThrowKeyNotFoundException_WhenPaperNotFound()
        {
            // Arrange
            var featuresToPaperDto = new FeaturesToPaperDto
            {
                PaperId = 999, // Non-existing paper ID
                FeatureIds = new List<int> { 1, 2 }
            };

            // Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _paperService.AddFeatureToPaper(featuresToPaperDto));

            var papers = await _context.Papers.Include(p => p.Features).ToListAsync();
            Assert.Empty(papers.SelectMany(p => p.Features));
        }

        [Fact]
        public async Task AddFeatureToPaper_ShouldThrowKeyNotFoundException_WhenSomeFeaturesNotFound()
        {
            // Arrange
            var paper = new Paper
            {
                Id = 1,
                Name = "Sample Paper",
                Features = new List<Feature>()
            };

            var features = new List<Feature>
            {
                new Feature { Id = 1, FeatureName = "a5" }
            };

            _context.Papers.Add(paper);
            _context.Features.AddRange(features);
            await _context.SaveChangesAsync();

            var featuresToPaperDto = new FeaturesToPaperDto
            {
                PaperId = 1,
                FeatureIds = new List<int> { 1, 2 }
            };

            // Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _paperService.AddFeatureToPaper(featuresToPaperDto));

            var updatedPaper = await _context.Papers.Include(p => p.Features)
                .FirstOrDefaultAsync(p => p.Id == featuresToPaperDto.PaperId);
            Assert.NotNull(updatedPaper);
            Assert.Empty(updatedPaper.Features);
        }
    }
}
