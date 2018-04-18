// (c) copyright echoLogin LLC 2014. All rights reserved.
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public enum ECHOPFXMATHS
{
	DIRECT,
	ADD,
	MULTIPLY,
	AVERAGE
};

public enum ECHOPFXPROPTYPE
{
	FADEMAIN = 0,
	FADEMULTIPLY,
	COLORVALUE,
	PARAM1,
	PARAM2,
	TEXTURE,
	TEXTURE_ST,
	MASK,
	MASK_DISSOLVE,
	COUNT
};

//-----------------------------------------------------------------------------
public class EchoMaterialVariable
{
	private static Vector4  _vec4_one =new Vector4(1,1,1,1);
	private static Vector4  _vec4_zero =new Vector4(0,0,0,0);
	public string   		name;
	public bool             active;
	public int      		numType;
	public float 			floatVal;
	public Vector4 			vec4Val;
	public float 			floatVal_hold;
	public float            clampMin;
	public float            clampMax;
	public Vector4 			vec4Val_hold;
	public Texture  		texVal;
	public Texture  		texVal_hold;
	public int      		propID;
	public float            avgStart;
	private ECHOPFXMATHS    _mathBlend = ECHOPFXMATHS.DIRECT;
	public bool             test;

	//=========================================================================
	public EchoMaterialVariable ( string ipname, ECHOPFXMATHS imaths, int inumtype, float iclampMin, float iclampMax )
	{
		name    	= ipname;
		_mathBlend 	= imaths;
		numType 	= inumtype;
		clampMin    = iclampMin;
		clampMax    = iclampMax;

		test = false;

		Reset();

		floatVal_hold 	= floatVal + 99;
		vec4Val_hold.x 	= vec4Val.x + 99;
		texVal_hold 	= null;

		propID = Shader.PropertyToID ( ipname.Trim() );
	}

	//=========================================================================
	public void ForceUpdate()
	{
		active  		= true;
		vec4Val_hold.x 	= -vec4Val.x;
		floatVal_hold 	= -floatVal_hold;
		texVal_hold 	= null;
	}

	//=========================================================================
	public void Reset()
	{
		active  	= false;
		texVal_hold = null;

		switch ( _mathBlend )
		{
		case ECHOPFXMATHS.DIRECT:
			break;

		case ECHOPFXMATHS.ADD:
			vec4Val 	= _vec4_zero;
			floatVal 	= 0;
			break;

		case ECHOPFXMATHS.AVERAGE:
			vec4Val 	= _vec4_zero;
			floatVal 	= 0;
			avgStart 	= 1.0f;
			break;

		case ECHOPFXMATHS.MULTIPLY:
			vec4Val 	= _vec4_one;
			floatVal 	= 1;
			break;
		}
	}
	
	//=========================================================================
	public void SetValue ( float ival, float ioptFadeVal )
	{
		active  = true;

		switch ( _mathBlend )
		{
		case ECHOPFXMATHS.DIRECT:
			floatVal = ival;
			break;
			
		case ECHOPFXMATHS.ADD:
			floatVal += ( ival * ioptFadeVal );
			break;

			// vql1 = val1 + val2 * 0.5
		case ECHOPFXMATHS.AVERAGE:
			//floatVal = ( floatVal + ival ) * avgStart;

			floatVal = ( floatVal + ( ival * ioptFadeVal ) ) * avgStart * ( 1.0f - ioptFadeVal );

			avgStart = 0.5f;
			break;
			
		case ECHOPFXMATHS.MULTIPLY:
			floatVal *= ival;
			break;
		}
	}
	
	//=========================================================================
	public void SetValue ( Vector4 ivec4, float ioptFadeVal )
	{
		active  = true;

		switch ( _mathBlend )
		{
		case ECHOPFXMATHS.DIRECT:
			vec4Val = ivec4;
			break;
			
		case ECHOPFXMATHS.ADD:
			vec4Val += ( ivec4 * ioptFadeVal );
			break;
			
		case ECHOPFXMATHS.AVERAGE:
			vec4Val = ( vec4Val + ivec4 ) * avgStart;
			//vec4Val = ( vec4Val + ( ivec4 * ioptFadeVal ) ) * avgStart;
			avgStart = 0.5f;
			break;
			
		case ECHOPFXMATHS.MULTIPLY:
			vec4Val.x *= ivec4.x;
			vec4Val.y *= ivec4.y;
			vec4Val.z *= ivec4.z;
			vec4Val.w *= ivec4.w;
			break;
		}
	}

	//=========================================================================
	public void SetValue ( Texture2D itex )
	{
		active = true;
		texVal = itex;
	}
}

//-----------------------------------------------------------------------------
public class EchoShaderPropertyBlock
{
	private EchoMaterialVariable[] _evars = new EchoMaterialVariable[(int)ECHOPFXPROPTYPE.COUNT];

	//=========================================================================
	public EchoShaderPropertyBlock()
	{
	}
	
