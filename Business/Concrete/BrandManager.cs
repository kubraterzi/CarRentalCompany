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
using Business.BusinessAspects.Autofac;

namespace Business.Concrete
{
    public class BrandManager : IBrandService
    {
        IBrandDal _brandDal;

        public BrandManager(IBrandDal brandDal)
        {
            _brandDal = brandDal;
        }

        public IDataResult<List<Brand>> GetAll()
        {
            return new SuccessDataResult<List<Brand>>(_brandDal.GetAll(), Messages.Listed);

        }

        public IDataResult<Brand> GetById(int brandId)
        {
            return new SuccessDataResult<Brand>(_brandDal.Get(b => b.BrandID == brandId), Messages.Listed);
        }

        [ValidationAspect(typeof(BrandValidator), Priority = 1)]
        [SecuredOperation("admin, product.add")]
        public IResult Add(Brand brand)
        {
            _brandDal.Add(brand);
            return new SuccessResult(Messages.Added);

        }

        [ValidationAspect(typeof(BrandValidator), Priority = 1)]
        public IResult Update(Brand brand)
        {
            _brandDal.Update(brand);
            return new SuccessResult(Messages.Updated);
        }

        public IResult Delete(Brand brand)
        {
            var result = _brandDal.DeleteBrandIfNotReturnDateNull(brand);
            if (result)
            {
                return new SuccessResult(Messages.Deleted);
            }
            return new ErrorResult(Messages.NotDeleted);
        }

    }
}
