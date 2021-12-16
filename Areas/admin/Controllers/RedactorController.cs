using System.Web.Mvc;

namespace mvcbuilder.Areas.admin.Controllers
{
    public class RedactorController : Controller
    {
        // GET: Admin/Redactor
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult adminPanel()
        {
            return PartialView();
        }
        
    }
}