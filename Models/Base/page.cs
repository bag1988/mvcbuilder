using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class page
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idPage { get; set; }

        [Required]
        [Display(Name = "Доступно пользователям")]
        public string roles { get; set; }

        [Required]
        [Display(Name = "Имя страницы")]
        [RegularExpression(@"[а-яА-яA-Za-z\s]{0,20}", ErrorMessage = "Значение {0} должно содержать только буквы и знак пробела")]
        [StringLength(20, ErrorMessage = "Значение {0} должно содержать символов не менее: {2} и не более: {1}", MinimumLength = 3)]
        public string namePage { get; set; }

        [Required]
        [Display(Name = "Адрес страницы EN")]
        [RegularExpression(@"[A-Za-z\s]{0,20}", ErrorMessage = "Значение {0} должно содержать только буквы и знак пробела")]
        [StringLength(20, ErrorMessage = "Значение {0} должно содержать символов не менее: {2} и не более: {1}", MinimumLength = 3)]
        public string urlPage { get; set; }

        [DataType(DataType.MultilineText)]
        [Display(Name = "Ключевые слова страницы")]
        [StringLength(255, ErrorMessage = "Значение {0} должно содержать символов не более 255.")]
        public string keyword { get; set; }

        [DataType(DataType.MultilineText)]
        [Display(Name = "Описание страницы")]
        [StringLength(255, ErrorMessage = "Значение {0} должно содержать символов не более 255.")]
        public string meta { get; set; }
    }
}
