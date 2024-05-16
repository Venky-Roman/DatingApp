using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService tokenService;

        public AccountController(DataContext dataContext,ITokenService tokenService)
        {
            this._dataContext = dataContext;
            this.tokenService = tokenService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(Registerdto registerdto)
        {
            if(await IsUserExist(registerdto.Username))
            {
                return BadRequest("User is already exist!");
            }
            using var hmac = new HMACSHA512();

            var users = new AppUser
            {
                UserName = registerdto.Username,
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.Password)),
                passwordSalt = hmac.Key
            };
              _dataContext.AppUsers.Add(users);
            await _dataContext.SaveChangesAsync();
            return new UserDto
            {
                Username = users.UserName,
                Token = tokenService.GetToken(users)
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _dataContext.AppUsers.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);
            if (user == null || user.UserName != loginDto.Username)
            {
                return Unauthorized("User is not valid!");
            }
            using var hmac = new HMACSHA512(user.passwordSalt);
            var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i=0;i<computedhash.Length;i++)
            {
                if (computedhash[i] != user.passwordHash[i]) return Unauthorized("Password does not match invalid password!");
            }
            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.GetToken(user)
            };
        }
        [HttpDelete("deletebyid/{id}")]
        public async Task<ActionResult<UserDto>> DeleteuserbyId(UserDto userDto)
        {
            var userfound = await _dataContext.AppUsers.FirstOrDefaultAsync(x => x.Id == userDto.Id);
            if(userfound == null) { return NotFound(); }

            var response =_dataContext.AppUsers.Remove(userfound);
           await _dataContext.SaveChangesAsync();
            return Ok(response);
        }
        [HttpGet]
        public async Task<bool> IsUserExist(string username)
        {
            return await _dataContext.AppUsers.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
