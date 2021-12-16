using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class userField
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idUserField { get; set; }

        [StringLength(255)]
        public string enNameField { get; set; }

        [StringLength(255)]
        public string nameField { get; set; }

        [StringLength(50)]
        public string typeField { get; set; }

        [Column(TypeName = "text")]
        public string valueField { get; set; }

        [Column(TypeName = "text")]
        public string regexField { get; set; }

        [Column(TypeName = "text")]
        public string messageRegex { get; set; }

        [StringLength(50)]
        public string enabledField { get; set; }
    }
}
