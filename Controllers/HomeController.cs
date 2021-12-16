using mvcbuilder.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvcbuilder.Controllers
{
    public class HomeController : Controller
    {
        private MvcContext db = new MvcContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        protected override void HandleUnknownAction(string actionName)
        {
            //int idPage = db.pages.First(x => x.urlPage == actionName).idPage;

            //IEnumerable<pageModule> p = db.pageModules.Include("module").Where(x => x.idPage == idPage).OrderBy(x => x.yindex); 

            //if (System.IO.File.Exists(Server.MapPath("~/views/home/"+actionName+".cshtml")))
            //    View(actionName, p).ExecuteResult(ControllerContext);
            View(actionName);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}