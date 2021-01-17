import { Any, JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('UserProfile')
export class UserProfile {
  @JsonProperty('preferredLanguage', Any, true)
  language: string = '';
  @JsonProperty('defaultRows', Any, true)
  defaultRows: string = '';
}

