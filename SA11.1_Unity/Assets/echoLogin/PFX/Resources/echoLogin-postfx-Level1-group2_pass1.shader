// Upgrade NOTE: replaced 'mul(UNITY_MATRIX_MVP,*)' with 'UnityObjectToClipPos(*)'

Shader "Hidden/echoLogin/PFX/echologin_postfx_Level1_group2_pass1"
{
//=========================================================================
SubShader
{
Tags { "Queue" = "Geometry" "IgnoreProjector"="True" "RenderType"="Opaque" }

Pass
{
Blend One One
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

float4      _echoScreenInfo;
float4 		_echoVertTime;
ECHOVAR4 	_echoFragTime;
sampler2D   _CameraDepthTexture;
sampler2D	_echoScreen;
float4		_echoScreen_ST;
ECHOVAR4	_echoScreen_TexelSize;

fixed3 _echoFadeMain_0;

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

fixed _echoNumA1;
fixed _echoNumB1;
fixed3 _echoNumA3;
fixed3 _echoNumB3;
fixed3 _echoNumC3;
#ifdef EL_0_ON
_echoNumA1 =  _echoScreen_TexelSize.x * 0.8;
_echoNumB1 =  _echoScreen_TexelSize.y * 0.8;

_echoNumA3 = ECHOVAR3(0,0,0);

_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x + _echoNumA1, v.tc1.y ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x - _echoNumA1, v.tc1.y ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x, v.tc1.y + _echoNumB1 ) ).xyz;
_echoNumA3 += tex2D ( _echoScreen, ECHOVAR2 ( v.tc1.x, v.tc1.y - _echoNumB1 ) ).xyz;

_echoNumA3 += _ioRGB.xyz;

_ioRGB.xyz = lerp ( _ioRGB.xyz, _echoNumA3 * ECHOVAR3 ( 0.20,0.20,0.20 ), _echoFadeMain_0 );

#endif


return ECHOVAR4 ( _ioRGB, 1 );
}

ENDCG
}
}
}

