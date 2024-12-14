
using BlogApi.Context;
using BlogApi.DataLayer.Entities;
using BlogApi.Dto;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.BuisinessLayer
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;

        public UserService (DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task DeleteBiography(int userId)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            if (user == null) 
            {
                throw new KeyNotFoundException("User not found.");
            };
            
            user.Biography = null;

            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteSocials(int userId)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            _dataContext.Socials.RemoveRange(user.Socials);

            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteSocial(int userId, int socialId)
        {
            var user = await _dataContext.Users
                .Include(u => u.Socials)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var social = user.Socials.FirstOrDefault(s => s.Id == socialId);

            if (social == null)
            {
                throw new KeyNotFoundException("Social not found");
            }

            user.Socials.Remove(social);

            _dataContext.Socials.Remove(social);

            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateBiography(int userId, string biography)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) 
            {
                throw new KeyNotFoundException("User not found");
            }

            user.Biography = biography;

            _dataContext.Update(user);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateImage(int userId, byte[] newImage)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            user.Image = newImage;

            _dataContext.Update(user);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateSocial(int userId, SocialLinkDto newSocial)
        {
            var user = await _dataContext.Users
                .Include(u => u.Socials)
                .FirstOrDefaultAsync(u => u.Id == userId);
            
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var existingSocial = user.Socials.FirstOrDefault(s => s.Platform == newSocial.Platform);

            if (existingSocial != null)
            {
                existingSocial.Url = newSocial.Url;
            }
            else
            {
                var social = new SocialLink
                {
                    Platform = newSocial.Platform,
                    Url = newSocial.Url
                };
                user.Socials.Add(social);
            }

            _dataContext.Update(user);
            await _dataContext.SaveChangesAsync();
        }
    }
}
