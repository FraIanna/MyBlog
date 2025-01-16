using BlogApi.DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Dto
{
    public class ArticleDto
    {
        public required string Title { get; set; }

        public required string Content { get; set; }

        public int CategoryId { get; set; }

        [FromForm]
        public IFormFile? ImageFile { get; set; }
    }
}
