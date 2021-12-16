using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(mvcbuilder.Startup))]
namespace mvcbuilder
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
