import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject("LoggedInUser")
export class LoggedInUser {
  @JsonProperty("userRole", Any, true)
  role: string = '';
  @JsonProperty("userName", Any, true)
  name: string = '';
  @JsonProperty("userEmail", Any, true)
  email: string = '';
  @JsonProperty("userTenantId", Any, true)
  tenantId: string = '';
  @JsonProperty("userId", Any, true)
  id: string = '';
  @JsonProperty("userPermissions", Any, true)
  permissions: Array<string> = [];
  @JsonProperty("userLanguage", Any, true)
  language: string = ''
}
