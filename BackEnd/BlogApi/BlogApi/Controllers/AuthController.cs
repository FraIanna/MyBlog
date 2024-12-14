using BlogApi.BuisinessLayer;
using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BlogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto model)
        {
            try
            {
                var registeredUser = await _authService.RegisterAsync(model);

                return Ok(new
                {
                    registeredUser.Email,
                    UserId = registeredUser.Id,
                    Message = "User registered successfully"
                });
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.InnerException?.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                var user = await _authService.LoginAsync(model);

                return Ok(new
                {
                    email = user.Email,
                    userId = user.UserId,
                    token = user.Token
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to login {ex.Message}");
            }
        }

        [HttpGet]
        public async Task< ActionResult> GetUser()
        {
            try
            {
                var user = await _authService.GetUserAsync(User);
                var userDto = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Surname = user.Surname,
                    Roles = user.Roles.Select(r => r.Name).ToList(),
                    Comments = user.Comments.ToList(),
                    Likes = user.Likes.ToList(),
                    Socials = user.Socials.ToList(),
                    Biography = user.Biography
                };
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
