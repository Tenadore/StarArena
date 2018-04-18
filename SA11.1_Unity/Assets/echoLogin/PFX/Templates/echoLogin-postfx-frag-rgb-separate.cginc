// _echoVar2 _echoNumA2
// _echoVar3 _echoNumA3
// _echoUniformVar3 _echoFadeMain
// _echoUniformVar3 _echoParams1 : X Amount
// _echoUniformVar3 _echoParams2 : Y Amount
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
_echoNumA2.x = v.tc1.x + _echoParams1.r;
_echoNumA2.y = v.tc1.y + _echoParams2.r;
_echoNumA3.r = tex2D ( _echoScreen, _echoNumA2 ).r;

_echoNumA2.x = v.tc1.x + _echoParams1.g;
_echoNumA2.y = v.tc1.y + _echoParams2.g;
_echoNumA3.g = tex2D ( _echoScreen, _echoNumA2 ).g;

_echoNumA2.x = v.tc1.x + _echoParams1.b;
_echoNumA2.y = v.tc1.y + _echoParams2.b;
_echoNumA3.b = tex2D ( _echoScreen, _echoNumA2 ).b;
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB = lerp ( _ioRGB.xyz, _echoNumA3, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB = _echoNumA3;
// ECHO_END:
