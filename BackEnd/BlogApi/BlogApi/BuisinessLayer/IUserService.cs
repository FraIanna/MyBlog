using BlogApi.DataLayer.Entities;
using BlogApi.Dto;

namespace BlogApi.BuisinessLayer
{
    public interface IUserService
    {
        Task UpdateBiography(int userId, string biography);

        Task UpdateSocial(int userId, SocialLinkDto newSocial);

        Task DeleteBiography(int userId);

        Task DeleteSocials(int id);

        Task DeleteSocial(int userId, int socialId);

        Task UpdateImage(int userId, byte[] newImage);
    }
}
