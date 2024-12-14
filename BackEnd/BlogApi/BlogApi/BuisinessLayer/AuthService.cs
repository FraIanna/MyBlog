using BlogApi.Context;
using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BlogApi.BuisinessLayer
{
    public class AuthService : IAuthService
    {
        private readonly DataContext dataContext;
        private readonly string issuer;
        private readonly string audience;
        private readonly string key;

        public AuthService(DataContext dataContext, IConfiguration config)
        {
            this.dataContext = dataContext;
            issuer = config["Jwt:Issuer"]!;
            audience = config["Jwt:Audience"]!;
            key = config["Jwt:Key"]!;
        }

        public async Task<User> RegisterAsync(RegisterDto registerDto)
        {
            var existingUser = await dataContext.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists.");
            }

            var hashedPassword = HashPassword(registerDto.Password);

            var user = new User
            {
                Email = registerDto.Email,
                Password = hashedPassword,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
            };

            var userRole = await dataContext.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            
            if (userRole == null) 
            {
                userRole = new Role { Name = "User" };
                dataContext.Add(userRole);
                await dataContext.SaveChangesAsync();
            }

            user.Roles.Add(userRole);
            dataContext.Users.Add(user);
            await dataContext.SaveChangesAsync();

            return user;
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public async Task<LoginResponse> LoginAsync(LoginDto loginDto)
        {
            var user = await dataContext.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync( u => u.Email == loginDto.Email);

            if (user == null || !VerifyPassword(loginDto.Password, user.Password))
            {
                throw new UnauthorizedAccessException("Credentials not valid" );
            }
            
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user!.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user!.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var claim in claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            }

            user.Roles.ForEach(r => claims.Add(new Claim(ClaimTypes.Role, r.Name)));

            var k = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(key));
            var signed = new SigningCredentials(k, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.Now.AddMinutes(60);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expiration,
                signingCredentials: signed
            );
             return new LoginResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Email = user.Email,
                TokenExpiration = expiration,
                UserId = user.Id
            };
        }

        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHashedPassword);
        }

        public async Task<User> GetUserAsync(ClaimsPrincipal userPrincipal)
        {
            var userIdClaim = userPrincipal.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User not authenticated.");
            }

            var userId = int.Parse(userIdClaim.Value);

            var user = await dataContext.Users
                .Include(u => u.Roles)
                //.Include(u=> u.Biography) controllare il problema
                .Include(u => u.Comments)
                .Include(u => u.Likes)
                .Include(u => u.Socials)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            return user;
        }

        public async Task<(bool isAuthenticated, string Mesage)> IsAuthenticatedAsync(ClaimsPrincipal userPrincipal)
        {
            var userIdClaim = userPrincipal.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return (false, "User  not authenticated. No NameIdentifier claim found.");
            }

            return (true, "User  is authenticated.");
        }
    }
}
