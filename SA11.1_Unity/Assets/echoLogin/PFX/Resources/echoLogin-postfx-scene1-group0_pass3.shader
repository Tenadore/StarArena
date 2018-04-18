// Upgrade NOTE: replaced 'mul(UNITY_MATRIX_MVP,*)' with 'UnityObjectToClipPos(*)'

Shader "Hidden/echoLogin/PFX/echologin_postfx_scene1_group0_pass3"
{
//=========================================================================
SubShader
{
Tags { "Queue" = "Geometry" "IgnoreProjector"="True" "RenderType"="Opaque" }

Pass
{
Blend Off
ZTest Always
Cull Off
ZWrite Off
Fog { Mode Off }
Lighting Off

CGPROGRAM

#pragma vertex vert
#pragma fragment frag
#pragma exclude_renderers flash
#pragma fragmentoption ARB_precision_hint_fastest

#define PI  3.141592
#define PI2 6.283185

#define ECHOVAR1 fixed
#define ECHOVAR2 fixed2
#define ECHOVAR3 fixed3
#define ECHOVAR4 fixed4

#pragma multi_compile EL_0_ON EL_0_OFF
#pragma multi_compile EL_1_ON EL_1_OFF

float4      _echoScreenInfo;
float4 		_echoVertTime;
ECHOVAR4 	_echoFragTime;
sampler2D   _CameraDepthTexture;
sampler2D	_echoScreen;
float4		_echoScreen_ST;
ECHOVAR4	_echoScreen_TexelSize;

fixed3 _echoFadeMain_0;
fixed3 _echoParams1_0;
fixed3 _echoParams2_0;
fixed3 _echoFadeMain_1;
fixed4 _echoColorValue_1;

// =============================================
struct VertInput
{
float4 vertex	: POSITION;
float2 texcoord	: TEXCOORD0;
float4 color    : COLOR;
};

// =============================================
struct Varys
{
half4 pos		: POSITION;
half2 tc1 : TEXCOORD1;
};

// =============================================
Varys vert ( VertInput ad )
{
Varys v;

v.pos			= UnityObjectToClipPos ( ad.vertex );

v.tc1.xy  		= ( ad.texcoord.xy  * _echoScreen_ST.xy ) + _echoScreen_ST.zw;


return v;
}

// =============================================
ECHOVAR4 frag ( Varys v ):COLOR
{
half2 _echoTC = v.tc1.xy;



ECHOVAR3 _ioRGB = tex2D ( _echoScreen, _echoTC ).xyz;

fixed3 _echoNumA3;
#ifdef EL_0_ON

_ioRGB.xyz = lerp ( _ioRGB.xyz, clamp ( ( ( _ioRGB.xyz - _echoParams1_0 ) * _echoParams2_0 ) + _echoParams1_0, 0, 2 ), _echoFadeMain_0 ); 

#endif

#ifdef EL_1_ON

_ioRGB.xyz = lerp ( _ioRGB.xyz, _ioRGB.xyz * _echoColorValue_1.xyz, _echoFadeMain_1 );

#endif


return ECHOVAR4 ( _ioRGB, 1 );
}

ENDCG
}
}
}

