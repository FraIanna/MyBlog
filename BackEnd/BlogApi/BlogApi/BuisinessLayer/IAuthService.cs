using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using System.Security.Claims;

namespace BlogApi.BuisinessLayer
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(RegisterDto registerDto);
        Task<LoginResponse> LoginAsync(LoginDto loginDto);
        Task<User> GetUserAsync(ClaimsPrincipal userPrincipal);
        Task<(bool isAuthenticated, string Mesage)> IsAuthenticatedAsync(ClaimsPrincipal userPrincipal);
    }
}
