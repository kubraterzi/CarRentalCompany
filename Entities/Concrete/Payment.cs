using System;
using System.Collections.Generic;
using System.Text;
using Core.Entities;

namespace Entities.Concrete
{
    public class Payment : IEntity
    {
        public int PaymentId { get; set; }
        public string NameOnTheCard { get; set; }
        public string CardNumber { get; set; }
        public int DateMonth { get; set; }
        public int DateYear { get; set; }
        public int CVVCode { get; set; }
    }
}
