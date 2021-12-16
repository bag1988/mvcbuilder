using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class news
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idNews { get; set; }

        [Column(TypeName = "text")]
        public string nameNews { get; set; }

        public DateTime? dateNews { get; set; }

        [Column(TypeName = "text")]
        public string textNews { get; set; }

        [Column(TypeName = "text")]
        public string shortNext { get; set; }

        [Column(TypeName = "text")]
        public string keyword { get; set; }
    }
}
