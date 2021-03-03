using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, CarRentalCompanyContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails()
        {
            using (CarRentalCompanyContext context = new CarRentalCompanyContext())
            {
                var result = from c in context.Cars
                             join b in context.Brands
                             on c.BrandID equals b.BrandID
                             join co in context.Colors
                             on c.ColorID equals co.ColorID
                             select new CarDetailDto
                             {
                                 CarID = c.CarID,
                                 BrandName = b.BrandName,
                                 BrandModel = b.BrandModel,
                                 ColorName = co.ColorName,
                                 DailyPrice = c.DailyPrice,
                                 Description = c.Description
                             };
                return result.ToList();
            }
        }

        
        public bool DeleteCarIfNotReturnDateNull(Car car)
        {
            using (CarRentalCompanyContext context = new CarRentalCompanyContext())
            {
                var find = context.Rentals.Any(i => i.CarID == car.CarID && i.ReturnDate == null);
                if (!find)
                {
                    context.Remove(car);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            
        }

    }
}
