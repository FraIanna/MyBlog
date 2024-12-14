using BlogApi.Context;
using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BlogApi.BuisinessLayer
{
    public class ArticleService : IArticleService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger _logger;

        public ArticleService(DataContext dataContext, ILogger<ArticleService> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }
    
        //metodo per la creazione di un articolo
        public async Task<Article> CreateAsync(ArticleDto dto, ClaimsPrincipal userPrincipal)
        {
            //var claims = userPrincipal.Claims.Select(c => $"{c.Type}: {c.Value}");
            //Console.WriteLine("Claims in CreateAsync: " + string.Join(", ", claims));

            var userIdString = userPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdString == null)
            {
                throw new Exception("Unable to find the claimType.NameIdentifire key");
            }

            var userId = int.Parse(userIdString);

            if (userId <= 0)
            {
                throw new KeyNotFoundException("UserId not found");
            }

            var user = await _dataContext.Users.FindAsync(userId);

            if (user == null) 
            {
                throw new KeyNotFoundException("User not found");
            }

            var category = await _dataContext.Categories.FindAsync(dto.CategoryId);

            if (category == null)
            {
                throw new KeyNotFoundException("Category not found");
            }

            var article = new Article
            {
                Title = dto.Title,
                Content = dto.Content,
                Category = category,
                User = user
            };

            _dataContext.Add(article);
            await _dataContext.SaveChangesAsync();

            return article;
        }


        //metodo per l'eliminazione di un articolo
        public async Task DeleteAsync(int id)
        {
            var article = await _dataContext.Articles.FindAsync(id);
            if (article != null)
            {
                _dataContext.Remove(article);
                await _dataContext.SaveChangesAsync();
            } 
            else
            {
                throw new KeyNotFoundException($"article with Id {id} not found.");
            }
        }

        // recupero di tutti gli articoli
        public async Task<List<Article>> GetAllAsync()
        {
            return await _dataContext.Articles
                .Include(a => a.User)
                .ToListAsync();
        }


        //recupero di un solo articolo
        public async Task<Article> GetByIdAsync(int id)
        {
            var article = await _dataContext.Articles.FindAsync(id);
            if (article != null)
            {
                return article;
            }
            else
            {
                throw new KeyNotFoundException($"article with Id {id} not found.");
            }
        }

        //recupero di tutti gli articoli in base all'utente
        public async Task<List<Article>> GetByUser(int userId)
        {
            var user = await _dataContext.Users.FindAsync(userId);

            if(user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            return await _dataContext.Articles
                .Where(a => a.User.Id == user.Id)
                .ToListAsync();
        }

        //update di un articolo - in corso -
        public async Task UpdateAsync(Article article)
        {
            _dataContext.Update(article);
            await _dataContext.SaveChangesAsync();
        }

        // recupero categorie
        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _dataContext.Categories.ToListAsync();
        }
    }
}
