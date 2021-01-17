import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Companies")
export class Companies {
  @JsonProperty("_id", Any, true)
  id: string = '';
  @JsonProperty("name", Any, true)
  name: string = '';
  @JsonProperty("email", Any, true)
  email: string = '';
  @JsonProperty("phoneNumber", Any, true)
  phoneNumber: string = '';
  @JsonProperty("typology", Any, true)
  typology: string = '';
  @JsonProperty("manager", Any, true)
  manager: any  = '';
  @JsonProperty("ateco", Any, true)
  ateco: any  = '';
  @JsonProperty("notes", Any, true)
  notes: any  = '';
  @JsonProperty("vatNumber", Any, true)
  vatNumber: string  = '';
  @JsonProperty("fiscalCode", Any, true)
  fiscalCode: any  = '';
  @JsonProperty("sdiCode", Any, true)
  sdiCode: String  = '';
  @JsonProperty("reaCode", Any, true)
  reaCode: String  = '';
  @JsonProperty("companyLogo", Any, true)
  companyLogo: String  = '';
  @JsonProperty("numberOfEmployees", Any, true)
  numberOfEmployees: String  = '';
  @JsonProperty("businessDimension", Any, true)
  businessDimension: any  = '';
  @JsonProperty("dataConstituzione", Any, true)
  dataConstituzione: any  = '';
  @JsonProperty("address", Any, true)
  address: String  = '';
  @JsonProperty("postalCode", Any, true)
  postalCode: String  = '';
  @JsonProperty("city", Any, true)
  city: String  = '';
  @JsonProperty("province", Any, true)
  province: any  = '';
  @JsonProperty("region", Any, true)
  region: String  = '';
  @JsonProperty("country", Any, true)
  country: String  = '';
  @JsonProperty("optionalPhoneNumber", Any, true)
  optionalPhoneNumber: String  = '';
  @JsonProperty("additionalEmail", Any, true)
  additionalEmail: String  = '';
  @JsonProperty("fax", Any, true)
  fax: String  = '';
  @JsonProperty("pec", Any, true)
  pec: String  = '';
  @JsonProperty("website", Any, true)
  website: String  = '';
  @JsonProperty("facebookUrl", Any, true)
  facebookUrl: String  = '';
  @JsonProperty("linkedInUrl", Any, true)
  linkedInUrl: String  = '';
}
