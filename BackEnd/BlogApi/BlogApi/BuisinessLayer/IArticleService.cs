using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using System.Security.Claims;

namespace BlogApi.BuisinessLayer
{
    public interface IArticleService
    {
        Task<List<Article>> GetAllAsync();
        Task<Article> GetByIdAsync(int id);
        Task<List<Article>> GetByUser(int userId);
        Task<Article> CreateAsync(ArticleDto dto, ClaimsPrincipal userPrincipal);
        Task UpdateAsync(Article article);
        Task DeleteAsync(int Id);
        Task<List<Category>> GetCategoriesAsync();
    }
}
