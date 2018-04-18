// _echoUniformVar3 _echoFadeMain
// _echoUniformVar3 _echoParams1 :RGB Gamma Values
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, pow ( _ioRGB.xyz, ECHOVAR3 ( _echoParams1 ) ), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = pow ( _ioRGB.xyz, ECHOVAR3 ( _echoParams1 ) );
// ECHO_END:
