// (c) copyright echoLogin LLC 2014. All rights reserved.

using UnityEngine;
using System.Collections;

public enum ECHOPFXOPTION
{
	DISTORTION = 0, // has waves, ripples, shockwave, buldge, pintch, fisheye
	GREYSCALE,
	COLOR,       // has COLOR, ADD, MULTIPLY
	COLOR_CORRECT,
	CONTRAST,
	GAMMA,
	POSTERIZE,
	INVERSE,   	
	RGB_SEPARATE,
	LUMRAMP, 
	SCANLINES,   // horz and vert
	AVERAGE_PIXEL,
	TEXTURE,      // has normal, add, subtract, multiply, screen and overlay
	CUSTOM_FRAG,
	COUNT
};

[System.Serializable]
public class EchoPFXEffectOption
{
	public ECHOPFXOPTION  			optType;
	public int       				passOrder;
//	public float            		duration;
	public float            		delay;    	   // percent of duration
	public bool             		sustainHold;
	
	public float                    strength;
	public float                    attackTime;
	public float                    sustainTime;
	public float                    releaseTime;
//	public float           			stageMin;       // sustain start percent
//	public float           			stageMax;       // sustain end percent

	public AnimationCurve 			attackCurve;
	public AnimationCurve 			sustainCurve;
	public AnimationCurve 			releaseCurve;

	public float    				fadeCur;
	public float    				fadeMult;
	public float            		maskDissolve;
	public AnimationCurve   		maskDissolveCurve;
	public bool             		maskAnimateTime;
	public Color  					rgba;
	public float    				rgbaMultiply;
	public AnimationCurve   		rgbaCurve;
	
	public Vector4          		params1;
	public Vector4          		params2;
	public bool             		opt1;
	public bool             		opt2;
	public int              		intVal1;
	public float            		floatVal1;

	public Vector4          		overlayST;
	public Vector4          		overlayST_Scroll;  // xy = scroll amounts  zw = speed throttle
	
	public Texture2D 				tex;
	public Texture2D        		texGradient;
	public ECHOPFXBLEND 			texBlend;
	public int              		key;
	public int 						poid      	= 0;
	[System.NonSerialized] 
	public EchoPFXShaderOption     	po 			= null;
	
	private float[]             	_stageTime = new float[5] { 0,0,0,0,0 };
	private int    					_stageIndex;
	private AnimationCurve[]    	_stageCurve;
	private float               	_duration;
	private float               	_percent;
	private float               	_time;
	private float                   _startDelay;
	private float 					_segTime;
	private float 					_segDur;
	private float 					_segPer;
	private float 					_fadeCur;
	private bool                	_sustainHold;
	private float                   _fadeMax;
	private float               	_uvAdd;
	private Color[]             	_gradient;
	[System.NonSerialized] 
	private EchoPFXRenderGroup 		_erg;

	public delegate void       		fxCallback ( float ipercentdone, EchoPFXEffectOption ieeo );
	private event fxCallback   		_callback;

// only used in editor
#if UNITY_EDITOR
	public bool             		folded = false;
#endif

	//=========================================================================
	public void SetCallback ( fxCallback icallback )
	{
		_callback = icallback;
	}

	//=========================================================================
	public EchoPFXEffectOption ( ECHOPFXOPTION iopt, int ipoid )
	{
		poid 	= ipoid;
		optType = iopt;
		ResetDefaults();
	}

	//=========================================================================
	public EchoPFXEffectOption ( ECHOPFXOPTION iopt, int ipoid, EchoPFXShaderOption ieso )
	{
		poid 	= ipoid;
		optType = iopt;
		ResetDefaults(ieso);
	}