	//=========================================================================
	public void SetOrder ( int iorder, int ifadeindex, ECHOPFXMATHS imaths )
	{
		string name;
		
		for ( int loop = 0; loop < (int)ECHOPFXPROPTYPE.COUNT; loop++ )
		{
			switch ( (ECHOPFXPROPTYPE)loop )
			{
			case ECHOPFXPROPTYPE.FADEMAIN:
				name = "_echoFadeMain_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, ECHOPFXMATHS.ADD, 1, 0.0f, 1.0f );
				break;
				
			case ECHOPFXPROPTYPE.FADEMULTIPLY:
				name = "_echoFadeMultiply_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, ECHOPFXMATHS.AVERAGE, 1, 0.0f, 2.0f );
				break;
				
			case ECHOPFXPROPTYPE.COLORVALUE:
				name = "_echoColorValue_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, imaths, 1, 0.0f, 2.0f );
				break;
				
			case ECHOPFXPROPTYPE.PARAM1:
				name = "_echoParams1_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, imaths, 1, -1024.0f, 1024.0f );
				break;
				
			case ECHOPFXPROPTYPE.PARAM2:
				name = "_echoParams2_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, imaths, 1, -1024.0f, 1024.0f  );
				break;

			case ECHOPFXPROPTYPE.TEXTURE:
				name = "_echoTexture_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, ECHOPFXMATHS.DIRECT, 2, 0, 1 );
				break;

			case ECHOPFXPROPTYPE.TEXTURE_ST:
				name = "_echoTexture_" + iorder + "_TO";
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name,  ECHOPFXMATHS.DIRECT, 1, 0.0f, 1.0f );
				break;
				
			case ECHOPFXPROPTYPE.MASK:
				name = "_echoMaskTex_" + ifadeindex;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, ECHOPFXMATHS.DIRECT, 2, 0, 1 );
				break;

			case ECHOPFXPROPTYPE.MASK_DISSOLVE:
				name = "_echoMaskMix_" + iorder;
				name = name.Trim();
				_evars[loop] = new EchoMaterialVariable ( name, ECHOPFXMATHS.ADD, 0, 0.0f, 1.0f );
				break;
			}
		}
	}
	
	//=========================================================================
	public float SetFade ( float ifade, float ifademult = 1.0f )
	{
		EchoMaterialVariable emv = _evars[(int)ECHOPFXPROPTYPE.FADEMAIN];

		emv.SetValue ( new Vector4( ifade, ifade, ifade, 1 ), 1.0f );
		
		_evars[(int)ECHOPFXPROPTYPE.FADEMULTIPLY].SetValue ( new Vector4( ifademult, ifademult, ifademult, 1 ), 1.0f );
		
		return ( emv.vec4Val.x + emv.vec4Val.y + emv.vec4Val.z );
	}
	
	//=========================================================================
	public void SetColor ( Color icolor, float ioptFadeVal = 1.0f )
	{
		_evars[(int)ECHOPFXPROPTYPE.COLORVALUE].SetValue ( icolor, ioptFadeVal );
		_evars[(int)ECHOPFXPROPTYPE.COLORVALUE].test = true;
	}

	//=========================================================================
	public void SetParam1 ( Vector4 ivec4, float ioptFadeVal = 1.0f )
	{
		_evars[(int)ECHOPFXPROPTYPE.PARAM1].SetValue ( ivec4, ioptFadeVal );
	}

	//=========================================================================
	public void SetParam2 ( Vector4 ivec4, float ioptFadeVal = 1.0f )
	{
		_evars[(int)ECHOPFXPROPTYPE.PARAM2].SetValue ( ivec4, ioptFadeVal );
	}

	//=========================================================================
	public void SetTexture ( Texture2D itex )
	{
		_evars[(int)ECHOPFXPROPTYPE.TEXTURE].SetValue ( itex );
	}

	//=========================================================================
	public void SetMask ( Texture2D itex )
	{
		_evars[(int)ECHOPFXPROPTYPE.MASK].SetValue ( itex );
	}

	//=========================================================================
	public void SetMaskMix ( float imix )
	{
		_evars[(int)ECHOPFXPROPTYPE.MASK_DISSOLVE].SetValue ( imix, 1.0f );
	}

	//=========================================================================
	public void SetTexture ( Texture2D itex, Vector4 itexst )
	{
		_evars[(int)ECHOPFXPROPTYPE.TEXTURE].SetValue ( itex );
		_evars[(int)ECHOPFXPROPTYPE.TEXTURE_ST].SetValue ( itexst, 1.0f );
	}

	//=========================================================================
	public void Submit2Shader ( Material imat )
	{
		int loop;
		EchoMaterialVariable evar;
		
		for ( loop = 0; loop < _evars.Length; loop++ )
		{
			evar = _evars[loop];
			
			if ( evar.active == false )
				continue;
			
			evar.active = false;
			
			switch ( evar.numType )
			{
			case 0:
				if ( evar.floatVal != evar.floatVal_hold )
				{
#if UNITY_4_0 || UNITY_4_0_1 || UNITY_4_1 || UNITY_4_2 || UNITY_3_5_7 || UNITY_3_5_6
					imat.SetFloat ( evar.name, evar.floatVal );
#else
					imat.SetFloat ( evar.propID, evar.floatVal );
#endif
					evar.floatVal_hold = evar.floatVal;
				}
				break;

			case 1:
				if ( evar.vec4Val.x != evar.vec4Val_hold.x || evar.vec4Val.y != evar.vec4Val_hold.y || evar.vec4Val.z != evar.vec4Val_hold.z || evar.vec4Val.w != evar.vec4Val_hold.w )
				{
#if UNITY_4_0 || UNITY_4_0_1 || UNITY_4_1 || UNITY_4_2 || UNITY_3_5_7 || UNITY_3_5_6
					imat.SetColor ( evar.name, evar.vec4Val );
#else
					imat.SetColor ( evar.propID, evar.vec4Val );
#endif
					evar.vec4Val_hold = evar.vec4Val;
				}
				break;

			case 2:
				if ( evar.texVal != evar.texVal_hold )
				{
#if UNITY_4_0 || UNITY_4_0_1 || UNITY_4_1 || UNITY_4_2 || UNITY_3_5_7 || UNITY_3_5_6
					imat.SetTexture ( evar.name, evar.texVal );
#else
					imat.SetTexture ( evar.propID, evar.texVal );
#endif
					evar.texVal_hold = evar.texVal;
				}
				break;
			}

			evar.Reset();
		}
	}

	//=========================================================================
	public void ForceUpdate()
	{
		for ( int loop = 0; loop < (int)ECHOPFXPROPTYPE.COUNT; loop++ )
		{
			_evars[loop].ForceUpdate();
		}
	}

	//=========================================================================
	public void Reset()
	{
		for ( int loop = 0; loop < (int)ECHOPFXPROPTYPE.COUNT; loop++ )
		{
			_evars[loop].Reset();
		}
	}
}

