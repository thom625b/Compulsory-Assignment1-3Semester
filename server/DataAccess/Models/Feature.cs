using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

[Table("feature")]
public partial class Feature
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("feature_name")]
    [StringLength(255)]
    public string FeatureName { get; set; } = null!;

    [InverseProperty("Feature")]
    public virtual ICollection<PaperFeature> PaperFeatures { get; set; } = new List<PaperFeature>();
}
