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

    public static Paper GetPaper()
    {
        return new Faker<Paper>()
            .RuleFor(p => p.Name, p => p.Name.JobDescriptor());
    }
    
}