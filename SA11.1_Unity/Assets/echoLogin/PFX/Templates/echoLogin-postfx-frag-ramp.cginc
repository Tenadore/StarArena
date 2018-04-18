// _echoVar1 _echoNumA1
// _echoUniformVar3 _echoFadeMain
// _echoUniformTex _echoTexture
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_COMMON_START0:
_echoNumA1 	= ( _ioRGB.r + _ioRGB.g + _ioRGB.b ) * 0.43;
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz 		= lerp ( _ioRGB.xyz, tex2D ( _echoTexture, ECHOVAR2 ( _echoNumA1, _echoNumA1 ) ).xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz 		= tex2D ( _echoTexture, ECHOVAR2 ( _echoNumA1, _echoNumA1 ) ).xyz;
// ECHO_END:
