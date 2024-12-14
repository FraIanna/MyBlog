using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApi.DataLayer.Entities
{
    public class SocialLink
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id{ get; set; }

        [Required]
        public required string Platform { get; set; }

        [Required]
        public required string Url { get; set; }
    }
}