//=========================================================================
public class EchoPFXShaderProperties
{
	EchoShaderPropertyBlock[] espFullList;
	EchoList<EchoShaderPropertyBlock> espList;
	private Dictionary< int, EchoShaderPropertyBlock > 	_myDict = new Dictionary< int, EchoShaderPropertyBlock >();
	public Material passMaterial;
	
	//=========================================================================
	public EchoPFXShaderProperties ( List<EchoPFXShaderOption> ipolist, Material imat )
	{
		int index;
		int key;

		passMaterial = imat;

		espFullList = new EchoShaderPropertyBlock[ipolist.Count];

		for ( index = 0; index < ipolist.Count; index++ )
		{
			espFullList[index] = new EchoShaderPropertyBlock();
			espFullList[index].SetOrder ( (int)ipolist[index].order, ipolist[index].fadeMaskIndex, ipolist[index].maths );
			key = (ipolist[index].id<<8) + (int)ipolist[index].type;
			_myDict.Add ( key, espFullList[index] );
		}

		espList = new EchoList<EchoShaderPropertyBlock>(espFullList);
	}
	
	//=========================================================================
	public float SetFade ( int ikey, float ifade, float ifademult = 1.0f )
	{
		float fadeVal;
		
		EchoShaderPropertyBlock espb = _myDict[ikey];
		
		fadeVal = espb.SetFade ( ifade, ifademult );
		
		espList.Activate ( espb );
		
		return ( fadeVal );
	}
	
	//=========================================================================
	public void SetColor ( int ikey, Color icolor, float ioptFadeVal )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];

		espb.SetColor ( icolor );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void SetParams ( int ikey, Vector4 iparam1 )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];
		
		espb.SetParam1 ( iparam1 );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void SetParams ( int ikey, Vector4 iparam1, Vector4 iparam2 )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];

		espb.SetParam1 ( iparam1 );
		espb.SetParam2 ( iparam2 );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void SetTexture ( int ikey, Texture2D itex )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];
		
		espb.SetTexture ( itex );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void SetMask ( int ikey, Texture2D itex )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];
		
		espb.SetMask ( itex );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void SetMaskMix ( int ikey, float imix )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];
		
		espb.SetMaskMix ( imix );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void SetTexture ( int ikey, Texture2D itex, Vector4 itexst )
	{
		EchoShaderPropertyBlock espb = _myDict[ikey];
		
		espb.SetTexture ( itex, itexst );
		
		espList.Activate ( espb );
	}

	//=========================================================================
	public void Submit2Shader()
	{
		EchoShaderPropertyBlock espb;
		EchoShaderPropertyBlock espbNext;
		
		for ( espb = espList.GetFirstActive(); espb != null; espb = espbNext )
		{
			espbNext = espList.GetNext ( espb ); 
			
			espb.Submit2Shader(passMaterial);

			espList.Deactivate ( espb );
		}
	}

	//=========================================================================
	public void ForceUpdate()
	{
		if ( espFullList != null )
		{
			for ( int index = 0; index < espFullList.Length; index++ )
			{
				espFullList[index].ForceUpdate();
				espList.Activate ( espFullList[index] );
			}
		}
	}
}

