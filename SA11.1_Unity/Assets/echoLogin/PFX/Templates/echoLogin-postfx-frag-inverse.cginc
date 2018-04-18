// _echoUniformVar3 _echoFadeMain
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, ( ECHOVAR3(1,1,1) - _ioRGB.xyz), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = ECHOVAR3(1,1,1) - _ioRGB.xyz;
// ECHO_END:

