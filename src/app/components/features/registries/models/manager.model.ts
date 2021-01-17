import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Managers")
export class Managers {
  @JsonProperty("_id", Any, true)
  id: string = '';
  @JsonProperty("name", Any, true)
  name: string = '';
}
