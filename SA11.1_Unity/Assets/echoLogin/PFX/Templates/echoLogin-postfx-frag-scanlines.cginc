// _echoVar1 _echoNumA1
// _echoUniformVar3 _echoFadeMain
// _echoUniformVar3 _echoFadeMultiply
// _echoUniformVar4 _echoParams1 : x=LineCountH, y=LineScrollH, z=LineCountV, w=LineScrollV
// _echoPartsCount 2
// _echoPartsCombine true

// ECHO_COMMON_START0:
_echoNumA1 = clamp ( sin ( _echoFragTime.y * _echoParams1.y + ( v.tc1.y * PI2 * _echoParams1.x ) ) + 0.5, 0, 2 );
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz *= lerp ( ECHOVAR3 ( 1, 1, 1 ), ECHOVAR3 ( _echoNumA1, _echoNumA1, _echoNumA1 ), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz *= ECHOVAR3 ( _echoNumA1, _echoNumA1, _echoNumA1 );
// ECHO_END:

// ECHO_COMMON_START1:
_echoNumA1 = clamp ( sin ( _echoFragTime.y * _echoParams1.w + ( v.tc1.x * PI2 * _echoParams1.z ) ) + 0.5, 0, 2 );
// ECHO_END:

// ECHO_FADE_START1:
_ioRGB.xyz *= lerp ( ECHOVAR3(1,1,1), ECHOVAR3 ( _echoNumA1, _echoNumA1, _echoNumA1 ), _echoFadeMain * _echoFadeMultiply );
// ECHO_END:

// ECHO_NOFADE_START1:
_ioRGB.xyz *= ECHOVAR3 ( _echoNumA1, _echoNumA1, _echoNumA1 );
// ECHO_END:

