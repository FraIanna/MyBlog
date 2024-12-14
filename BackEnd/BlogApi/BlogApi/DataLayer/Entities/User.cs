using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApi.DataLayer.Entities
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Surname { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }

        public string? Biography { get; set; }

        public byte[]? Image { get; set; }

        public List<SocialLink> Socials { get; set; } = new List<SocialLink>();

        public List<Role> Roles { get; set; } = new List<Role>();

        public List<Like> Likes { get; set; } = [];

        public List<Comment> Comments { get; set; } = [];
    }
}
