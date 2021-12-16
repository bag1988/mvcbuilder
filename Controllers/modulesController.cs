using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvcbuilder.Controllers
{
    public class modulesController : Controller
    {
        [HttpPost]
        public ActionResult Index(string urlPartial)
        {
            if (!System.IO.File.Exists(Server.MapPath("~/views/modules/" + urlPartial + ".cshtml")))
                return null;
            return PartialView(urlPartial);
        }
    }
}