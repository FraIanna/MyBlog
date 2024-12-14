namespace BlogApi.Dto
{
    public class LoginResponse
    {
        public int UserId { get; set; }

        public required string Email { get; set; }

        public required string Token { get; set; }

        public DateTime TokenExpiration { get; set; }
    }
}
