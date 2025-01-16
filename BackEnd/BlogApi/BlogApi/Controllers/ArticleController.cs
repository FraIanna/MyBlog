using BlogApi.BuisinessLayer;
using BlogApi.Context;
using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IArticleService articleService;

        public ArticleController(DataContext _dataContext, IArticleService articleService)
        {
            dataContext = _dataContext;
            this.articleService = articleService;
        }

        [HttpGet]
        public async Task<ActionResult> GetArticles()
        {
            try
            {
                var articles = await articleService.GetAllAsync();
                return Ok(articles);
            }
            catch (Exception ex) {
                return BadRequest($"Error trying to get the articles {ex.Message}");
            }
        }

        [HttpGet("category")]
        public async Task<ActionResult> getCategories()
        {
            try
            {
              var categories = await articleService.GetCategoriesAsync();
                return Ok(categories);
            }
            catch(Exception ex)
            {
                return BadRequest($"Error trying to get the categories {ex.Message}");
            }
        }


        [HttpGet("user/{id}")]
        public async Task<ActionResult> getByUser(int id)
        {
            try
            {
                var articles = await articleService.GetByUser(id);
                return Ok(articles);
            }
            catch(KeyNotFoundException ex)
            {
                return NotFound($"Articles not found: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var article = await articleService.GetByIdAsync(id);
                return Ok(article);
            }

            catch (KeyNotFoundException ex) 
            {
                return NotFound($"Article not found: {ex.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> CreateArticle([FromForm]ArticleDto model)
        {
            try
            {
                var userPrincipal = User;

                var article = await articleService.CreateAsync(model, userPrincipal);
                return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateArticle(int id, Article article)
        {
            try
            {
                var existingArticle = await articleService.GetByIdAsync(id);
                if (existingArticle == null)
                {
                    return NotFound($"Article with Id {id} not found.");
                }

                existingArticle.Title = article.Title;
                existingArticle.Content = article.Content;
                existingArticle.Category = article.Category;
                existingArticle.ImagePath = article.ImagePath;

                await articleService.UpdateAsync(existingArticle);

                return Ok(existingArticle); 
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            try
            {
                await articleService.DeleteAsync(id);
                return Ok($"Article with Id {id} has been deleted.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound($"Article not found: {ex.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        } 
    }
}
