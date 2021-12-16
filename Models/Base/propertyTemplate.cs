using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class propertyTemplate
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idProperty { get; set; }

        public int? idTemplates { get; set; }

        public int? idModule { get; set; }

        [StringLength(50)]
        public string positionTemplates { get; set; }

        [Column(TypeName = "text")]
        public string htmlTemplates { get; set; }

        [Column(TypeName = "text")]
        public string cssTemplates { get; set; }

        public int? yIndex { get; set; }

        public int? marker { get; set; }
    }
}
