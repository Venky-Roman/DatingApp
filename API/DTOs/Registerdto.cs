using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class Registerdto
    {
        [Required(ErrorMessage ="User name is required please enter an valid User Name!")]
        public string Username { get; set; }
        [Required(ErrorMessage ="Password is required please enter the password")]
        public string Password { get; set; }
    }
}
