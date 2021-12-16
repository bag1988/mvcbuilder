using mvcbuilder.Models.Base;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using mvcbuilder.Models;
using System.ComponentModel.DataAnnotations;

namespace mvcbuilder.Areas.Admin.Data
{    
    public partial class newPageHtmlModel
    {
        public string actionName { get; set; }
        
        public List<newValueModulePage> newPageHtml { get; set; }
    }

    public partial class newValueModulePage
    {
        public string id { get; set; }
        public string css { get; set; }
        public string html { get; set; }
        public string data { get; set; }
    }

    public class newPage
    {
        public page NewPage { get; set; }
        public IEnumerable<IdentityRole> roles { get; set; }
    }

    public class viewDirectory
    {
        public List<string> nameDirectory { get; set; }
        public List<string> nameFile { get; set; }
    }

    public class RoleEditModel
    {
        public IdentityRole Role { get; set; }
        public IEnumerable<ApplicationUser> Members { get; set; }
        public IEnumerable<ApplicationUser> NonMembers { get; set; }
    }

    public class RoleModificationModel
    {
        [Required]
        public string RoleName { get; set; }
        public string[] IdsToAdd { get; set; }
        public string[] IdsToDelete { get; set; }
    }
}