using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using mvcbuilder.Data;
using mvcbuilder.Models.Base;
using mvcbuilder.Areas.Admin.Data;
using System.IO;
using Microsoft.AspNet.Identity;
using mvcbuilder.Areas.Admin.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace mvcbuilder.Areas.admin.Controllers
{
    public class pagesController : Controller
    {
        private ApplicationRoleManager RoleManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
        }
        private MvcContext db = new MvcContext();

        // GET: admin/pages
        public async Task<ActionResult> Index()
        {
            return View(await db.pages.ToListAsync());
        }

        // GET: admin/pages/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            page page = await db.pages.FindAsync(id);
            if (page == null)
            {
                return HttpNotFound();
            }
            return View(page);
        }

        // GET: admin/pages/Create
        public ActionResult Create()
        {
            newPage p = new newPage();
            p.roles = RoleManager.Roles.ToList();
            return View(p);
        }

        // POST: admin/pages/Create
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в разделе https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(newPage p)
        {
           
            if (ModelState.IsValid)
            {
                if (System.IO.File.Exists(Server.MapPath("~/views/home/" + p.NewPage.urlPage + ".cshtml")))
                {
                    ModelState.AddModelError("", "Файл с именем " + p.NewPage.urlPage + " существует! Выберите другое имя!");
                }
                else
                {
                    using (StreamWriter sw = new StreamWriter(Server.MapPath("~/views/home/" + p.NewPage.urlPage + ".cshtml"), false, System.Text.Encoding.UTF8))
                    {

                    }
                    db.pages.Add(p.NewPage);
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }
            p.roles = RoleManager.Roles.ToList();
            return View(p);
        }

        // GET: admin/pages/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            newPage p = new newPage();
            p.roles = RoleManager.Roles.ToList();
            p.NewPage = await db.pages.FindAsync(id);
            if (p.NewPage == null)
            {
                return HttpNotFound();
            }
            return View(p);
        }

        // POST: admin/pages/Edit/5
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в разделе https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(newPage page)
        {
            if (ModelState.IsValid)
            {
                db.Entry(page.NewPage).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            page.roles = RoleManager.Roles.ToList();
            return View(page);
        }

        // GET: admin/pages/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            page page = await db.pages.FindAsync(id);
            if (page == null)
            {
                return HttpNotFound();
            }
            return View(page);
        }

        // POST: admin/pages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {            
            page page = await db.pages.FindAsync(id);
            if (System.IO.File.Exists(Server.MapPath("~/views/home/" + page.urlPage + ".cshtml")))
            {
                System.IO.File.Delete(Server.MapPath("~/views/home/" + page.urlPage + ".cshtml"));
            }
            db.pages.Remove(page);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public JsonResult changePage(newPageHtmlModel p)
        {

            if (!System.IO.File.Exists(Server.MapPath("~/views/" + p.actionName + ".cshtml")))
                return Json("<font style='color:red'>Файл с именем <b>" + p.actionName + ".cshtml</b> не существует!</font>");
            using (StreamWriter sw = new StreamWriter(Server.MapPath("~/views/" + p.actionName + ".cshtml"), false, System.Text.Encoding.UTF8))
            {
                if (p.newPageHtml != null)
                {
                    foreach (newValueModulePage t in p.newPageHtml)
                    {
                        string id = "";
                        string css = "";
                        string data = " data-content='div'";
                        if (t.id != "")
                            id = "id='" + t.id + "' ";
                        if (t.css != "")
                            css = "class='" + t.css + "' ";
                        if (t.data != "")
                            data = " data-content='" + t.data + "' ";
                        sw.WriteLine("<div" + data + id + css + ">");
                        sw.WriteLine(t.html);
                        sw.WriteLine("</div>");
                    }
                }
            }
            return Json("<font style='color:green'>Изменения сохранены!</font>");
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
