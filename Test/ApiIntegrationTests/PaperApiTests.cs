using System.Net;
using System.Text.Json;
using DataAccess;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using service;
using Xunit.Abstractions;

namespace UnitTest.ApiIntegrationTests;

public class PaperApiTests : WebApplicationFactory<Program>
{
    
        private readonly PgCtxSetup<MyDbContext> _pgCtxSetup = new();
        private readonly ITestOutputHelper _outputHelper;
        private readonly Dictionary<string, string> _testSettings;


        public PaperApiTests(ITestOutputHelper outputHelper)
        {
            _outputHelper = outputHelper;
            Environment.SetEnvironmentVariable($"{nameof(AppOptions)}:{nameof(AppOptions.Dunderdb)}", _pgCtxSetup._postgres.GetConnectionString());
        }


        [Fact]
        public async Task GetAllPapers_Can_Get_All_Papers_And_Status_OK()
        {
            var paper = TestObjects.GetPaper();
            _pgCtxSetup.DbContextInstance.Papers.Add(paper);
            _pgCtxSetup.DbContextInstance.SaveChangesAsync();
        
            var response = await CreateClient().GetAsync("api/Paper");
        
            var returnedPaper = JsonSerializer.Deserialize<List<Paper>>(
                await response.Content.ReadAsStringAsync(),
                new JsonSerializerOptions() {PropertyNameCaseInsensitive = true});
        
            var paperList = new List<Paper>() { paper };
            Assert.Equivalent(paperList, returnedPaper);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
}  