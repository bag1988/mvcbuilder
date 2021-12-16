using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class site
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idSite { get; set; }

        [StringLength(50)]
        public string nameSite { get; set; }

        [StringLength(50)]
        public string contactPersone { get; set; }

        [Column(TypeName = "text")]
        public string description { get; set; }

        [Column(TypeName = "text")]
        public string adres { get; set; }

        [StringLength(50)]
        public string urlSite { get; set; }

        [StringLength(50)]
        public string phone1 { get; set; }

        [StringLength(50)]
        public string phone2 { get; set; }

        [StringLength(50)]
        public string fax { get; set; }

        [StringLength(50)]
        public string email { get; set; }

        [StringLength(50)]
        public string skype { get; set; }
    }
}
