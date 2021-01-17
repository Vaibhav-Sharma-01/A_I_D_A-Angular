import { Any, JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CreateCompany')
export class CreateCompany {
  @JsonProperty('id', Any, true)
  userId: string = '';
  @JsonProperty('name', Any, true)
  name: string = '';
  @JsonProperty('email', Any, true)
  email: string = '';
  @JsonProperty('manager', Any, true)
  manager: string = '';
  @JsonProperty('typology', Any, true)
  typology: string = '';
  @JsonProperty('country', Any, true)
  country: string = '';
  @JsonProperty('vatNumber', Any, true)
  vatNumber: string = '';
  @JsonProperty('tenantId', Any, true)
  tenantId: string = '';
  @JsonProperty('phoneNumber', Any, true)
  phoneNumber: string = '';
}
