using System.ComponentModel.DataAnnotations;

namespace BlogApi.Dto
{
    public class biographyRequest
    {
        [Required]
        public required string Biography { get; set; }
    }
}
