using BlogApi.DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Context   
{
    public class DataContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<Article> Articles { get; set; }

        public virtual DbSet<Comment> Comments { get; set; }

        public virtual DbSet<Like> Likes { get; set; }

        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<SocialLink> Socials { get; set; }

        public DataContext(DbContextOptions<DataContext> opt) : base(opt) { }
    }
}
