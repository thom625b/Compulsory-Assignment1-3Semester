using Bogus;
using DataAccess.Models;

namespace UnitTest;


public class TestObjects
{
    
    public static Feature GetFeature()
    {
        return new Faker<Feature>()
            .RuleFor(f => f.FeatureName, f => f.Name.JobArea());

    }
    
}