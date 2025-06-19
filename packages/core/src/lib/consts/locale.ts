/*
 * Copyright 2025 Artem Godin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * IETF BCP 47 language tag
 *
 * @see https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 *
 * @public
 */

export type LanguageCode =
  /** Afar */
  | 'aa'
  /** Abkhazian */
  | 'ab'
  /** Avestan */
  | 'ae'
  /** Afrikaans */
  | 'af'
  /** Akan */
  | 'ak'
  /** Amharic */
  | 'am'
  /** Aragonese */
  | 'an'
  /** Arabic */
  | 'ar'
  /** Assamese */
  | 'as'
  /** Avaric */
  | 'av'
  /** Aymara */
  | 'ay'
  /** Azerbaijani */
  | 'az'
  /** Bashkir */
  | 'ba'
  /** Belarusian */
  | 'be'
  /** Bulgarian */
  | 'bg'
  /** Bhojpuri */
  | 'bh'
  /** Bislama */
  | 'bi'
  /** Bambara */
  | 'bm'
  /** Bangla */
  | 'bn'
  /** Tibetan */
  | 'bo'
  /** Breton */
  | 'br'
  /** Bosnian */
  | 'bs'
  /** Catalan */
  | 'ca'
  /** Chechen */
  | 'ce'
  /** Chamorro */
  | 'ch'
  /** Corsican */
  | 'co'
  /** Cree */
  | 'cr'
  /** Czech */
  | 'cs'
  /** Church Slavic */
  | 'cu'
  /** Chuvash */
  | 'cv'
  /** Welsh */
  | 'cy'
  /** Danish */
  | 'da'
  /** German */
  | 'de'
  /** Divehi */
  | 'dv'
  /** Dzongkha */
  | 'dz'
  /** Ewe */
  | 'ee'
  /** Greek */
  | 'el'
  /** English */
  | 'en'
  /** Esperanto */
  | 'eo'
  /** Spanish */
  | 'es'
  /** Estonian */
  | 'et'
  /** Basque */
  | 'eu'
  /** Persian */
  | 'fa'
  /** Fula */
  | 'ff'
  /** Finnish */
  | 'fi'
  /** Fijian */
  | 'fj'
  /** Faroese */
  | 'fo'
  /** French */
  | 'fr'
  /** Western Frisian */
  | 'fy'
  /** Irish */
  | 'ga'
  /** Scottish Gaelic */
  | 'gd'
  /** Galician */
  | 'gl'
  /** Guarani */
  | 'gn'
  /** Gujarati */
  | 'gu'
  /** Manx */
  | 'gv'
  /** Hausa */
  | 'ha'
  /** Hebrew */
  | 'he'
  /** Hindi */
  | 'hi'
  /** Hiri Motu */
  | 'ho'
  /** Croatian */
  | 'hr'
  /** Haitian Creole */
  | 'ht'
  /** Hungarian */
  | 'hu'
  /** Armenian */
  | 'hy'
  /** Herero */
  | 'hz'
  /** Interlingua */
  | 'ia'
  /** Indonesian */
  | 'id'
  /** Interlingue */
  | 'ie'
  /** Igbo */
  | 'ig'
  /** Sichuan Yi */
  | 'ii'
  /** Inupiaq */
  | 'ik'
  /** Indonesian */
  | 'in'
  /** Ido */
  | 'io'
  /** Icelandic */
  | 'is'
  /** Italian */
  | 'it'
  /** Inuktitut */
  | 'iu'
  /** Hebrew */
  | 'iw'
  /** Japanese */
  | 'ja'
  /** Yiddish */
  | 'ji'
  /** Javanese */
  | 'jv'
  /** Javanese */
  | 'jw'
  /** Georgian */
  | 'ka'
  /** Kongo */
  | 'kg'
  /** Kikuyu */
  | 'ki'
  /** Kuanyama */
  | 'kj'
  /** Kazakh */
  | 'kk'
  /** Kalaallisut */
  | 'kl'
  /** Khmer */
  | 'km'
  /** Kannada */
  | 'kn'
  /** Korean */
  | 'ko'
  /** Kanuri */
  | 'kr'
  /** Kashmiri */
  | 'ks'
  /** Kurdish */
  | 'ku'
  /** Komi */
  | 'kv'
  /** Cornish */
  | 'kw'
  /** Kyrgyz */
  | 'ky'
  /** Latin */
  | 'la'
  /** Luxembourgish */
  | 'lb'
  /** Ganda */
  | 'lg'
  /** Limburgish */
  | 'li'
  /** Lingala */
  | 'ln'
  /** Lao */
  | 'lo'
  /** Lithuanian */
  | 'lt'
  /** Luba-Katanga */
  | 'lu'
  /** Latvian */
  | 'lv'
  /** Malagasy */
  | 'mg'
  /** Marshallese */
  | 'mh'
  /** Māori */
  | 'mi'
  /** Macedonian */
  | 'mk'
  /** Malayalam */
  | 'ml'
  /** Mongolian */
  | 'mn'
  /** Romanian */
  | 'mo'
  /** Marathi */
  | 'mr'
  /** Malay */
  | 'ms'
  /** Maltese */
  | 'mt'
  /** Burmese */
  | 'my'
  /** Nauru */
  | 'na'
  /** Norwegian Bokmål */
  | 'nb'
  /** North Ndebele */
  | 'nd'
  /** Nepali */
  | 'ne'
  /** Ndonga */
  | 'ng'
  /** Dutch */
  | 'nl'
  /** Norwegian Nynorsk */
  | 'nn'
  /** Norwegian */
  | 'no'
  /** South Ndebele */
  | 'nr'
  /** Navajo */
  | 'nv'
  /** Nyanja */
  | 'ny'
  /** Occitan */
  | 'oc'
  /** Ojibwa */
  | 'oj'
  /** Oromo */
  | 'om'
  /** Odia */
  | 'or'
  /** Ossetic */
  | 'os'
  /** Punjabi */
  | 'pa'
  /** Pali */
  | 'pi'
  /** Polish */
  | 'pl'
  /** Pashto */
  | 'ps'
  /** Portuguese */
  | 'pt'
  /** Quechua */
  | 'qu'
  /** Romansh */
  | 'rm'
  /** Rundi */
  | 'rn'
  /** Romanian */
  | 'ro'
  /** Russian */
  | 'ru'
  /** Kinyarwanda */
  | 'rw'
  /** Sanskrit */
  | 'sa'
  /** Sardinian */
  | 'sc'
  /** Sindhi */
  | 'sd'
  /** Northern Sami */
  | 'se'
  /** Sango */
  | 'sg'
  /** Serbian (Latin) */
  | 'sh'
  /** Sinhala */
  | 'si'
  /** Slovak */
  | 'sk'
  /** Slovenian */
  | 'sl'
  /** Samoan */
  | 'sm'
  /** Shona */
  | 'sn'
  /** Somali */
  | 'so'
  /** Albanian */
  | 'sq'
  /** Serbian */
  | 'sr'
  /** Swati */
  | 'ss'
  /** Southern Sotho */
  | 'st'
  /** Sundanese */
  | 'su'
  /** Swedish */
  | 'sv'
  /** Swahili */
  | 'sw'
  /** Tamil */
  | 'ta'
  /** Telugu */
  | 'te'
  /** Tajik */
  | 'tg'
  /** Thai */
  | 'th'
  /** Tigrinya */
  | 'ti'
  /** Turkmen */
  | 'tk'
  /** Filipino */
  | 'tl'
  /** Tswana */
  | 'tn'
  /** Tongan */
  | 'to'
  /** Turkish */
  | 'tr'
  /** Tsonga */
  | 'ts'
  /** Tatar */
  | 'tt'
  /** Akan */
  | 'tw'
  /** Tahitian */
  | 'ty'
  /** Uyghur */
  | 'ug'
  /** Ukrainian */
  | 'uk'
  /** Urdu */
  | 'ur'
  /** Uzbek */
  | 'uz'
  /** Venda */
  | 've'
  /** Vietnamese */
  | 'vi'
  /** Volapük */
  | 'vo'
  /** Walloon */
  | 'wa'
  /** Wolof */
  | 'wo'
  /** Xhosa */
  | 'xh'
  /** Yiddish */
  | 'yi'
  /** Yoruba */
  | 'yo'
  /** Zhuang */
  | 'za'
  /** Chinese */
  | 'zh'
  /** Zulu */
  | 'zu'
  /** sf */
  | 'sf';

