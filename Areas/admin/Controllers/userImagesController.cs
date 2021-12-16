using mvcbuilder.Areas.Admin.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace mvcbuilder.Areas.Admin.Controllers
{
    public class userImagesController : Controller
    {
        // GET: Admin/userImages
        public ActionResult Index(string name)
        {
            return View();
        }

        [HttpPost]
        public ActionResult getDirInfo(string nameDirectory)
        {
            nameDirectory = "/images/" + (nameDirectory == null ? "" : nameDirectory + "/");
            string url = Server.MapPath(nameDirectory);
            if (!Directory.Exists("/images/"))
            {
                Directory.CreateDirectory("/images/");
            }
            if (Directory.Exists(url))
            {
                viewDirectory views = new viewDirectory();
                views.nameFile = new DirectoryInfo(url).GetFiles().Select(x => nameDirectory + x.Name).ToList();
                views.nameDirectory = new DirectoryInfo(url).GetDirectories().Select(x => x.Name).ToList();
                return Json(views);
            }
            return new HttpStatusCodeResult(HttpStatusCode.NoContent);
        }

        [HttpPost]
        public JsonResult saveNewImages(HttpPostedFileBase image, string dirName, string imgName)
        {
            if (image == null)
                return Json("<font style='color:red'>Выберете файл!</font>");
            FileInfo fInfo = new FileInfo(image.FileName);
            string exec = fInfo.Extension;
            string[] ex = { ".jpg", ".gif", ".png", ".jpeg" };
            if (!ex.Contains(exec.ToLower()))
                return Json("<font style='color:red'>Допустимые расширения файла: JPG, JPEG, PNG, GIF</font>");
            if (image.ContentLength>9000000)
                return Json("<font style='color:red'>Допустимый размер файла 8mb</font>");
            if (dirName == "")
                dirName = "/images/";
            if (imgName == "")
                return Json("<font style='color:red'>Введите имя файла</font>");
            if (System.IO.File.Exists(Server.MapPath("~" + dirName + imgName + exec)))
                return Json("<font style='color:red'>Файл с именем " + imgName + " существует, выберете другое имя файла!</font>");

            image.SaveAs(Server.MapPath("~" + dirName + imgName + exec));

            return Json("<font style='color:green'>Файл сохранен!</font>");
        }

        [HttpPost]
        public JsonResult deleteImages(string nameImage)
        {
            if (!System.IO.File.Exists(Server.MapPath("~" + nameImage)))
                return Json("<font style='color:red'>Файл  ~" + nameImage + " несуществует!</font>");


            System.IO.File.Delete(Server.MapPath("~" + nameImage));

            return Json("<font style='color:green'>Файл удален!</font>");
        }

        [HttpPost]
        public string CreateDirectory(string nameDirectory)
        {            
            try
            {
                string url = Server.MapPath("/images/" + nameDirectory.Replace(" ", ""));
                if (!Directory.Exists(url))
                {
                    Directory.CreateDirectory(url);
                    return "<font style='color:green'>Папка с именем " + nameDirectory + " создана</font>";
                }
                else
                {
                    return "<font style='color:red'>Папка с таким именем " + nameDirectory + " существует</font>";
                }
            }
            catch(Exception e)
            {
                return "<font style='color:red'>" + e.ToString() + "</font>";
            }
        }       
    }
}
