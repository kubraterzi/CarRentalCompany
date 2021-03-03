using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Text;
using Business.Abstract;
using Core.Constants;
using Core.Utilities.Business;
using Core.Utilities.Results;
using Core.Utilities.Uploads.ImageUploads;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace Business.Concrete
{
    public class CarImageManager : ICarImageService
    {
        private ICarImageDal _imageDal;

        public CarImageManager(ICarImageDal imageDal)
        {
            _imageDal = imageDal;
        }

        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_imageDal.GetAll(), Messages.Listed);
        }

        public IDataResult<List<CarImage>> GetImagesByCarId(int carId)
        {
            //return new SuccessDataResult<List<CarImage>>(_imageDal.GetAll(i => i.CarID == carId), Messages.Listed);

            var result = _imageDal.GetAll(i => i.CarID == carId);

            if (result.Count > 0)
            {
                return new SuccessDataResult<List<CarImage>>(result);
            }

            List<CarImage> images = new List<CarImage>();
            images.Add(new CarImage() { CarID = 0, ImageID = 0, Date = DateTime.Now, ImagePath = "/images/car-rent.png" });

            return new SuccessDataResult<List<CarImage>>(images);
        }

        public IDataResult<CarImage> GetById(int imageId)
        {
            return new SuccessDataResult<CarImage>(_imageDal.Get(i => i.ImageID == imageId));

        }

        public IResult Add(IFormFile file, CarImage carImage)
        {

            var result = FileHelper.Upload(file);
            if (!result.SuccessStatus)
            {
                return new ErrorResult(result.Message);
            }

            carImage.ImagePath = result.Data;
            _imageDal.Add(carImage);
            return new SuccessResult("Car image added");
        }

        public IResult Update(IFormFile file,CarImage carImage)
        {
            var image = _imageDal.Get(c => c.ImageID == carImage.ImageID);
            if (image == null)
            {
                return new ErrorResult("Image not found.");
            }

            var updatedFile = FileHelper.Update(file,image.ImagePath);
            if (!updatedFile.SuccessStatus)
            {
                return new ErrorResult(updatedFile.Message);
            }
            carImage.ImagePath = updatedFile.Data;
            _imageDal.Update(carImage);
            return new SuccessResult("Car image updated");
        }

        public IResult Delete(CarImage carImage)
        {
            var image = _imageDal.Get(c => c.ImageID == carImage.ImageID);
            if (image == null)
            {
                return new ErrorResult("Image not found");
            }

            FileHelper.Delete(image.ImagePath);
            _imageDal.Delete(carImage);
            return new SuccessResult(Messages.Deleted);
        }

        private IResult CheckIfImageCount(CarImage carImage)
        {
            List<CarImage> gelAll = _imageDal.GetAll(i => i.CarID == carImage.CarID);
            var result = (gelAll.Count() >=5 );
            if (result)
            {
                return new ErrorResult("Bir aracın en fazla 5 resmi olabilir.");
            }
            return new SuccessResult();
        }
    }
}
