using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

[PrimaryKey("PaperId", "FeatureId")]
[Table("paper_features")]
[Index("FeatureId", Name = "IX_paper_features_feature_id")]
public partial class PaperFeature
{
    [Column("feature_stock")]
    public int? FeatureStock { get; set; }

    [Key]
    [Column("paper_id")]
    public int PaperId { get; set; }

    [Key]
    [Column("feature_id")]
    public int FeatureId { get; set; }

    [ForeignKey("FeatureId")]
    [InverseProperty("PaperFeatures")]
    public virtual Feature Feature { get; set; } = null!;

    [ForeignKey("PaperId")]
    [InverseProperty("PaperFeatures")]
    public virtual Paper Paper { get; set; } = null!;
}
