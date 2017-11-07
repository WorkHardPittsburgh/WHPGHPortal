using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Models
{
    public class Contract
    {
    public int Id { get; set; }
    public int UptakeId { get; set; }
    public string VendorName { get; set; }
    public string VendorShort { get; set; }
    public string DocumentTitle { get; set; }
    public DateTime AcceptanceDate { get; set; }
    public string VendorSigneeName { get; set; }
    public string VendorSigneeTitle { get; set; }
    public string ClientSigneeName { get; set; }
    public string VendorSigFile { get; set; }
    public string ClientSigFile { get; set; }
    public string OverViewText { get; set; }
    public string ExecutionText { get; set; }
    public string PersonnelText { get; set; }
    public string VendorValueProp { get; set; }
    public string ContactUrl { get; set; }
    public string ContactEmail { get; set; }
    public string AddressId { get; set; }
    public string ContactPhone { get; set; }
    public Uptake Uptakes { get; set; }
    public Address Addresses { get; set; }
    public ICollection<ContractReference> ContractReferences { get; set; }
    public ICollection<ContractSampleWork> ContractSampleWork { get; set; }
    public ICollection<ContractPersonnel> ContractPersonnel { get; set; }
    }
}