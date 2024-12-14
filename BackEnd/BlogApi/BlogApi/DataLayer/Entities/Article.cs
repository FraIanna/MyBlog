using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApi.DataLayer.Entities
{
    public class Article
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; }

        [Required]
        public required string Content { get; set; }

        [Required]
        public required Category Category{ get; set; }

        public byte[]? Image { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public List<Tag> Tags { get; set; } = [];
        
        public List<Like> Likes { get; set; } = [];

        public List<Comment> Comments { get; set; } = [];

        public required User User { get; set; }

    }
}
