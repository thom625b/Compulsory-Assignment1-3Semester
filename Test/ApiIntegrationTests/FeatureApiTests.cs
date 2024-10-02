using DataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using Xunit.Abstractions;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using DataAccess.Models;
using service;

namespace UnitTest.ApiIntegrationTests;

public class FeatureApiTests : WebApplicationFactory<Program>
{
    private readonly PgCtxSetup<MyDbContext> _pgCtxSetup = new();
    private readonly ITestOutputHelper _outputHelper;
    private readonly Dictionary<string, string> _testSettings;


    public FeatureApiTests(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        Environment.SetEnvironmentVariable($"{nameof(AppOptions)}:{nameof(AppOptions.Dunderdb)}", _pgCtxSetup._postgres.GetConnectionString());
    }


    [Fact]
    public async Task GetAllFeatures_Can_Get_All_Features_And_Status_OK()
    {
        var feature = TestObjects.GetFeature();
        _pgCtxSetup.DbContextInstance.Features.Add(feature);
        _pgCtxSetup.DbContextInstance.SaveChangesAsync();
        
        var response = await CreateClient().GetAsync("api/Feature");
        
        var returnedFeature = JsonSerializer.Deserialize<List<Feature>>(
            await response.Content.ReadAsStringAsync(),
            new JsonSerializerOptions() {PropertyNameCaseInsensitive = true});
        
        var featureList = new List<Feature>() { feature };
        Assert.Equivalent(featureList, returnedFeature);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

}

