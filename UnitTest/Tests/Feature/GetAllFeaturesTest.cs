/*using System.Text.Json;
using DataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using PgCtx;
using Xunit.Abstractions;

namespace UnitTest.Tests.Feature;

public class GetAllFeaturesTest : WebApplicationFactory<Program>

{
    private readonly PgCtxSetup<MyDbContext> _pgCtxSetup = new();
    private readonly ITestOutputHelper _outputHelper;
    private readonly Dictionary<string, string> _testSetting;

    public GetAllFeaturesTest(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        Environment.SetEnvironmentVariable($"{nameof(AppOptions)}:{nameof(AppOptions.DbConnectionString)}",
            _pgCtxSetup._postgres.GetConnectionString());
    }

    [Fact]
    public async Task GetAllFeatures_And_Status_OK()
    {
        var feature = TestObjects.GetDoctor();
        _pgCtxSetup.DbContextInstance.Doctors.Add(doctor);
        _pgCtxSetup.DbContextInstance.SaveChanges();

        var response = await CreateClient().GetAsync("/api/Doctor").Result.Content.ReadAsStringAsync();
        var returnedDoctor = JsonSerializer.Deserialize<List<Doctor>>(response,
            new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });

        var doctorList = new List<Doctor>() { doctor };
        Assert.Equivalent(doctorList, returnedDoctor);
    }
}
 */