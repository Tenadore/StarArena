// _echoVar3 _echoNumA3
// _echoUniformVar3 _echoFadeMain
// _echoUniformVar4 _echoColorValue
// _echoPartsCount 5
// _echoPartsCombine false

// ============================================================================
// NORMAL
// ============================================================================
// ECHO_COMMON_START0:
// ECHO_END:

// ECHO_FADE_START0:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoColorValue.xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START0:
_ioRGB.xyz = _echoColorValue.xyz;
// ECHO_END:


// ============================================================================
// ADD/SUBTRACT
// ============================================================================
// ECHO_COMMON_START1:
// ECHO_END:

// ECHO_FADE_START1:
_ioRGB.xyz += _echoColorValue.xyz * _echoFadeMain;
// ECHO_END:

// ECHO_NOFADE_START1:
_ioRGB.xyz += _echoColorValue.xyz;
// ECHO_END:

// ============================================================================
// MULTIPLY
// ============================================================================
// ECHO_COMMON_START2:
// ECHO_END:

// ECHO_FADE_START2:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _ioRGB.xyz * _echoColorValue.xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START2:
_ioRGB.xyz *= _echoColorValue.xyz;
// ECHO_END:

// ============================================================================
// SCREEN
// ============================================================================
// ECHO_COMMON_START3:
// ECHO_END:

// ECHO_FADE_START3:
_ioRGB.xyz = lerp ( _ioRGB.xyz, _ioRGB.xyz = _echoColorValue.xyz + _ioRGB.xyz - _ioRGB.xyz * _echoColorValue.xyz, _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START3:
_ioRGB.xyz = _echoColorValue.xyz + _ioRGB.xyz - _ioRGB.xyz * _echoColorValue.xyz;
// ECHO_END:

// ============================================================================
// OVERLAY
// ============================================================================
// ECHO_COMMON_START4:
_echoNumA3 	= lerp ( ECHOVAR3(2.0,2.0,2.0) * _ioRGB.xyz * _echoColorValue.xyz, ECHOVAR3(1.0,1.0,1.0) - ECHOVAR3(2.0,2.0,2.0) * ( ECHOVAR3(1.0,1.0,1.0) - _ioRGB.xyz ) * ( ECHOVAR3(1.0,1.0,1.0) - _echoColorValue.xyz ), clamp ( sign ( _ioRGB.xyz - ECHOVAR3(0.5,0.5,0.5) ), ECHOVAR3(0.0,0.0,0.0), ECHOVAR3(1.0,1.0,1.0) ) );
// ECHO_END:

// ECHO_FADE_START4:
_ioRGB.xyz 	= lerp ( _ioRGB.xyz, _echoNumA3.xyz, _echoColorValue.a * _echoFadeMain );
// ECHO_END:

// ECHO_NOFADE_START4:
_ioRGB.xyz 	= lerp ( _ioRGB.xyz, _echoNumA3.xyz, _echoColorValue.a );
// ECHO_END:
