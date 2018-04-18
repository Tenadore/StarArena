// _echoUniformVar3 _echoFadeMain
// _echoUniformVar3 _echoParams1 : Constrast RGB
// _echoUniformVar3 _echoParams2 : Contrast Midpoint
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, clamp ( ( ( _ioRGB.xyz - _echoParams1 ) * _echoParams2 ) + _echoParams1, 0, 2 ), _echoFadeMain ); 
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = clamp ( ( _ioRGB.xyz - _echoParams1 * _echoParams2 ) + _echoParams1, 0, 2 ); 
// ECHO_END:
