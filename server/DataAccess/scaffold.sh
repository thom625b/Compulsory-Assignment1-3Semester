#!/bin/bash
dotnet ef dbcontext scaffold \
  "Server=localhost;Database=dunderdb;User Id=dunderuser;Password=dunderpass;" \
  Npgsql.EntityFrameworkCore.PostgreSQL \
  --output-dir Models \
  --context-dir . \
  --context MyDbContext  \
  --no-onconfiguring \
  --data-annotations \
  --force