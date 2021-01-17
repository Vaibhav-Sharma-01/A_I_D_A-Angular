import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Contacts")
export class Contacts {
  @JsonProperty("_id", Any, true)
  id: string = '';
  @JsonProperty("country", Any, true)
  country: string = '';
  @JsonProperty("name", Any, true)
  name: string = '';
  @JsonProperty("email", Any, true)
  email: string = '';
  @JsonProperty("phoneNumber", Any, true)
  phoneNumber: string = '';
  @JsonProperty("manager", Any, true)
  manager: Object = {};
  @JsonProperty("fiscalCode", Any, true)
  fiscalCode: string = '';
  @JsonProperty("bornIn", Any, true)
  bornIn: string = '';
  @JsonProperty("bornOn", Any, true)
  bornOn: Date = new Date();
  @JsonProperty("address", Any, true)
  address: string = '';
  @JsonProperty("postalCode", Any, true)
  postalCode: string = '';
  @JsonProperty("city", Any, true)
  city: string = '';
  @JsonProperty("province", Any, true)
  province: string = '';
  @JsonProperty("mobile", Any, true)
  mobile: string = '';
  @JsonProperty("pec", Any, true)
  pec: string = '';
  @JsonProperty("website", Any, true)
  website: string = '';
  @JsonProperty("facebookUrl", Any, true)
  facebookUrl: string = '';
  @JsonProperty("linkedInUrl", Any, true)
  linkedInUrl: string = '';
  @JsonProperty("tags", Any, true)
  tags: Array<any> = [];
}
