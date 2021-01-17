import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Companies")
export class Companies {
  @JsonProperty("additionalEmail", Any, true)
  additionalEmail: string = '';
  @JsonProperty("address", Any, true)
  address: string = '';
  @JsonProperty("ateco", Any, true)
  ateco: string = '';
  @JsonProperty("businessDimension", Any, true)
  businessDimension: string = '';
  @JsonProperty("dataConstituzione", Any, true)
  dataConstituzione: string = '';
  @JsonProperty("creationDate", Any, true)
  creationDate: string = '';
}
