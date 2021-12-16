using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class video
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idVideo { get; set; }

        public string nameVideo { get; set; }

        [Column(TypeName = "text")]
        public string textVideo { get; set; }
    }
}
