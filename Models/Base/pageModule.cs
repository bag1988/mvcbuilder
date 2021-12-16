using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class pageModule
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idPageModule { get; set; }

        public int idPage { get; set; }

        public int idModule { get; set; }

        [DataType(DataType.MultilineText)]
        public string htmlOrText { get; set; }

        [StringLength(50)]
        public string urlCss { get; set; }

        public int yindex { get; set; }

        public module module { get; set; }

        public page page { get; set; }
    }
}
