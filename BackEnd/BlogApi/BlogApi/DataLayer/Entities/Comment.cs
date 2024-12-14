using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApi.DataLayer.Entities
{
    public class Comment
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required User Author { get; set; }

        [Required]
        public required string Content { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        List<Like> Likes { get; set; } = [];
    }
}