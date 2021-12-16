using mvcbuilder.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using mvcbuilder.Data;

namespace mvcbuilder.Areas.Admin.Models
{
    public class ApplicationRoleManager : RoleManager<IdentityRole>, IDisposable
    {
        public ApplicationRoleManager(IRoleStore<IdentityRole, string> roleStore)
            : base(roleStore)
        { }

        public static ApplicationRoleManager Create(
            IdentityFactoryOptions<ApplicationRoleManager> options,
            IOwinContext context)
        {
            return new ApplicationRoleManager(new
                RoleStore<IdentityRole>(context.Get<MvcContext>()));
        }
    }

}