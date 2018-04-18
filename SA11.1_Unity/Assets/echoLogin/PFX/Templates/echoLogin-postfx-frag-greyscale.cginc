// _echoVar1 _echoNumA1
// _echoUniformVar3 _echoFadeMain
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
_echoNumA1 = ( _ioRGB.x + _ioRGB.y + _ioRGB.z ) * 0.33333;
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, ECHOVAR3 ( _echoNumA1, _echoNumA1, _echoNumA1 ), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = ECHOVAR3 ( _echoNumA1, _echoNumA1, _echoNumA1 );
// ECHO_END:
