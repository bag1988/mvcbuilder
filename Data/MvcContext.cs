using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using mvcbuilder.Models.Base;

namespace mvcbuilder.Data
{
    public class MvcContext : IdentityDbContext<IdentityUser>
    {
        public MvcContext()
            : base("MvcContext", throwIfV1Schema: false)
        {
            try
            {
                Database.CreateIfNotExists();
            }
            catch (Exception ex)
            {

            }
        }
        
        //public DbSet<article> articles { get; set; }
        //public DbSet<feedback> feedbacks { get; set; }
        //public DbSet<savingModule> savingModules { get; set; }
        public DbSet<module> modules { get; set; }
        //public DbSet<news> news { get; set; }
        //public DbSet<optionsModule> optionsModules { get; set; }
        //public DbSet<optionsBlock> optionsBlocks { get; set; }
        public DbSet<page> pages { get; set; }
        //public DbSet<photo> photos { get; set; }
        //public DbSet<photoImg> photoimgs { get; set; }
        public DbSet<pageModule> pageModules { get; set; }
        //public DbSet<propertyTemplate> propertyTemplates { get; set; }
        //public DbSet<saveProperty> saveProperties { get; set; }
        //public DbSet<savePropertyOptionsBlock> savePropertyOptionsBlocks { get; set; }
        //public DbSet<site> sites { get; set; }
        //public DbSet<smtpOption> smtpOptions { get; set; }
        //public DbSet<template> templates { get; set; }
        //public DbSet<templatesOptionsBlock> templatesOptionsBlocks { get; set; }
        //public DbSet<userField> userFields { get; set; }
        //public DbSet<userImage> userImages { get; set; }
        //public DbSet<video> videos { get; set; }
        //public DbSet<videoList> videolists { get; set; }
        public static MvcContext Create()
        {
            return new MvcContext();
        }
    }
}
