using Business.Abstract;
using Core.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Entities.Concrete;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        public IDataResult<List<User>> GetAll()

        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll(), Messages.Listed);
        }

        public IDataResult<User> GetById(int userId)

        {
            return new SuccessDataResult<User>(_userDal.Get(u=> u.Id == userId), Messages.Listed);
        }       

        [ValidationAspect(typeof(UserValidator), Priority =1)]

        public IResult Delete(User user)
        {
            var result = _userDal.DeleteUserIfNotReturnDateNull(user);
            if (result)
            {
                return new SuccessResult(Messages.Deleted);
            }

            return new ErrorResult(Messages.NotDeleted);

        }

        [ValidationAspect(typeof(UserValidator), Priority =1)]
        public IResult Update(User user)
        {
            _userDal.Update(user);
            return new SuccessResult(Messages.Updated);
        }

        public IDataResult<List<OperationClaim>> GetClaims(User user)
        {
            return new SuccessDataResult<List<OperationClaim>>(_userDal.GetClaims(user));
        }

        public IResult Add(User user)
        {
            _userDal.Add(user);
            return new SuccessResult();
        }

        public IDataResult<User> GetByEmail(string email)
        {
            return new SuccessDataResult<User>(_userDal.Get(u=> u.Email == email));
        }
    }
}