/**
 * ISO 3166-1 alpha-2 country codes
 *
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *
 * @public
 */
export type CountryCode =
  /** Andorra */
  | 'AD'
  /** United Arab Emirates */
  | 'AE'
  /** Afghanistan */
  | 'AF'
  /** Antigua & Barbuda */
  | 'AG'
  /** Anguilla */
  | 'AI'
  /** Albania */
  | 'AL'
  /** Armenia */
  | 'AM'
  /** Curaçao */
  | 'AN'
  /** Angola */
  | 'AO'
  /** Antarctica */
  | 'AQ'
  /** Argentina */
  | 'AR'
  /** American Samoa */
  | 'AS'
  /** Austria */
  | 'AT'
  /** Australia */
  | 'AU'
  /** Aruba */
  | 'AW'
  /** Åland Islands */
  | 'AX'
  /** Azerbaijan */
  | 'AZ'
  /** Bosnia & Herzegovina */
  | 'BA'
  /** Barbados */
  | 'BB'
  /** Bangladesh */
  | 'BD'
  /** Belgium */
  | 'BE'
  /** Burkina Faso */
  | 'BF'
  /** Bulgaria */
  | 'BG'
  /** Bahrain */
  | 'BH'
  /** Burundi */
  | 'BI'
  /** Benin */
  | 'BJ'
  /** St. Barthélemy */
  | 'BL'
  /** Bermuda */
  | 'BM'
  /** Brunei */
  | 'BN'
  /** Bolivia */
  | 'BO'
  /** Caribbean Netherlands */
  | 'BQ'
  /** Brazil */
  | 'BR'
  /** Bahamas */
  | 'BS'
  /** Bhutan */
  | 'BT'
  /** Bouvet Island */
  | 'BV'
  /** Botswana */
  | 'BW'
  /** Belarus */
  | 'BY'
  /** Belize */
  | 'BZ'
  /** Canada */
  | 'CA'
  /** Cocos (Keeling) Islands */
  | 'CC'
  /** Congo - Kinshasa */
  | 'CD'
  /** Central African Republic */
  | 'CF'
  /** Congo - Brazzaville */
  | 'CG'
  /** Switzerland */
  | 'CH'
  /** Côte d’Ivoire */
  | 'CI'
  /** Cook Islands */
  | 'CK'
  /** Chile */
  | 'CL'
  /** Cameroon */
  | 'CM'
  /** China */
  | 'CN'
  /** Colombia */
  | 'CO'
  /** Costa Rica */
  | 'CR'
  /** Cuba */
  | 'CU'
  /** Cape Verde */
  | 'CV'
  /** Curaçao */
  | 'CW'
  /** Christmas Island */
  | 'CX'
  /** Cyprus */
  | 'CY'
  /** Czechia */
  | 'CZ'
  /** Germany */
  | 'DE'
  /** Djibouti */
  | 'DJ'
  /** Denmark */
  | 'DK'
  /** Dominica */
  | 'DM'
  /** Dominican Republic */
  | 'DO'
  /** Algeria */
  | 'DZ'
  /** Ecuador */
  | 'EC'
  /** Estonia */
  | 'EE'
  /** Egypt */
  | 'EG'
  /** Western Sahara */
  | 'EH'
  /** Eritrea */
  | 'ER'
  /** Spain */
  | 'ES'
  /** Ethiopia */
  | 'ET'
  /** Finland */
  | 'FI'
  /** Fiji */
  | 'FJ'
  /** Falkland Islands */
  | 'FK'
  /** Micronesia */
  | 'FM'
  /** Faroe Islands */
  | 'FO'
  /** France */
  | 'FR'
  /** Gabon */
  | 'GA'
  /** United Kingdom */
  | 'GB'
  /** Grenada */
  | 'GD'
  /** Georgia */
  | 'GE'
  /** French Guiana */
  | 'GF'
  /** Guernsey */
  | 'GG'
  /** Ghana */
  | 'GH'
  /** Gibraltar */
  | 'GI'
  /** Greenland */
  | 'GL'
  /** Gambia */
  | 'GM'
  /** Guinea */
  | 'GN'
  /** Guadeloupe */
  | 'GP'
  /** Equatorial Guinea */
  | 'GQ'
  /** Greece */
  | 'GR'
  /** South Georgia & South Sandwich Islands */
  | 'GS'
  /** Guatemala */
  | 'GT'
  /** Guam */
  | 'GU'
  /** Guinea-Bissau */
  | 'GW'
  /** Guyana */
  | 'GY'
  /** Hong Kong SAR China */
  | 'HK'
  /** Heard & McDonald Islands */
  | 'HM'
  /** Honduras */
  | 'HN'
  /** Croatia */
  | 'HR'
  /** Haiti */
  | 'HT'
  /** Hungary */
  | 'HU'
  /** Indonesia */
  | 'ID'
  /** Ireland */
  | 'IE'
  /** Israel */
  | 'IL'
  /** Isle of Man */
  | 'IM'
  /** India */
  | 'IN'
  /** British Indian Ocean Territory */
  | 'IO'
  /** Iraq */
  | 'IQ'
  /** Iran */
  | 'IR'
  /** Iceland */
  | 'IS'
  /** Italy */
  | 'IT'
  /** Jersey */
  | 'JE'
  /** Jamaica */
  | 'JM'
  /** Jordan */
  | 'JO'
  /** Japan */
  | 'JP'
  /** Kenya */
  | 'KE'
  /** Kyrgyzstan */
  | 'KG'
  /** Cambodia */
  | 'KH'
  /** Kiribati */
  | 'KI'
  /** Comoros */
  | 'KM'
  /** St. Kitts & Nevis */
  | 'KN'
  /** North Korea */
  | 'KP'
  /** South Korea */
  | 'KR'
  /** Kuwait */
  | 'KW'
  /** Cayman Islands */
  | 'KY'
  /** Kazakhstan */
  | 'KZ'
  /** Laos */
  | 'LA'
  /** Lebanon */
  | 'LB'
  /** St. Lucia */
  | 'LC'
  /** Liechtenstein */
  | 'LI'
  /** Sri Lanka */
  | 'LK'
  /** Liberia */
  | 'LR'
  /** Lesotho */
  | 'LS'
  /** Lithuania */
  | 'LT'
  /** Luxembourg */
  | 'LU'
  /** Latvia */
  | 'LV'
  /** Libya */
  | 'LY'
  /** Morocco */
  | 'MA'
  /** Monaco */
  | 'MC'
  /** Moldova */
  | 'MD'
  /** Montenegro */
  | 'ME'
  /** St. Martin */
  | 'MF'
  /** Madagascar */
  | 'MG'
  /** Marshall Islands */
  | 'MH'
  /** North Macedonia */
  | 'MK'
  /** Mali */
  | 'ML'
  /** Myanmar (Burma) */
  | 'MM'
  /** Mongolia */
  | 'MN'
  /** Macao SAR China */
  | 'MO'
  /** Northern Mariana Islands */
  | 'MP'
  /** Martinique */
  | 'MQ'
  /** Mauritania */
  | 'MR'
  /** Montserrat */
  | 'MS'
  /** Malta */
  | 'MT'
  /** Mauritius */
  | 'MU'
  /** Maldives */
  | 'MV'
  /** Malawi */
  | 'MW'
  /** Mexico */
  | 'MX'
  /** Malaysia */
  | 'MY'
  /** Mozambique */
  | 'MZ'
  /** Namibia */
  | 'NA'
  /** New Caledonia */
  | 'NC'
  /** Niger */
  | 'NE'
  /** Norfolk Island */
  | 'NF'
  /** Nigeria */
  | 'NG'
  /** Nicaragua */
  | 'NI'
  /** Netherlands */
  | 'NL'
  /** Norway */
  | 'NO'
  /** Nepal */
  | 'NP'
  /** Nauru */
  | 'NR'
  /** Niue */
  | 'NU'
  /** New Zealand */
  | 'NZ'
  /** Oman */
  | 'OM'
  /** Panama */
  | 'PA'
  /** Peru */
  | 'PE'
  /** French Polynesia */
  | 'PF'
  /** Papua New Guinea */
  | 'PG'
  /** Philippines */
  | 'PH'
  /** Pakistan */
  | 'PK'
  /** Poland */
  | 'PL'
  /** St. Pierre & Miquelon */
  | 'PM'
  /** Pitcairn Islands */
  | 'PN'
  /** Puerto Rico */
  | 'PR'
  /** Palestinian Territories */
  | 'PS'
  /** Portugal */
  | 'PT'
  /** Palau */
  | 'PW'
  /** Paraguay */
  | 'PY'
  /** Qatar */
  | 'QA'
  /** Réunion */
  | 'RE'
  /** Romania */
  | 'RO'
  /** Serbia */
  | 'RS'
  /** Russia */
  | 'RU'
  /** Rwanda */
  | 'RW'
  /** Saudi Arabia */
  | 'SA'
  /** Solomon Islands */
  | 'SB'
  /** Seychelles */
  | 'SC'
  /** Sudan */
  | 'SD'
  /** Sweden */
  | 'SE'
  /** Singapore */
  | 'SG'
  /** St. Helena */
  | 'SH'
  /** Slovenia */
  | 'SI'
  /** Svalbard & Jan Mayen */
  | 'SJ'
  /** Slovakia */
  | 'SK'
  /** Sierra Leone */
  | 'SL'
  /** San Marino */
  | 'SM'
  /** Senegal */
  | 'SN'
  /** Somalia */
  | 'SO'
  /** Suriname */
  | 'SR'
  /** South Sudan */
  | 'SS'
  /** São Tomé & Príncipe */
  | 'ST'
  /** El Salvador */
  | 'SV'
  /** Sint Maarten */
  | 'SX'
  /** Syria */
  | 'SY'
  /** Eswatini */
  | 'SZ'
  /** Turks & Caicos Islands */
  | 'TC'
  /** Chad */
  | 'TD'
  /** French Southern Territories */
  | 'TF'
  /** Togo */
  | 'TG'
  /** Thailand */
  | 'TH'
  /** Tajikistan */
  | 'TJ'
  /** Tokelau */
  | 'TK'
  /** Timor-Leste */
  | 'TL'
  /** Turkmenistan */
  | 'TM'
  /** Tunisia */
  | 'TN'
  /** Tonga */
  | 'TO'
  /** Türkiye */
  | 'TR'
  /** Trinidad & Tobago */
  | 'TT'
  /** Tuvalu */
  | 'TV'
  /** Taiwan */
  | 'TW'
  /** Tanzania */
  | 'TZ'
  /** Ukraine */
  | 'UA'
  /** Uganda */
  | 'UG'
  /** U.S. Outlying Islands */
  | 'UM'
  /** United States */
  | 'US'
  /** Uruguay */
  | 'UY'
  /** Uzbekistan */
  | 'UZ'
  /** Vatican City */
  | 'VA'
  /** St. Vincent & Grenadines */
  | 'VC'
  /** Venezuela */
  | 'VE'
  /** British Virgin Islands */
  | 'VG'
  /** U.S. Virgin Islands */
  | 'VI'
  /** Vietnam */
  | 'VN'
  /** Vanuatu */
  | 'VU'
  /** Wallis & Futuna */
  | 'WF'
  /** Samoa */
  | 'WS'
  /** Kosovo */
  | 'XK'
  /** Yemen */
  | 'YE'
  /** Mayotte */
  | 'YT'
  /** South Africa */
  | 'ZA'
  /** Zambia */
  | 'ZM'
  /** Zimbabwe */
  | 'ZW';

/**
 * Supported locale codes
 *
 * @public
 */
export type LocaleCode = LanguageCode | `${LanguageCode}-${CountryCode}`;

/**
 * Primary locales for each country
 *
 * @see https://github.com/osm-search/Nominatim/blob/master/settings/country_settings.yaml
 *
 * @internal
 */
export const primaryLocales: Record<CountryCode, LocaleCode> = {
  AD: 'ca-AD',
  AE: 'ar-AE',
  AF: 'fa-AF',
  AG: 'en-AG',
  AI: 'en-AI',
  AL: 'sq-AL',
  AM: 'hy-AM',
  AN: 'nl-AN',
  AO: 'pt-AO',
  AQ: 'en-AQ',
  AR: 'es-AR',
  AS: 'en-AS',
  AT: 'de-AT',
  AU: 'en-AU',
  AW: 'nl-AW',
  AX: 'sv-AX',
  AZ: 'az-AZ',
  BA: 'bs-BA',
  BB: 'en-BB',
  BD: 'bn-BD',
  BE: 'nl-BE',
  BF: 'fr-BF',
  BG: 'bg-BG',
  BH: 'ar-BH',
  BI: 'fr-BI',
  BJ: 'fr-BJ',
  BL: 'fr-BL',
  BM: 'en-BM',
  BN: 'ms-BN',
  BO: 'es-BO',
  BQ: 'nl-BQ',
  BR: 'pt-BR',
  BS: 'en-BS',
  BT: 'dz-BT',
  BV: 'no-BV',
  BW: 'en-BW',
  BY: 'be-BY',
  BZ: 'en-BZ',
  CA: 'en-CA',
  CC: 'en-CC',
  CD: 'fr-CD',
  CF: 'fr-CF',
  CG: 'fr-CG',
  CH: 'de-CH',
  CI: 'fr-CI',
  CK: 'en-CK',
  CL: 'es-CL',
  CM: 'fr-CM',
  CN: 'zh-CN',
  CO: 'es-CO',
  CR: 'es-CR',
  CU: 'es-CU',
  CV: 'pt-CV',
  CW: 'nl-CW',
  CX: 'en-CX',
  CY: 'el-CY',
  CZ: 'cs-CZ',
  DE: 'de-DE',
  DJ: 'fr-DJ',
  DK: 'da-DK',
  DM: 'en-DM',
  DO: 'es-DO',
  DZ: 'ar-DZ',
  EC: 'es-EC',
  EE: 'et-EE',
  EG: 'ar-EG',
  EH: 'ar-EH',
  ER: 'ti-ER',
  ES: 'es-ES',
  ET: 'am-ET',
  FI: 'fi-FI',
  FJ: 'en-FJ',
  FK: 'en-FK',
  FM: 'en-FM',
  FO: 'fo-FO',
  FR: 'fr-FR',
  GA: 'fr-GA',
  GB: 'en-GB',
  GD: 'en-GD',
  GE: 'ka-GE',
  GF: 'fr-GF',
  GG: 'en-GG',
  GH: 'en-GH',
  GI: 'en-GI',
  GL: 'kl-GL',
  GM: 'en-GM',
  GN: 'fr-GN',
  GP: 'fr-GP',
  GQ: 'es-GQ',
  GR: 'el-GR',
  GS: 'en-GS',
  GT: 'es-GT',
  GU: 'en-GU',
  GW: 'pt-GW',
  GY: 'en-GY',
  HK: 'zh-HK',
  HM: 'en-HM',
  HN: 'es-HN',
  HR: 'hr-HR',
  HT: 'fr-HT',
  HU: 'hu-HU',
  ID: 'id-ID',
  IE: 'en-IE',
  IL: 'he-IL',
  IM: 'en-IM',
  IN: 'hi-IN',
  IO: 'en-IO',
  IQ: 'ar-IQ',
  IR: 'fa-IR',
  IS: 'is-IS',
  IT: 'it-IT',
  JE: 'en-JE',
  JM: 'en-JM',
  JO: 'ar-JO',
  JP: 'ja-JP',
  KE: 'sw-KE',
  KG: 'ky-KG',
  KH: 'km-KH',
  KI: 'en-KI',
  KM: 'ar-KM',
  KN: 'en-KN',
  KP: 'ko-KP',
  KR: 'ko-KR',
  KW: 'ar-KW',
  KY: 'en-KY',
  KZ: 'kk-KZ',
  LA: 'lo-LA',
  LB: 'ar-LB',
  LC: 'en-LC',
  LI: 'de-LI',
  LK: 'si-LK',
  LR: 'en-LR',
  LS: 'en-LS',
  LT: 'lt-LT',
  LU: 'lb-LU',
  LV: 'lv-LV',
  LY: 'ar-LY',
  MA: 'fr-MA',
  MC: 'fr-MC',
  MD: 'ro-MD',
  ME: 'sr-ME',
  MF: 'fr-MF',
  MG: 'mg-MG',
  MH: 'en-MH',
  MK: 'mk-MK',
  ML: 'fr-ML',
  MM: 'my-MM',
  MN: 'mn-MN',
  MO: 'zh-MO',
  MP: 'ch-MP',
  MQ: 'fr-MQ',
  MR: 'ar-MR',
  MS: 'en-MS',
  MT: 'mt-MT',
  MU: 'fr-MU',
  MV: 'dv-MV',
  MW: 'en-MW',
  MX: 'es-MX',
  MY: 'ms-MY',
  MZ: 'pt-MZ',
  NA: 'en-NA',
  NC: 'fr-NC',
  NE: 'fr-NE',
  NF: 'en-NF',
  NG: 'en-NG',
  NI: 'es-NI',
  NL: 'nl-NL',
  NO: 'nb-NO',
  NP: 'ne-NP',
  NR: 'na-NR',
  NU: 'en-NU',
  NZ: 'mi-NZ',
  OM: 'ar-OM',
  PA: 'es-PA',
  PE: 'es-PE',
  PF: 'fr-PF',
  PG: 'en-PG',
  PH: 'en-PH',
  PK: 'en-PK',
  PL: 'pl-PL',
  PM: 'fr-PM',
  PN: 'en-PN',
  PR: 'es-PR',
  PS: 'ar-PS',
  PT: 'pt-PT',
  PW: 'en-PW',
  PY: 'es-PY',
  QA: 'ar-QA',
  RE: 'fr-RE',
  RO: 'ro-RO',
  RS: 'sr-RS',
  RU: 'ru-RU',
  RW: 'rw-RW',
  SA: 'ar-SA',
  SB: 'en-SB',
  SC: 'fr-SC',
  SD: 'ar-SD',
  SE: 'sv-SE',
  SG: 'zh-SG',
  SH: 'en-SH',
  SI: 'sl-SI',
  SJ: 'no-SJ',
  SK: 'sk-SK',
  SL: 'en-SL',
  SM: 'it-SM',
  SN: 'fr-SN',
  SO: 'so-SO',
  SR: 'nl-SR',
  SS: 'en-SS',
  ST: 'pt-ST',
  SV: 'es-SV',
  SX: 'nl-SX',
  SY: 'ar-SY',
  SZ: 'en-SZ',
  TC: 'en-TC',
  TD: 'fr-TD',
  TF: 'fr-TF',
  TG: 'fr-TG',
  TH: 'th-TH',
  TJ: 'tg-TJ',
  TK: 'en-TK',
  TL: 'pt-TL',
  TM: 'tk-TM',
  TN: 'ar-TN',
  TO: 'en-TO',
  TR: 'tr-TR',
  TT: 'en-TT',
  TV: 'en-TV',
  TW: 'zh-TW',
  TZ: 'sw-TZ',
  UA: 'uk-UA',
  UG: 'en-UG',
  UM: 'en-UM',
  US: 'en-US',
  UY: 'es-UY',
  UZ: 'uz-UZ',
  VA: 'it-VA',
  VC: 'en-VC',
  VE: 'es-VE',
  VG: 'en-VG',
  VI: 'en-VI',
  VN: 'vi-VN',
  VU: 'bi-VU',
  WF: 'fr-WF',
  WS: 'sm-WS',
  XK: 'sq-XK',
  YE: 'ar-YE',
  YT: 'fr-YT',
  ZA: 'en-ZA',
  ZM: 'en-ZM',
  ZW: 'en-ZW',
} as const;
