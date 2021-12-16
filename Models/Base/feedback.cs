using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvcbuilder.Models.Base
{
    public partial class feedback
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idFeedback { get; set; }

        public DateTime? dateFeedback { get; set; }

        [StringLength(50)]
        public string fio { get; set; }

        [StringLength(50)]
        public string company { get; set; }

        [StringLength(50)]
        public string email { get; set; }

        [StringLength(50)]
        public string phone { get; set; }

        [Column(TypeName = "text")]
        public string textFeedback { get; set; }

        [StringLength(50)]
        public string status { get; set; }
    }
}
