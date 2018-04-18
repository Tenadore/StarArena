// Upgrade NOTE: replaced 'texRECT' with 'tex2D'

// _echoVar1 _echoNumA1
// _echoVar1 _echoNumB1
// _echoVar3 _echoNumA3
// _echoVar3 _echoNumB3
// _echoVar3 _echoNumC3
// _echoUniformVar3 _echoFadeMain
// _echoPartsCount 2
// _echoPartsCombine false

// ============================================================================
// MOBILE AVERAGE_PIXEL
// ============================================================================
// ECHO_COMMON_START0:
_echoNumA1 =  _echoScreen_TexelSize.x * 0.8;
_echoNumB1 =  _echoScreen_TexelSize.y * 0.8;

_echoNumA3 = ECHOVAR3(0,0,0);

_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x + _echoNumA1, v.tc1.y ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x - _echoNumA1, v.tc1.y ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x, v.tc1.y + _echoNumB1 ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x, v.tc1.y - _echoNumB1 ) ).xyz;

_echoNumA3 += _ioRGB.xyz;
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoNumA3 * ECHOVAR3 ( 0.20,0.20,0.20 ), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = _echoNumA3 * ECHOVAR3 ( 0.20,0.20,0.20 );
// ECHO_END:

// ============================================================================
// DESKTOP AVERAGE_PIXEL
// ============================================================================
// ECHO_COMMON_START1:
_echoNumA1 =  _echoScreen_TexelSize.x * 0.8;
_echoNumB1 =  _echoScreen_TexelSize.y * 0.8;

_echoNumA3 = ECHOVAR3(0,0,0);

_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x + _echoNumA1, v.tc1.y ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x - _echoNumA1, v.tc1.y ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x, v.tc1.y + _echoNumB1 ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x, v.tc1.y - _echoNumB1 ) ).xyz;

_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x + _echoNumA1, v.tc1.y - _echoNumB1 ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x - _echoNumA1, v.tc1.y - _echoNumB1 ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x + _echoNumA1, v.tc1.y + _echoNumB1 ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x - _echoNumA1, v.tc1.y + _echoNumB1 ) ).xyz;

_echoNumA3 += _ioRGB.xyz;
// ECHO_END:

// ECHO_FADE_START1:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoNumA3 * ECHOVAR3 ( 0.111111, 0.111111, 0.111111 ), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START1:
_ioRGB.xyz = _echoNumA3 * ECHOVAR3 ( 0.111111, 0.111111, 0.111111 );
// ECHO_END:


