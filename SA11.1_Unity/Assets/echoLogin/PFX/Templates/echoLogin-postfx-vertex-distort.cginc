// _echoVar1 _echoNumA1
// _echoVar1 _echoNumB1
// _echoVar1 _echoNumC1
// _echoVar1 _echoNumD1
// _echoVar2 _echoNumA2
// _echoVar2 _echoNumB2
// _echoUniformVar3 _echoFadeMain
// _echoUniformVar4 _echoParams1
// _echoUniformVar4 _echoParams2
// _echoVaryingTexcoord _echoTexcoord
// _echoPartsCount 7
// _echoPartsCombine false

// ============================================================================
// Waves - x = # of ripples, y = speed, z = strength
// ============================================================================
// ECHO_COMMON_START0:
// ECHO_END:

// ECHO_FADE_START0:
_echoNumA1 =  sin ( ( _echoParams2.x * ad.texcoord.y - ( _echoVertTime.y * _echoParams2.y ) ) ) * _echoParams2.z * _echoFadeMain.x;
_echoNumB1 =  sin ( ( _echoParams1.x * ad.texcoord.x - ( _echoVertTime.y * _echoParams1.y ) ) ) * _echoParams1.z * _echoFadeMain.y;
_echoTexcoord += float2 ( _echoNumA1, _echoNumB1 );
// ECHO_END:

// ECHO_NOFADE_START0:
_echoNumA1 =  sin ( ( _echoParams2.x * ad.texcoord.y - ( _echoVertTime.y * _echoParams2.y ) ) ) * _echoParams2.z;
_echoNumB1 =  sin ( ( _echoParams1.x * ad.texcoord.x - ( _echoVertTime.y * _echoParams1.y ) ) ) * _echoParams1.z;
_echoTexcoord += float2 ( _echoNumA1, _echoNumB1 );
// ECHO_END:

// ============================================================================
// Ripple xy = ripple center, z = size, w = distance
// ============================================================================
// ECHO_COMMON_START1:
_echoNumA1 = 1.0 - ( distance ( ad.texcoord.xy, _echoParams1.xy ) * 2.0 );
// ECHO_END:

// ECHO_FADE_START1:
_echoNumB1 = sin ( length ( _echoNumA1 ) * _echoParams1.z - _echoParams1.w * _echoVertTime.y ) * ( 0.05 * _echoNumA1 );
_echoTexcoord += float2 ( _echoNumB1 * _echoFadeMain.x, _echoNumB1 * _echoFadeMain.y );
// ECHO_END:

// ECHO_NOFADE_START1:
_echoNumB1 = sin ( length ( _echoNumA1 ) * _echoParams1.z - _echoParams1.w * _echoVertTime.y ) * ( 0.05 * _echoNumA1 );
_echoTexcoord += float2 ( _echoNumB1, _echoNumB1 );
// ECHO_END:

// ============================================================================
// Shockwave xy = center, z = distance, w = size
// ============================================================================
// ECHO_COMMON_START2:
_echoNumA2 = ad.texcoord.xy;
_echoNumA2.x *= _echoScreenInfo.z;
_echoNumB2 = _echoParams1.xy;
_echoNumB2.x *= _echoScreenInfo.z;
_echoNumA1 = distance ( _echoNumA2, _echoNumB2 );
// ECHO_END:

// ECHO_FADE_START2:
if ( _echoNumA1 > 0.0 && _echoNumA1 < _echoParams1.z && _echoNumA1 > ( _echoParams1.z - _echoParams1.w ) )
{
	_echoNumB1 		= _echoNumA1 - _echoParams1.z;
	_echoNumC1 	 	= _echoNumB1 * ( 1.0 - pow ( abs ( _echoNumB1 * 16.0 ), 0.8 ) );
	_echoNumD1      = normalize ( ad.texcoord.xy - _echoParams1.xy );
	_echoNumA2      = (  clamp ( _echoNumD1 * _echoNumC1,-1, 1 ) ) * _echoFadeMain.xy;
	_echoTexcoord += _echoNumA2;
}
// ECHO_END:

// ECHO_NOFADE_START2:
if ( _echoNumA1 > 0.0 && _echoNumA1 < _echoParams1.z && _echoNumA1 > ( _echoParams1.z - _echoParams1.w ) )
{
	_echoNumB1 		= _echoNumA1 - _echoParams1.z;
	_echoNumC1 	 	= _echoNumB1 * ( 1.0 - pow ( abs ( _echoNumB1 * 8.0 ), 0.8 ) );
	_echoNumD1      = normalize ( ad.texcoord.xy - _echoParams1.xy );
	_echoTexcoord += (  clamp ( _echoNumD1 * _echoNumC1,-1, 1 ) );
}
// ECHO_END:

// ============================================================================
// Pinch xy = center, z = amount, w = unused
// ============================================================================
// ECHO_COMMON_START3:
	_echoNumA2 = _echoParams1.xy - ad.texcoord.xy;
// ECHO_END:

// ECHO_FADE_START3:
	_echoTexcoord += ( clamp ( _echoParams1.z * log ( length ( _echoNumA2 ) ) * normalize ( _echoNumA2 ), -1, 1 ) * _echoFadeMain.xy );
// ECHO_END:

// ECHO_NOFADE_START3:
	_echoTexcoord += clamp ( _echoParams1.z * log ( length ( _echoNumA2 ) ) * normalize ( _echoNumA2 ), -1, 1 );
// ECHO_END:

// ============================================================================
// Buldge xy = center, z = amount, w = unused
// ============================================================================
// ECHO_COMMON_START4:
	_echoNumA2 = _echoParams1.xy - ad.texcoord.xy;
// ECHO_END:

// ECHO_FADE_START4:
	_echoTexcoord -= ( clamp ( _echoParams1.z * log ( length ( _echoNumA2 ) ) * normalize ( _echoNumA2 ), -1, 1 ) * _echoFadeMain.xy );
// ECHO_END:

// ECHO_NOFADE_START4:
	_echoTexcoord -= clamp ( _echoParams1.z * log ( length ( _echoNumA2 ) ) * normalize ( _echoNumA2 ), -1, 1 );
// ECHO_END:

// ============================================================================
// FISHEYE xy = center, z = aperature, w = unused
// ============================================================================
// ECHO_COMMON_START5:
	_echoNumA1 = sin ( 0.5 * _echoParams1.z * ( PI / 180.0 ) );
	_echoNumA2 = ECHOVAR2 ( 2, 2 ) * ( v.tc1.xy - _echoParams1.xy );

	_echoNumB1 = length ( _echoNumA2 * _echoNumA1 );
    _echoNumC1 = atan2 ( _echoNumB1, sqrt ( 1.0 - _echoNumB1 * _echoNumB1 ) ) / PI;
    _echoNumD1 = atan2 ( _echoNumA2.y, _echoNumA2.x );
    
    _echoNumB2.x = _echoNumC1 * cos ( _echoNumD1 ) + _echoParams1.x - v.tc1.x;
    _echoNumB2.y = _echoNumC1 * sin ( _echoNumD1 ) + _echoParams1.y - v.tc1.y;
// ECHO_END:

// ECHO_FADE_START5:
	_echoTexcoord += ( _echoNumB2 * _echoFadeMain.xy );
// ECHO_END:

// ECHO_NOFADE_START5:
	_echoTexcoord += _echoNumB2;
// ECHO_END:


// center, radius, angle

// ============================================================================
// VORTEX param1 = xy = center z = angle
//        param2 = xy radius (h/w)
// ============================================================================
// ECHO_COMMON_START6:
	_echoNumA2 = ad.texcoord.xy - _echoParams1.xy;
	_echoNumA1 = 1.0 - length ( _echoNumA2 / _echoParams2.xy );
	_echoNumA1 = max ( 0, _echoNumA1 );
	_echoNumA1 = _echoNumA1 * _echoNumA1 * _echoParams1.z;

	sincos ( _echoNumA1, _echoNumB1, _echoNumC1 );
	
	_echoNumB2.x = ( _echoNumC1 * _echoNumA2[0] - _echoNumB1 * _echoNumA2[1] ) + _echoParams1.x;
	_echoNumB2.y = ( _echoNumB1 * _echoNumA2[0] + _echoNumC1 * _echoNumA2[1] ) + _echoParams1.y;
	_echoNumB2 -= ad.texcoord.xy;
// ECHO_END:

// ECHO_FADE_START6:
	_echoTexcoord += ( _echoNumB2 * _echoFadeMain.xy );
// ECHO_END:

// ECHO_NOFADE_START6:
	_echoTexcoord += _echoNumB2;
// ECHO_END:
