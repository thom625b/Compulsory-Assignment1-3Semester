using System;
using System.Collections.Generic;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Feature> Features { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderEntry> OrderEntries { get; set; }

    public virtual DbSet<Paper> Papers { get; set; }

    public virtual DbSet<PaperFeature> PaperFeatures { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("customers_pkey");
        });

        modelBuilder.Entity<Feature>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("features_pkey");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orders_pkey");

            entity.Property(e => e.OrderDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.Status).HasDefaultValue(0);

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("orders_customer_id_fkey");
        });

        modelBuilder.Entity<OrderEntry>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("order_entries_pkey");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderEntries).HasConstraintName("order_entries_order_id_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderEntries).HasConstraintName("order_entries_product_id_fkey");
        });

        modelBuilder.Entity<Paper>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("paper_pkey");

            entity.Property(e => e.Discontinued).HasDefaultValue(false);
            entity.Property(e => e.Stock).HasDefaultValue(0);
        });

        modelBuilder.Entity<PaperFeature>(entity =>
        {
            entity.HasKey(e => new { e.PaperId, e.FeatureId }).HasName("paper_features_pkey");

            entity.HasOne(d => d.Feature).WithMany(p => p.PaperFeatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("paper_features_feature_id_fkey");

            entity.HasOne(d => d.Paper).WithMany(p => p.PaperFeatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("paper_features_paper_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
