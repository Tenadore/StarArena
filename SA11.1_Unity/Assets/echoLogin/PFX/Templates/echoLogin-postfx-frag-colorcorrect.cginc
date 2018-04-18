// _echoUniformTex _echoTexture
// _echoUniformVar3 _echoFadeMain
// _echoPartsCount 1
// _echoPartsCombine false

// ECHO_FADE_START0:
_ioRGB = lerp ( _ioRGB, ECHOVAR3 ( tex2D ( _echoTexture, _ioRGB.xx ).x, tex2D ( _echoTexture, _ioRGB.yy ).y, tex2D ( _echoTexture, _ioRGB.zz ).z ), _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB = ECHOVAR3 ( tex2D ( _echoTexture, _ioRGB.xx ).x, tex2D ( _echoTexture, _ioRGB.yy ).y, tex2D ( _echoTexture, _ioRGB.zz ).z );
// ECHO_END:



