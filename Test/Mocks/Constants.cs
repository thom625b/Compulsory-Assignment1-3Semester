using Bogus;
using DataAccess.Models;
using Namotion.Reflection;

namespace UnitTest.Mocks;

public class Constants
{
    
    public static Paper GetPaper()
    {
        return new Faker<Paper>()
            .RuleFor(p => p.Id, f => f.IndexFaker + 1)
            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
            .RuleFor(p => p.Discontinued, f => f.Random.Bool())
            .RuleFor(p => p.Stock, f => f.Random.Int(0, 1000))
            .RuleFor(p => p.Price, f => double.Parse(f.Commerce.Price(1.0M, 1000.0M)))
            .RuleFor(p => p.OrderEntries, f => new List<OrderEntry>())
            .RuleFor(p => p.Features, f => new List<Feature>());
    }

    public static Feature GetFeature()
    {
        return new Faker<Feature>()
            .RuleFor(f => f.Id, f => f.IndexFaker + 1)
            .RuleFor(f => f.FeatureName, f => f.Commerce.ProductName());
    }
}