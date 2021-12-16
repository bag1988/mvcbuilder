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

namespace mvcbuilder.Areas.admin.Controllers
{
    public class extensionsController : Controller
    {
        private MvcContext db = new MvcContext();

        // GET: Admin/extensions
        public async Task<ActionResult> Index()
        {
            return View(await db.modules.ToListAsync());
        }

        [HttpPost]
        public async Task<JsonResult> viewModule()
        {
            return Json(await db.modules.ToListAsync());
        }

        // GET: Admin/extensions/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            module module = await db.modules.FindAsync(id);
            if (module == null)
            {
                return HttpNotFound();
            }
            return View(module);
        }

        // GET: Admin/extensions/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/extensions/Create
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "idModule,nameModule,defaultHtml,defaultCss,urlModule")] module module)
        {
            if (ModelState.IsValid)
            {
                db.modules.Add(module);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(module);
        }

        // GET: Admin/extensions/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            module module = await db.modules.FindAsync(id);
            if (module == null)
            {
                return HttpNotFound();
            }
            return View(module);
        }

        // POST: Admin/extensions/Edit/5
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "idModule,nameModule,defaultHtml,defaultCss,urlModule")] module module)
        {
            if (ModelState.IsValid)
            {
                db.Entry(module).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(module);
        }

        // GET: Admin/extensions/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            module module = await db.modules.FindAsync(id);
            if (module == null)
            {
                return HttpNotFound();
            }
            return View(module);
        }

        // POST: Admin/extensions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            module module = await db.modules.FindAsync(id);
            db.modules.Remove(module);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
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
