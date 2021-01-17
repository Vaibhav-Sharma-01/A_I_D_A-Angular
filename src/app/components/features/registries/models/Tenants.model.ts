import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Tenants")
export class Tenants {
  @JsonProperty("_id", Any, true)
  id: string = '';
  @JsonProperty("name", Any, true)
  name: string = '';
  @JsonProperty("email", Any, true)
  email: string = '';
  @JsonProperty("phoneNumber", Any, true)
  phoneNumber: string = '';
  @JsonProperty("status", Any, true)
  status: string = '';
}