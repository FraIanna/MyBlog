using BlogApi.BuisinessLayer;
using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        
        [HttpPut("socials/{id}")]
        public async Task<ActionResult> UpdateSocial(int id, [FromBody]SocialLinkDto social) 
        {
            if (social == null)
            {
                return BadRequest("The social field cannot be null or empty.");
            }

            try
            {
                await _userService.UpdateSocial(id, social);
                return Ok(social);
            }

            catch (KeyNotFoundException ex) 
            {
                return NotFound(new { Message = "User not found.", Details = ex.Message });
            }

            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating social links.", Details = ex.Message });
            }
        }

        [HttpDelete("socials/{userId}/{socialId}")]
        public async Task<ActionResult> DeleteSocial(int userId, int socialId)
        {
            try
            {
                await _userService.DeleteSocial(userId, socialId);
                return Ok(new { Message = "Social deleted successfully." });
            }

            catch(KeyNotFoundException ex) 
            {
                return NotFound(new { Message = "User or social not found.", Details = ex.Message });
            }

            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating social links.", Details = ex.Message });
            }
        }

        [HttpDelete("socials")]
        public async Task<ActionResult> DeleteSocials(int userId)
        {
            try
            {
                await _userService.DeleteSocials(userId);
                return Ok(new { Message = "All socials deleted" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = "User not found.", Details = ex.Message });
            }

            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating social links.", Details = ex.Message });
            }
        }

        [HttpPut("socials/biography/{userId}")]
        public async Task<ActionResult> UpdateBiography(int userId, [FromBody] biographyRequest req)
        {
            if (string.IsNullOrEmpty(req.Biography))
            {
                return BadRequest(new { Message = "Biography cannot be empty." });
            }

            try
            {
                await _userService.UpdateBiography(userId, req.Biography);
                return Ok(req);
            }
            catch(KeyNotFoundException ex)
            {
                return NotFound(new { Message = "User not found.", Details = ex.Message });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating user biography.", Details = ex.Message });
            }
        }
    }
}
