using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Entities.DTOs;

namespace Business.Concrete
{
    public class ColorManager : IColorService
    {
        IColorDal _colorDal;

        public ColorManager(IColorDal colorDal)
        {
            _colorDal = colorDal;
        }

        public IDataResult<List<Color>> GetAll()
        {
            return new SuccessDataResult<List<Color>>(_colorDal.GetAll(), Messages.Listed);
        }

        public IDataResult<Color> GetById(int colorId)
        {
            return new SuccessDataResult<Color>(_colorDal.Get(c => c.ColorID == colorId), Messages.Listed);
        }

        [ValidationAspect(typeof(ColorValidator), Priority =1)]
        public IResult Add(Color color)
        {
            _colorDal.Add(color);
            return new SuccessResult(Messages.Added);
        }

        [ValidationAspect(typeof(ColorValidator), Priority =1)]
        public IResult Update(Color color)
        {
            _colorDal.Update(color);
            return new SuccessResult(Messages.Updated);
        }

        public IResult Delete(Color color)
        {
            var result = _colorDal.DeleteColorIfNotReturnDateNull(color);
            if (result)
            {
                return new SuccessResult(Messages.Deleted);
            }
            return new ErrorResult(Messages.NotDeleted);
;        }
    }
}