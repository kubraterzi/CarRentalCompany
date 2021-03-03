using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, CarRentalCompanyContext>, ICustomerDal
    {
        public List<CustomerRentalDetailDto> GetRentalAndCustomerDetails()
        {
            using (CarRentalCompanyContext context = new CarRentalCompanyContext())
            {
                var result = from c in context.Customers
                    join u in context.Users
                        on c.UserID equals u.Id
                    join r in context.Rentals
                        on c.CustomerID equals r.CustomerID
                    select new CustomerRentalDetailDto
                    {
                        CustomerID = c.CustomerID,
                        UserID = u.Id,
                        RentalID = r.RentalID,
                        RentDate = r.RentDate,
                        ReturnDate = r.ReturnDate
                    };
                return result.ToList();
            }
        }

        public List<CustomerDetailDto> GetCustomerDetails()
        {
            using (CarRentalCompanyContext context = new CarRentalCompanyContext())
            {
                var result = from a in GetRentalAndCustomerDetails()
                    join c in context.Customers
                        on a.CustomerID equals c.CustomerID
                    select new CustomerDetailDto
                    {
                        CustomerID = a.CustomerID,
                        CompanyName = c.CompanyName
                    };
                return result.ToList();
            }
        }
        
        public bool DeleteCustomerIfNotReturnDateNull(Customer customer)
        {
            using (CarRentalCompanyContext context = new CarRentalCompanyContext())
            {
                var find = context.Rentals.Any(i => i.CustomerID == customer.CustomerID && i.ReturnDate == null);
                if (!find)
                {
                    context.Remove(customer);
                    context.SaveChanges();
                    return true;
                }
            }
            return false;
        }
    }
}