using BlogApi.DataLayer.Entities;

namespace BlogApi.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public string? Biography { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Like>? Likes { get; set; }
        public List<SocialLink>? Socials { get; set; }
        public List<string> Roles { get; set; } = [];
    }
}
