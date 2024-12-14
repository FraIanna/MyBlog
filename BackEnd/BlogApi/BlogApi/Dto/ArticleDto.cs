using BlogApi.DataLayer.Entities;

namespace BlogApi.Dto
{
    public class ArticleDto
    {
        public required string Title { get; set; }

        public required string Content { get; set; }

        public int CategoryId { get; set; } 
    }
}
