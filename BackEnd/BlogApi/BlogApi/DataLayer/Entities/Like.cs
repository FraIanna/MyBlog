using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogApi.DataLayer.Entities
{
    public class Like
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public required User User { get; set; }

        public Article? Article { get; set; }

        public Comment? Comment { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;
    }
}