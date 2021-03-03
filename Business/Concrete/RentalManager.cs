using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {
        IRentalDal _rentalDal;

        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }

        public IDataResult<List<Rental>> GetAll()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(), Messages.Listed);
        }

        public IDataResult<List<Rental>> GetRentalByUndelivered()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(r=> r.ReturnDate == null),Messages.Listed);
        }

        public IDataResult<List<RentalDetailDto>> GetRentalDetails()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetRentalDetails(), Messages.Listed);
        }

        public IDataResult<Rental> GetById(int carId)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(r=> r.CarID == carId), Messages.Listed);
        }

        [ValidationAspect(typeof(RentalValidator), Priority =1)]
        public IResult Add(Rental rental)
        {
            if (rental.ReturnDate == null)
            {
                return new ErrorResult(Messages.NotAvailable);
            }
            else
            {
                _rentalDal.Add(rental);
                return new SuccessResult(Messages.Added);
            }
        }

        public IResult Delete(Rental rental)
        {
            var result = _rentalDal.DeleteRentalIfNotReturnDateNull(rental);
            if (result)
            {
                return new SuccessResult(Messages.Deleted);
            }

            return new ErrorResult(Messages.NotDeleted);
        }

        [ValidationAspect(typeof(RentalValidator), Priority =1)]
        public IResult Update(Rental rental)
        {
            _rentalDal.Update(rental);
            return new SuccessResult(Messages.Updated);
        }

    }
}
