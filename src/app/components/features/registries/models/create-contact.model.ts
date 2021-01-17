import { Any, JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CreateContact')
export class CreateContact {
  @JsonProperty('id', Any, true)
  userId: string = '';
  @JsonProperty('name', Any, true)
  name: string = '';
  @JsonProperty('email', Any, true)
  email: string = '';
  @JsonProperty('manager', Any, true)
  manager: string = '';
  @JsonProperty('phoneNumber', Any, true)
  phoneNumber: string = '';
  @JsonProperty('tenantId', Any, true)
  tenantId: string = '';
  @JsonProperty('country', Any, true)
  country: string = '';
}