using System.ComponentModel.DataAnnotations;

namespace BlogApi.Dto
{
    public class LoginDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        [StringLength(50, MinimumLength = 10)]
        public required string Password { get; set; }
    }
}
