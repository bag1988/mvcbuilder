using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class module
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idModule { get; set; }

        [Required]
        [Display(Name = "Наименование расширения")]
        [StringLength(50, ErrorMessage = "Значение {0} должно содержать символов не менее: {2} и не более: {1}", MinimumLength = 3)]
        public string nameModule { get; set; }

        [DataType(DataType.Html)]        
        [Display(Name = "HTML код по умолчанию для новых элементов")]
        public string defaultHtml { get; set; }

        [StringLength(50)]
        [Display(Name = "CSS класс по умолчанию для новых элементов")]
        public string defaultCss { get; set; }

        [StringLength(50)]
        [Display(Name = "URL адрес")]
        public string urlModule { get; set; }
    }
}