	//=========================================================================
	public void ResetDefaults( EchoPFXShaderOption ieso = null )
	{
		delay               = 0;
//		duration            = 1;
		fadeCur         	= 1;
		fadeMult            = 1.0f;
		attackTime          = 0.0f;
		sustainTime         = 1.0f;
		releaseTime         = 0.0f;
		strength            = 1.0f;
		sustainHold         = true;
		tex                 = null;
		texGradient         = null;
		opt1                = false;
		opt2                = false;
		
		attackCurve 		= AnimationCurve.Linear ( 0, 0, 1, 1 );
		sustainCurve 		= AnimationCurve.Linear ( 0, 1, 1, 1 );
		releaseCurve 		= AnimationCurve.Linear ( 0, 1, 1, 0 );
		
		rgba        		= new Color ( 1,1,1,1 );
		rgbaMultiply    	= 1.0f;
		
		rgbaCurve 			= AnimationCurve.Linear ( 0, 1, 1, 1 );
		
		maskDissolve        = 0.5f;
		maskDissolveCurve	= AnimationCurve.Linear ( 0, 0, 1, 1 );
		maskAnimateTime     = false;

		overlayST       	= new Vector4 ( 1,1,0,0 );
		overlayST_Scroll	= new Vector4 ( 0,0,0,0 );
		params1 			= new Vector4 ( 1,1,1,1 );
		params2 			= new Vector4 ( 1,1,1,1 );
		
		switch ( optType )
		{
		case ECHOPFXOPTION.DISTORTION:
			if ( ieso != null )
			{
				switch ( ieso.BlockNext(0) )
				{
				// Waves - x = # of ripples, y = speed, z = strength
				case 0:
					params1 			= new Vector4 ( 16.0f, 2.0f, 0.3f, 0 );
					params2 			= new Vector4 ( 16.0f, 2.0f, 0.3f, 0 );
					break;

				// Ripple xy = ripple center, z = size, w = distance
				case 1:
					params1 			= new Vector4 ( 0.5f, 0.5f, 32.0f, 0 );
					params2 			= new Vector4 ( 0.5f, 0.5f, 32.0f, 0 );
					break;

				// Shockwave xy = center, z = distance, w = size
				case 2:
					params1 			= new Vector4 ( 0.5f, 0.5f, 0.0f, 0.1f );
					params2 			= new Vector4 ( 0.5f, 0.5f, 0.0f, 0.1f );
					break;
					
				// Pinch xy = center, z = amount, w = unused
				case 3:
					params1 			= new Vector4 ( 0.5f, 0.5f, 0.03f, 0.0f );
					params2 			= new Vector4 ( 0.5f, 0.5f, 0.03f, 0.0f );
					break;

				// Buldge xy = center, z = amount, w = unused
				case 4:
					params1 			= new Vector4 ( 0.5f, 0.5f, 0.04f, 0.0f );
					params2 			= new Vector4 ( 0.5f, 0.5f, 0.04f, 0.0f );
					break;
					
				// FISHEYE xy = center, z = aperature, w = unused
				case 5:
					params1 			= new Vector4 ( 0.5f, 0.5f, 170.0f, 0.0f );
					params2 			= new Vector4 ( 0.5f, 0.5f, 170.0f, 0.0f );
					break;

				// VORTEX params1: xy = center, z = radius, z = angle, params2 = xy = width/height
				case 6:
					params1 			= new Vector4 ( 0.5f, 0.5f, 180.0f * Mathf.Deg2Rad, 0.0f );
					params2 			= new Vector4 ( 0.5f, 0.5f, 0.0f, 0.0f );
					break;
				}
			}
			else
			{
				params1 			= new Vector4 ( 0.5f, 0.5f, 0.5f, 0 );
				params2 			= new Vector4 ( 0.5f, 0.5f, 0.5f, 0 );
			}
			
			break;
			
		case ECHOPFXOPTION.GREYSCALE:
			break;
			
		case ECHOPFXOPTION.COLOR:
			break;
			
		case ECHOPFXOPTION.COLOR_CORRECT:
			break;
			
		case ECHOPFXOPTION.CONTRAST:
			params1 			= new Vector4 ( 2.0f, 2.0f, 2.0f, 1 );
			params2 			= new Vector4 ( 0.75f, 0.75f, 0.75f, 1 );
			break;
			
		case ECHOPFXOPTION.GAMMA:
			params1 			= new Vector4 ( 0.5f, 0.5f, 0.5f, 1 );
			params2 			= new Vector4 ( 0.5f, 0.5f, 0.5f, 1 );
			break;
			
		case ECHOPFXOPTION.POSTERIZE:
			params1 			= new Vector4 ( 8, 8, 8, 1 );
			break;
			
		case ECHOPFXOPTION.INVERSE:   	
			break;
			
		case ECHOPFXOPTION.RGB_SEPARATE:
			params1 			= new Vector4 ( 0,0,0,0 );
			params2 			= new Vector4 ( 0,0,0,0 );
			break;
			
		case ECHOPFXOPTION.LUMRAMP: 
			break;
			
		case ECHOPFXOPTION.SCANLINES:   
			params1 			= new Vector4 ( 2,0,2,0 );
			opt1                = true;
			opt2                = true;
			break;
			
		case ECHOPFXOPTION.AVERAGE_PIXEL:
			break;
			
		case ECHOPFXOPTION.TEXTURE:      
			break;
			
		case ECHOPFXOPTION.CUSTOM_FRAG:
			break;
		}
	}
	
	//=========================================================================
	public void Start ( float iscale = 1.0f )
	{
		_duration = ( attackTime + sustainTime + releaseTime ) * iscale;

		_stageTime[0]  = 0;
		_stageTime[1]  = attackTime;                   // fadein end
		_stageTime[2]  = _stageTime[1] + sustainTime;  // sustain end
		_stageTime[3]  = _stageTime[2] + releaseTime;  // fade out end
		_stageTime[4]  = _duration;
		
		_sustainHold 		= sustainHold;
		_stageIndex			= -1;
		_time 				= 0;
		_startDelay         = delay;
		_fadeMax            = 1.0f;
		oldIndex            = -1;
		
		for ( int loop = 1; loop < 4; loop ++ )
		{
			if ( _stageTime[loop] > 0.0001f )
			{
				_stageIndex = loop-1;
				break;
			}
		}
	}

	//=========================================================================
	public void Stop()
	{
		_sustainHold 	= false;
		_time 		 	= _stageTime[2];
		oldIndex 		= _stageIndex  	= 2;
		_segDur  		= _stageTime[_stageIndex+1] - _stageTime[_stageIndex];
		_segTime 		= 0;
		
		_fadeMax     	= _fadeCur;
	}

	public int newIndex;
	public int oldIndex;

	//=========================================================================
	public int Process()
	{
		if ( _startDelay > 0 )
		{
			_startDelay-=Time.deltaTime;
			return (0);
		}
		
		if ( _stageIndex < 0 )
			return (0);
		
		_percent = _time / _duration;

		newIndex = _stageIndex;
		
		if ( _sustainHold == false || ( _stageIndex != 1 && _sustainHold == true ) )
		{
			while ( _time >= _stageTime[newIndex+1] )
			{
				if ( newIndex >= 2 )
				{
					_stageIndex = -1;
					return(-1);
				}
				
				newIndex++;
			}
		}

		_time += Time.deltaTime;
		
		if ( oldIndex != newIndex )
		{
			_stageIndex = oldIndex = newIndex;
			_segDur  	= _stageTime[_stageIndex+1] - _stageTime[_stageIndex];
			_segTime 	= 0;
		}

		_segTime   	+= Time.deltaTime;
		_segPer 	= _segTime / _segDur; 
		
		_fadeCur = Mathf.Lerp ( 0.0f, _fadeMax, _stageCurve[newIndex].Evaluate ( Mathf.Clamp ( _segPer, 0, 1 ) ) );
		fadeCur  = _fadeCur * strength;
		
		if ( overlayST_Scroll != new Vector4 ( 0,0,0,0 ) )
		{
			overlayST.z += ( ( ( overlayST_Scroll.x * EchoPFXManager.globalFPS ) * overlayST_Scroll.z ) * Time.deltaTime );
			overlayST.w += ( ( ( overlayST_Scroll.y * EchoPFXManager.globalFPS ) * overlayST_Scroll.w ) * Time.deltaTime );

			if ( overlayST.z > 1.0f )
				overlayST.z -= (float)( Mathf.Floor ( overlayST.z ) );

			if ( overlayST.z < 0.0f )
				overlayST.z -= (float)( Mathf.Floor ( overlayST.z ) );

			if ( overlayST.w > 1.0f )
				overlayST.w -= (float)( Mathf.Floor ( overlayST.w ) );
			
			if ( overlayST.w < 0.0f )
				overlayST.w -= (float)( Mathf.Floor ( overlayST.w ) );
		}

		// repeat when sustain hold == true;
		if ( _sustainHold && _stageIndex == 1 && _segPer >= 1.0f )
		{
			_time -= _segTime;
			_segTime   	= 0;
		}

		if ( optType == ECHOPFXOPTION.DISTORTION && po.BlockNext(0) == 2 )
		{
			params1.z = Mathf.Lerp ( 0.0f, 1.0f, _percent );
		}

		if ( optType == ECHOPFXOPTION.COLOR && _duration > 0.0f )
		{
			rgba = _gradient[ (int)(Mathf.Lerp ( 0.0f, (float)_gradient.Length-1, Mathf.Clamp ( _percent, 0.0f, 1.0f ) ) ) ] ;
		}

		if ( maskAnimateTime && _duration > 0.0f )
		{
			maskDissolve = _percent;
		}

		if ( _callback != null )
			_callback ( _percent, this );

		return ( 1 );
	}
	
	//=========================================================================
	public void ValidateInput()
	{
		key = ( poid << 8 ) + (int)optType;
	
		if ( _stageTime == null )
		{
			_stageTime 			= new float[5];
			_stageTime[0]       = 0;
			_stageTime[1]       = 0;
			_stageTime[2]       = 0;
			_stageTime[3]       = 0;
			_stageTime[4]       = 0;
		}

		if ( _stageCurve == null )
		{
			_stageCurve          = new AnimationCurve[3];
			_stageCurve[0] 		= attackCurve;
			_stageCurve[1] 		= sustainCurve;
			_stageCurve[2] 		= releaseCurve;
		}
		
		if ( optType == ECHOPFXOPTION.COLOR && Application.isPlaying )
		{
			if ( texGradient != null )
			{
				Color[] colors;
				float time;
				int addy;
				
				colors = texGradient.GetPixels();
				
				if ( colors != null && colors.Length > 1 )
				{
					_gradient = new Color[texGradient.width];
					
					for ( int loop = 0; loop < texGradient.width; loop++ )
					{
						time = (float)loop / ( (float)texGradient.width - 1.0f );
						addy = (int)( (float)( texGradient.height - 1 ) * rgbaCurve.Evaluate ( time ) );
						_gradient[loop] = colors[loop+(int)(texGradient.width * addy )];
					}
				}
			}
			else
			{
				_gradient 		= new Color[2];
				_gradient[0] 	= rgba;
				_gradient[1] 	= rgba;
			}
		}
		
		if ( delay < 0.0f )
			delay = 0;

		if ( rgbaMultiply < 0.0f )
			rgbaMultiply = 0.0f;
		
		if ( rgbaMultiply > 8.0f )
			rgbaMultiply = 8;
	}

};

