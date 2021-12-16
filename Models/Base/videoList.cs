using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{           
    public partial class videoList
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idVideoList { get; set; }

        public int? idVideo { get; set; }

        public string urlVideo { get; set; }

        [StringLength(10)]
        public string textVideo { get; set; }
    }
}
