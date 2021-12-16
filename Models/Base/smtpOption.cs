using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class smtpOption
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idSmtp { get; set; }

        [StringLength(50)]
        public string smtpServer { get; set; }

        [StringLength(50)]
        public string smtpPort { get; set; }

        [StringLength(50)]
        public string smtpUser { get; set; }

        [StringLength(50)]
        public string smtpPassword { get; set; }

        [StringLength(50)]
        public string smtpEmail { get; set; }

        [StringLength(50)]
        public string smtpSsl { get; set; }
    }
}
