// _echoVar4 _echoNumA4
// _echoVar3 _echoNumA3
// _echoUniformVar3 _echoFadeMain
// _echoUniformTex _echoTexture
// _echoVaryingTexcoord _echoTexcoord
// _echoPartsCount 6
// _echoPartsCombine true

// ============================================================================
// NORMAL uses alpha channel on overlay
// ============================================================================
// ECHO_COMMON_START0:
_echoNumA4 = tex2D ( _echoTexture, _echoTexcoord );
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoNumA4.xyz, _echoFadeMain * _echoNumA4.w );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoNumA4.xyz, _echoNumA4.w );
// ECHO_END:

// ============================================================================
// ADD
// ============================================================================
// ECHO_COMMON_START1:
// ECHO_END:

// ECHO_FADE_START1:
_ioRGB.xyz 	+= lerp ( ECHOVAR3(0,0,0), tex2D ( _echoTexture, _echoTexcoord ).xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START1:
_ioRGB.xyz 	+= tex2D ( _echoTexture, _echoTexcoord ).xyz;
// ECHO_END:

// ============================================================================
// SUBTRACT
// ============================================================================
// ECHO_COMMON_START2:
// ECHO_END:

// ECHO_FADE_START2:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _ioRGB.xyz - tex2D ( _echoTexture, _echoTexcoord ).xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START2:
_ioRGB.xyz -= tex2D ( _echoTexture, _echoTexcoord ).xyz;
// ECHO_END:

// ============================================================================
// MULTIPLY
// ============================================================================
// ECHO_COMMON_START3:
// ECHO_END:

// ECHO_FADE_START3:
_ioRGB.xyz 	= lerp ( _ioRGB.xyz, _ioRGB.xyz * tex2D ( _echoTexture, _echoTexcoord ).xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START3:
_ioRGB.xyz 	= _ioRGB.xyz * tex2D ( _echoTexture, _echoTexcoord ).xyz;
// ECHO_END:

// ============================================================================
// SCREEN
// ============================================================================
// ECHO_COMMON_START4:
_echoNumA3 = tex2D ( _echoTexture, _echoTexcoord ).xyz;
// ECHO_END:

// ECHO_FADE_START4:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoNumA3.xyz + _ioRGB.xyz - _ioRGB.xyz * _echoNumA3.xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START4:
_ioRGB.xyz = _echoNumA3.xyz + _ioRGB.xyz - _ioRGB.xyz * _echoNumA3.xyz;
// ECHO_END:

// ============================================================================
// OVERLAY
// ============================================================================
// ECHO_COMMON_START5:
_echoNumA4 	= tex2D ( _echoTexture, _echoTexcoord );
_echoNumA3 	= lerp ( ECHOVAR3(2.0,2.0,2.0) * _ioRGB.xyz * _echoNumA4.xyz, ECHOVAR3(1.0,1.0,1.0) - ECHOVAR3(2.0,2.0,2.0) * ( ECHOVAR3(1.0,1.0,1.0) - _ioRGB.xyz ) * ( ECHOVAR3(1.0,1.0,1.0) - _echoNumA4.xyz ), clamp ( sign ( _ioRGB.xyz - ECHOVAR3(0.5,0.5,0.5) ), ECHOVAR3(0.0,0.0,0.0), ECHOVAR3(1.0,1.0,1.0) ) );
// ECHO_END:

// ECHO_FADE_START5:
_ioRGB.xyz 	= lerp ( _ioRGB.xyz, _echoNumA3.xyz, _echoNumA4.a * _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START5:
_ioRGB.xyz 	= lerp ( _ioRGB.xyz, _echoNumA3.xyz, _echoNumA4.a );
// ECHO_END:

