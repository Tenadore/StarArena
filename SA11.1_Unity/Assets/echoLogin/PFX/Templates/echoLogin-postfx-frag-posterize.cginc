// _echoVar3 _echoNumA3
// _echoUniformVar3 _echoFadeMain
// _echoUniformVar3 _echoParams1 : Color Counts
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
_echoNumA3 = floor ( _ioRGB.xyz * _echoParams1 );
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB, _echoNumA3 / _echoParams1, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = _echoNumA3 / _echoParams1;
// ECHO_END:
