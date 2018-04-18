// (c) copyright echoLogin LLC 2014. All rights reserved.

using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public enum ECHOPFXSCANLINES
{
	HORIZONTAL = 0,
	VERTICAL,
	BOTH
};

public enum ECHOPFXALPHA
{
	ALPHA_OFF = 0,
	ALPHA_ON,
};

public enum ECHOPFXBLEND
{
	NORMAL = 0,
	ADD,
	SUBTRACT,
	MULTIPLY,
	SCREEN,
	TRANSPARENT,
};

public enum ECHORTADJUST
{
	DEVICE_SIZE = 0,
	DIVIDE,
	AUTO_DETAIL,
	CUSTOM
};

public enum ECHOPRECISION
{
	FIXED = 0,
	HALF,
	FLOAT
};

public enum ECHOPFXFADETYPE
{
	DEFAULT = 0,
	ALWAYS_1,
	FASTER_WHEN_1
};

//-----------------------------------------------------------------------------
[System.Serializable]
public class EchoPFXRenderGroup 
{
	public string           		name;
	public int                      passCount;
	public bool 					active;
	public int   					meshCellWidth    		= 16;
	public int   					meshCellHeight   		= 16;
	public ECHORTADJUST 			rtAdjustSize        	= ECHORTADJUST.DEVICE_SIZE;
	public bool                     rtAutoDetailManual      = false;
	public int   					rtAdjustWidth  			= 0;
	public int   					rtAdjustHeight 			= 0;
	public FilterMode[] 			rtFilterMode   			= new FilterMode[4] { FilterMode.Point, FilterMode.Point, FilterMode.Point, FilterMode.Point };
	public ECHOPFXBLEND[] 			rtBlendMode        		= new ECHOPFXBLEND[4] { ECHOPFXBLEND.NORMAL, ECHOPFXBLEND.NORMAL, ECHOPFXBLEND.NORMAL, ECHOPFXBLEND.SCREEN };
	public TextureWrapMode[]        rtWrapMode            	= new TextureWrapMode[2] { TextureWrapMode.Clamp,TextureWrapMode.Clamp };
	public List<EchoPFXEffect> 		epeList             	= new List<EchoPFXEffect>();
	public float                    autoDetailMin       	= 0.5f;
	public int                    	autoDetailLevels    	= 3;
	public float                    autoDetailFudge     	= 0.5f;
	public float 					autoDetailChangeTime	= 0.25f;
	public ECHOPRECISION[]          precision            	= new ECHOPRECISION[4] { ECHOPRECISION.FIXED, ECHOPRECISION.FIXED, ECHOPRECISION.FIXED, ECHOPRECISION.FIXED };
	public ECHOPFXALPHA[]           alphaFlag           	= new ECHOPFXALPHA[4] { ECHOPFXALPHA.ALPHA_OFF,ECHOPFXALPHA.ALPHA_OFF,ECHOPFXALPHA.ALPHA_OFF,ECHOPFXALPHA.ALPHA_OFF };

	public List<EchoPFXShaderOption> 		possibleOpts1 	= new List<EchoPFXShaderOption>();
	public List<EchoPFXShaderOption> 		possibleOpts2 	= new List<EchoPFXShaderOption>();
	public List<EchoPFXShaderOption> 		possibleOpts3 	= new List<EchoPFXShaderOption>();
	public List<EchoPFXShaderOption> 		possibleOpts4 	= new List<EchoPFXShaderOption>();
	[System.NonSerialized] 
	public EchoList<EchoPFXEffect> 			epeEchoList;
	public List<Camera>     				cameraList      = new List<Camera>();
	public float                            renderOrder;
	public int[]                    		texCoordCount			= new int[4] { 1, 1, 1, 1 };  

	[System.NonSerialized] 
	public EchoPFXRenderGroup       ergNext             	= null;
	[System.NonSerialized] 
	public EchoPFXRenderTexture   	ergNextRenTex;

	private int[]                   _passSort               = null;
	private int  					_autoDetailFrame 		= 0;
	private int 					_autoDetailChange 		= 0;
	private float 					_autoDetailTime 		= 0.25f;
	private int 					_autoDetailTargetTime	= 0;
	private int[]                   _autoDetailChangeCount;

	[System.NonSerialized] 
	private EchoPFXRenderTexture[]	 	_renTex;
	[System.NonSerialized] 
	private EchoPFXRenderTexture[]	 	_autoTexPass1;
	[System.NonSerialized] 
	private EchoPFXRenderTexture[]	 	_autoTexPass2;
	[System.NonSerialized] 
	private EchoPFXRenderTexture[][]	_autoTex;
	[System.NonSerialized] 
	private List<EchoPFXShaderOption>[] _possibleOpts;

	private Mesh             			_mesh;
//	private Color32[]					_meshColor;
	private string[][]     				_finalKeywords;
	private int[][] 					_finalKeyFlags;	
	private int[][] 					_prevKeyFlags;	
	[System.NonSerialized] 
	private EchoPFXShaderProperties[] 	_echoShaderPropertys;
#if !UNITY_4_0 && !UNITY_4_0_1 && !UNITY_4_1 && !UNITY_4_2 && !UNITY_3_5_7 && !UNITY_3_5_6
	private int                     	_mainTexID;
#endif
	private EchoPFXUnityFreeCamSetRect[] _camScripts;
	private EchoPFXUnityFreeCamCopy 	_copyScript;
	private bool                    	_has2ndPass = false;
	private float[]                 	_fadeVals = new float[(int)ECHOPFXOPTION.COUNT];
	private List<EchoPFXMask>[]     	_masks;          
	private string[][][]   				_keywords;
	private float                   	_texelX;
	private float                   	_texelY;
	private bool[]                  	_passActive;
	private int[]                   	_passUse;
	private bool                    	_copyPending;
	
	//=========================================================================
	public EchoPFXRenderGroup ()
	{
		_copyPending = false;
	}

	//=========================================================================
	public EchoPFXRenderGroup ( int irenorder )
	{
		name = "RenderGroup:"+irenorder;
		_copyPending = false;
	}

	//=========================================================================
	public void SetCopyPending ( bool iflag )
	{
		_copyPending = iflag;
		
		if ( cameraList.Count > 0 )
			_copyPending = true;
	}

	//=========================================================================
	public void Render( Transform icamtrans )
	{
		int 					index;
		bool 					flag;
		string[]        		finalKeywords;
		EchoPFXEffect 			epe;
		EchoPFXEffect 			epeNext;
		EchoPFXEffectOption   	epo;
		EchoPFXShaderProperties esp;
		EchoPFXShaderOption     po;
		int                     pass;
		int                     sourcePass = 0;
		
		ergNextRenTex   = null;
		
		if ( ergNext != null )
		{
			ergNext.SetCopyPending ( false );
			ergNextRenTex 	= ergNext._renTex[0];
		}

		_passActive[0] = false;
		_passActive[1] = false;
		_passActive[2] = false;
		_passActive[3] = false;
		
		_passUse[0] = 0;
		_passUse[1] = 0;
		_passUse[2] = 0;
		_passUse[3] = 0;
		
		for ( epe = epeEchoList.GetFirstActive(); epe != null; epe = epeEchoList.GetNext(epe) )
		{
			if ( epe.passActive[0] )
				_passActive[0] = true;
			
			if ( epe.passActive[1] )
				_passActive[1] = true;
			
			if ( epe.passActive[2] )
				_passActive[2] = true;
			
			if ( epe.passActive[3] )
				_passActive[3] = true;
		}
		
		if ( _passActive[3] )
			_passActive[1] = true;
		
		if ( ( !_passActive[0] && !_passActive[1] ) && _copyPending == true )
		{
			_passUse[0] = 2;
		}

		if ( ( _passActive[0] || _passActive[3] ) && _copyPending == true )
		{
			_passUse[0] = 1;
			
			if ( ! _passActive[1] )
				_passUse[0] = 2;
		}
		
		if ( _passActive[1] && _copyPending == true )
		{
			_passUse[1] = 1;
			
			if ( _passUse[0] == 0 )
				_passUse[1] = 2;
		}
		
		if ( ergNext != null )
		{
			if ( _passActive[2] )
				_passUse[2] = 1;
	
			if ( _passActive[3] )
				_passUse[3] = 1;
		}

		GL.PushMatrix();
        GL.LoadOrtho();

		for ( int lpass = 0; lpass < passCount; lpass++ )
		{
			pass = _passSort[lpass];
			
			if ( _passUse[pass] == 0 )
				continue;

			sourcePass = 0;

			switch ( pass )
			{
			case 0:    // pass1
				//_has2ndPass = true;
				if ( _passUse[0] == 1 )
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[0], _renTex[1], pass, (int)renderOrder, _has2ndPass );
				else
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[0], null, pass, (int)renderOrder, _has2ndPass );
				break;

			case 1:    // pass2
				if ( _passUse[1] == 1 )
				{
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[1], null, pass, (int)renderOrder, _has2ndPass );
					sourcePass = 1;
				}
				else
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[0], null, pass, (int)renderOrder, _has2ndPass );
				break;

			case 2:    // pass3
				ergNext.SetCopyPending ( true );
				
				if ( ergNext.cameraList.Count < 1 )
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[0], ergNextRenTex, pass, (int)renderOrder, _has2ndPass, true );
				else
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[0], ergNextRenTex, pass, (int)renderOrder, _has2ndPass, false );
				break;

			case 3:    // pass4
				ergNext.SetCopyPending ( true );
				sourcePass = 1;
				if ( _passUse[2] == 0 && ergNext != null && ergNext.cameraList.Count < 1 )
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[1], ergNextRenTex, pass, (int)renderOrder, _has2ndPass, true );
				else
					EchoPFXRenderTexture.SetRenderTarget ( _renTex[1], ergNextRenTex, pass, (int)renderOrder, _has2ndPass, false );
				break;
			}
			
			esp = _echoShaderPropertys[pass];
			//esp.Reset();

			Array.Copy ( _finalKeyFlags[pass], _prevKeyFlags[pass], _finalKeyFlags[pass].Length );
			Array.Clear ( _finalKeyFlags[pass], 0, _finalKeyFlags[pass].Length );
			Array.Clear ( _fadeVals, 0, _fadeVals.Length );
			
			for ( epe = epeEchoList.GetFirstActive(); epe != null; epe = epeNext )
			{
				epeNext = epeEchoList.GetNext(epe);

				if ( epe.passActive[pass])
				{
					for ( index = 0; index < epe.passOpt[pass].Count; index++ )
					{
						epo     = epe.passOpt[pass][index];

						switch ( epo.Process() )
						{
						case -1:
							epe.optionsOff++;
							if ( epe.optionsOff >= epe.optionsTotal )
							{
								epeEchoList.Deactivate ( epe );
							}
							break;

						case 0:
							break;

						default:
							// should index into order of passopts
							_finalKeyFlags[pass][epo.passOrder] = _finalKeyFlags[pass][epo.passOrder] | 1;

							if ( epo.po.fadeType != ECHOPFXFADETYPE.ALWAYS_1 )
								_fadeVals[(int)epo.po.order] = esp.SetFade ( epo.key, epo.fadeCur, epo.fadeMult );
														
							if ( epo.po.fadeMask != null )
							{
								esp.SetMask ( epo.key, epo.po.fadeMask );
								
								if ( epo.po.fadeMaskDissolve )
								{
									esp.SetMaskMix ( epo.key, 1.0f - ( ( ( epo.maskDissolveCurve.Evaluate ( epo.maskDissolve ) - 0.5f ) * 2.004f ) + 0.5f ) );
								}
							}

							switch ( epo.optType )
							{
							case ECHOPFXOPTION.GREYSCALE:
								break;
								
							case ECHOPFXOPTION.INVERSE:
								break;
								
							case ECHOPFXOPTION.COLOR:
								esp.SetColor ( epo.key, epo.rgba * epo.rgbaMultiply, epo.fadeCur );
								break;

							case ECHOPFXOPTION.CONTRAST:
								esp.SetParams ( epo.key, epo.params1, epo.params2 );
								break;

							case ECHOPFXOPTION.RGB_SEPARATE:
								esp.SetParams ( epo.key, new Vector4 ( epo.params1.x * _texelX, epo.params1.y * _texelX ,epo.params1.z * _texelX, 1.0f  ), new Vector4 ( epo.params2.x * _texelY, epo.params2.y * _texelY ,epo.params2.z * _texelY, 1.0f  ) );
								break;

							case ECHOPFXOPTION.POSTERIZE:
								esp.SetParams ( epo.key, epo.params1 );
								break;

							case ECHOPFXOPTION.GAMMA:
								esp.SetParams ( epo.key, new Vector4 ( 1.0f/epo.params1.x, 1.0f/epo.params1.y, 1.0f/epo.params1.z, 0.0f ) );
								break;

								// amount speed strength
								//speed amount strength
							case ECHOPFXOPTION.DISTORTION:
								switch ( epo.po.BlockNext(0) )
								{
									// WAVES
								case 0:
									esp.SetParams ( epo.key, 
												new Vector4 ( epo.params1.x, epo.params1.y, ( 1.0f / (float)meshCellWidth ) * epo.params1.z, epo.params1.w ),
												new Vector4 ( epo.params2.x, epo.params2.y, ( 1.0f / (float)meshCellHeight ) * epo.params2.z, epo.params2.w ) );
									break;
									// RIPPLE
								case 1:
									esp.SetParams ( epo.key, epo.params1 );
									break;
									//SHOCKWAVE
								case 2:
									esp.SetParams ( epo.key, epo.params1 );
									break;
								//PINCH
								case 3:
									esp.SetParams ( epo.key, epo.params1 );
									break;
								//BULGE
								case 4:
									esp.SetParams ( epo.key, epo.params1 );
									break;
								//FISHEYE
								case 5:
									esp.SetParams ( epo.key, epo.params1 );
									break;
								//VORTEX
								case 6:
									esp.SetParams ( epo.key, epo.params1, epo.params2 );
									break;
								}
								break;
								
								// amount h, scroll h, amoutn v , scroll v
							case ECHOPFXOPTION.SCANLINES:
								if ( epo.opt1 )
								{
									if ( epo.opt2 )
										esp.SetParams ( epo.key, new Vector4 ( (float)Screen.height / epo.params1.x, epo.params1.y, (float)Screen.width / epo.params1.z, epo.params1.w ) ); 
									else
										esp.SetParams ( epo.key, new Vector4 ( (float)Screen.height / epo.params1.x, epo.params1.y, epo.params1.z, epo.params1.w ) ); 
								}
								else
								{
									if ( epo.opt2 )
										esp.SetParams ( epo.key, new Vector4 ( epo.params1.x, epo.params1.y, (float)Screen.width / epo.params1.z, epo.params1.w ) ); 
									else
										esp.SetParams ( epo.key, epo.params1 ); 
								}
								break;
								
							case ECHOPFXOPTION.LUMRAMP:     
								esp.SetTexture ( epo.key, epo.tex );
								break;
								
							case ECHOPFXOPTION.COLOR_CORRECT:   
								esp.SetTexture ( epo.key, epo.tex );
								break;
								
							case ECHOPFXOPTION.TEXTURE:
								esp.SetTexture ( epo.key, epo.tex, epo.overlayST );
								break;
								
							case ECHOPFXOPTION.CUSTOM_FRAG:
								if ( epo.tex != null )
								{
									esp.SetTexture ( epo.key, epo.tex, epo.overlayST );
								}
								
								esp.SetColor ( epo.key, epo.rgba * epo.rgbaMultiply, epo.fadeCur );
								esp.SetParams ( epo.key, epo.params1 ); 
								esp.SetParams ( epo.key, epo.params2 ); 
								break;
							}
							break;
						}
					}
				}
			}
			
			esp.Submit2Shader();
			finalKeywords 	= _finalKeywords[pass];

#if UNITY_3_5
			flag = true;
#else
			flag = false;
#endif			

			for ( index = 0; index < _possibleOpts[pass].Count; index++ )
			{
				po = _possibleOpts[pass][index];
				
				if ( _fadeVals[(int)po.order] <= 0 )
					_finalKeyFlags[pass][index] = 0;
				
				if ( po.fadeType == ECHOPFXFADETYPE.FASTER_WHEN_1 && _fadeVals[(int)po.order] >= 3.0 )
					_finalKeyFlags[pass][index] = 2;

				if ( po.fadeType != ECHOPFXFADETYPE.ALWAYS_1 )
					finalKeywords[index] = _keywords[pass][(int)_possibleOpts[pass][index].order][ _finalKeyFlags[pass][index] ];

#if !UNITY_3_5
				if ( _finalKeyFlags[pass][index] != _prevKeyFlags[pass][index] )
				{
					flag = true;
				}
#endif
			}

			
			if ( flag )
			{
#if UNITY_3_5
				for ( index = 0; index < finalKeywords.Length; index++ )
				{
					Shader.EnableKeyword ( finalKeywords[index] );
				}
#else
				_echoShaderPropertys[pass].passMaterial.shaderKeywords = finalKeywords;
#endif
			}

#if UNITY_4_0 || UNITY_4_0_1 || UNITY_4_1 || UNITY_4_2 || UNITY_3_5_7 || UNITY_3_5_6
			_echoShaderPropertys[pass].passMaterial.SetTexture ( "_echoScreen", _renTex[sourcePass].texture );
#else
			_echoShaderPropertys[pass].passMaterial.SetTexture ( _mainTexID, _renTex[sourcePass].texture );
#endif
			_echoShaderPropertys[pass].passMaterial.SetPass(0);

			Graphics.DrawMeshNow ( _mesh, icamtrans.position, icamtrans.rotation );

			EchoPFXRenderTexture.PostCleanup();
			
			
#if UNITY_3_5
			if ( flag )
			{
				for ( index = 0; index < finalKeywords.Length; index++ )
				{
					Shader.DisableKeyword ( finalKeywords[index] );
				}
			}
#endif
		}

		GL.PopMatrix();

		_renTex[0].DiscardContents();
		
		if ( _has2ndPass )
			_renTex[1].DiscardContents();
	}
		
	//=========================================================================
	public void PrepareForRuntime ( float ifps, EchoPFXRenderGroup inext, Camera[] iallCams )
	{
		int 				loop;
		int 				pass;
		int                 lpass;
		EchoPFXEffect       epe;
		string 				shaderName;

		_passActive = new bool[4];
		_passActive[0] = false;
		_passActive[1] = false;
		_passActive[2] = false;
		_passActive[3] = false;

		_passUse = new int[4];
		_passUse[0] = 0;
		_passUse[1] = 0;
		_passUse[2] = 0;
		_passUse[3] = 0;

		_texelX = 1.0f / (float)Screen.width;
		_texelY = 1.0f / (float)Screen.height;

		ValidateOptions();

		for ( pass = 0; pass < 4; pass++ )
		{
			for ( loop = 0; loop < _possibleOpts[pass].Count; loop++ )
			{
				_possibleOpts[pass][loop].order = loop;
			}
		}
		
		if ( _fadeVals == null )
			_fadeVals = new float[(int)ECHOPFXOPTION.COUNT];

#if !UNITY_4_0 && !UNITY_4_0_1 && !UNITY_4_1 && !UNITY_4_2 && !UNITY_3_5_7 && !UNITY_3_5_6
		_mainTexID = Shader.PropertyToID ("_echoScreen");
#endif

		ergNext 		= inext;

		_autoDetailTargetTime = (int)( ( 1.0f / ( (float)ifps - autoDetailFudge ) ) * 10000.0f );

		// hold the final shader keywords
		_finalKeywords 		= new string[4][];
		_finalKeywords[0] 	= new string[ possibleOpts1.Count ];
		_finalKeywords[1] 	= new string[ possibleOpts2.Count ];
		_finalKeywords[2] 	= new string[ possibleOpts3.Count ];
		_finalKeywords[3] 	= new string[ possibleOpts4.Count ];

		// used to accumulate the effects that are in use
		_finalKeyFlags = new int[4][];
		_finalKeyFlags[0] 	= new int[ possibleOpts1.Count ];
		_finalKeyFlags[1] 	= new int[ possibleOpts2.Count ];
		_finalKeyFlags[2] 	= new int[ possibleOpts3.Count ];
		_finalKeyFlags[3] 	= new int[ possibleOpts4.Count ];

		// used to compare if anything has changed from last frame
		_prevKeyFlags = new int[4][];
		_prevKeyFlags[0] 	= new int[ possibleOpts1.Count ];
		_prevKeyFlags[1] 	= new int[ possibleOpts2.Count ];
		_prevKeyFlags[2] 	= new int[ possibleOpts3.Count ];
		_prevKeyFlags[3] 	= new int[ possibleOpts4.Count ];

		// re-link efect options to thier possible option
		for ( loop = 0; loop < epeList.Count; loop++ )
		{
			epeList[loop].LinkPossibleOpts ( _possibleOpts );
		}
		
		if ( iallCams != null )
		{
			for ( loop = 0; loop < iallCams.Length; loop++ )
			{
				if ( (int)iallCams[loop].depth == renderOrder )
				{
					if ( !cameraList.Contains ( iallCams[loop] ) )
						cameraList.Add ( iallCams[loop] );
				}
			}
		}
		
		CreateMesh();
		
		_copyPending = false;
		
		if ( cameraList.Count > 0 )
			_copyPending = true;

		_echoShaderPropertys = new EchoPFXShaderProperties[4];

		_keywords = new string[4][][];

		for ( lpass = 0; lpass < passCount; lpass++ )
		{
			pass = _passSort[lpass];
			
			shaderName = "Hidden/echoLogin/PFX/echologin_postfx_" + Application.loadedLevelName + "_group" + renderOrder + "_pass" + (pass+1);
			
			Shader shd = Shader.Find ( shaderName );
			
#if UNITY_EDITOR
			if ( shd == null )
				Debug.LogError ("*** Compilation of Post FX Shaders are Required! ***");
#endif
			_echoShaderPropertys[pass] = new EchoPFXShaderProperties ( _possibleOpts[pass], new Material ( shd ) );
			
			_keywords[pass] = new string[_possibleOpts[pass].Count][];
		
			for ( loop = 0; loop < _possibleOpts[pass].Count; loop++ )
			{
				_keywords[pass][loop] = new string[3];
				
				_keywords[pass][loop][0] = "EL_" + loop + "_OFF";
				_keywords[pass][loop][0]= _keywords[pass][loop][0].Trim();
					
				_keywords[pass][loop][1] = "EL_" + loop + "_ON";
				_keywords[pass][loop][1]= _keywords[pass][loop][1].Trim();
	
				_keywords[pass][loop][2] = "EL_" + loop + "_FAST";
				_keywords[pass][loop][2]= _keywords[pass][loop][2].Trim();
			}
		}

		_renTex = new EchoPFXRenderTexture[2];

		//if (!EchoPFXManager.unityPro )
		//	rtAdjustSize = ECHORTADJUST.DEVICE_SIZE;



		epeEchoList = new EchoList<EchoPFXEffect>(epeList);

		for ( loop = 0; loop < epeList.Count; loop++ )
		{
			epe = epeList[loop];

			if ( epe.active )
			{
				epe.Start ();
				epeEchoList.Activate ( epe );
			}
		}
	}

	//=========================================================================
	public void AllocRenderTextures()
	{
		int 	screenWidth;
		int 	screenHeight;
		int 	loop;
		float   per;

		// Find Render Tex Size
		switch ( rtAdjustSize )
		{
		case ECHORTADJUST.AUTO_DETAIL:
			screenWidth		= Screen.width;
			screenHeight 	= Screen.height;
			
			_autoTexPass1 			= new  EchoPFXRenderTexture[autoDetailLevels];
			_autoTexPass1[0] 		= new EchoPFXRenderTexture ( screenWidth, screenHeight, 16, rtFilterMode[0], rtWrapMode[0] );
			
			for ( loop = 1; loop < autoDetailLevels; loop++ )
			{
				per = Mathf.Lerp ( 1.0f, autoDetailMin, ( (float)loop / (float)( autoDetailLevels - 1 ) ) );
				_autoTexPass1[loop] 	= new EchoPFXRenderTexture ( (int)( (float)screenWidth * per), (int)( (float)screenHeight * per ), 16, rtFilterMode[0], rtWrapMode[0] );
			}
			
			if ( passCount > 1 )
			{
				_autoTexPass2 		= new EchoPFXRenderTexture[autoDetailLevels];
				_autoTexPass2[0] 	= new EchoPFXRenderTexture ( screenWidth, screenHeight, 0, rtFilterMode[0], rtWrapMode[0] );
				
				for ( loop = 1; loop < autoDetailLevels; loop++ )
				{
					per = Mathf.Lerp ( 1.0f, autoDetailMin, ( (float)loop / (float)( autoDetailLevels - 1 ) ) );
					_autoTexPass2[loop] = new EchoPFXRenderTexture ( (int)( (float)screenWidth * per), (int)( (float)screenHeight * per ), 0, rtFilterMode[0], rtWrapMode[0] );
				}
			}
			
			_autoTex = new EchoPFXRenderTexture[2][];
			_autoTex[0] = _autoTexPass1;
			_autoTex[1] = _autoTexPass2;
			break;
			
		case ECHORTADJUST.DIVIDE:
			screenWidth		= Screen.width / rtAdjustWidth;
			screenHeight 	= Screen.height / rtAdjustHeight;
			break;
			
		case ECHORTADJUST.CUSTOM:
			screenWidth		= rtAdjustWidth;
			screenHeight 	= rtAdjustHeight;
			break;
			
		default:
		case ECHORTADJUST.DEVICE_SIZE:
			screenWidth		= Screen.width;
			screenHeight 	= Screen.height;
			break;
		}
		
		if ( screenWidth < 4 )
			screenWidth = 4;
		
		if ( screenHeight < 4 )
			screenHeight = 4;
		
		if ( rtAdjustSize == ECHORTADJUST.AUTO_DETAIL )
		{
			_renTex[0] = _autoTexPass1[0];
			
			if ( passCount > 1 )
				_renTex[1] = _autoTexPass2[0];
		}
		else
		{
			_renTex[0] = new EchoPFXRenderTexture ( screenWidth, screenHeight, 16, rtFilterMode[0], rtWrapMode[0] );
			
			if ( _has2ndPass )
				_renTex[1] = new EchoPFXRenderTexture ( screenWidth, screenHeight, 0, rtFilterMode[1], rtWrapMode[1] );
		}

		_renTex[0].SetCamerasRenderTarget ( cameraList );
		
		if ( !SystemInfo.supportsRenderTextures )
		{
			if ( cameraList.Count > 0 )
			{
				_copyScript 			= cameraList[cameraList.Count-1].gameObject.AddComponent<EchoPFXUnityFreeCamCopy>();
				_copyScript.echoRenTex 	= _renTex[0];
				
				_camScripts = new EchoPFXUnityFreeCamSetRect[cameraList.Count];
				
				for ( loop = 0; loop < cameraList.Count; loop++ )
				{
					_camScripts[loop] 				= cameraList[loop].gameObject.AddComponent<EchoPFXUnityFreeCamSetRect>();
					_camScripts[loop].echoRenTex 	= _renTex[0];
				}
			}
		}
	}

	//=========================================================================
	public void ForceShaderPropertyUpdate()
	{
		if ( _passSort == null || _echoShaderPropertys == null )
			return;

		for ( int loop = 0; loop < passCount; loop++ )
		{
			_echoShaderPropertys[_passSort[loop]].ForceUpdate();
		}
	}

	//=========================================================================
	public void SortPossibleOpts ( List<EchoPFXShaderOption> ipoList )
	{
		EchoPFXShaderOption po;
		
		for ( int loop = 0; loop < ipoList.Count; loop++ )
		{
			po = ipoList[loop];
			
			if ( po.orderTop )
			{
				po.order = -( (int)ECHOPFXOPTION.COUNT -  (int)( po.type + 1 ) );
				po.order += (float)po.id / 100.0f;
			}
		}
		
		ipoList.Sort ( delegate ( EchoPFXShaderOption e1, EchoPFXShaderOption e2 ) 
	    {
			return ( e1.order.CompareTo ( e2.order ) );
		});
		
		for ( int loop = 0; loop < ipoList.Count; loop++ )
		{
			ipoList[loop].order = loop;
		}
	}

	//=========================================================================
	public void SortCameraList()
	{
		if ( cameraList == null || cameraList.Count < 1 )
			return;

		for ( int n = cameraList.Count-1; n >= 0; n-- )
		{
			if ( cameraList[n] == null )
				cameraList.Remove ( cameraList[n] );
		}

		cameraList.Sort ( delegate ( Camera e1, Camera e2 ) 
		{
			return ( e1.depth.CompareTo ( e2.depth ) );
		});
			
		for ( int n = 0; n < cameraList.Count; n++ )
		{
			cameraList[n].depth = renderOrder + ( (float)n * 0.01f );
		}
	}

	//=========================================================================
	public void AddCamera ( Camera icam )
	{
	// SCOTTFIND
		if ( icam == null )
			return;
		
		if ( !cameraList.Contains ( icam ) )
		{
			cameraList.Add ( icam );
		}
		
		_renTex[0].SetCamerasRenderTarget ( cameraList );
	}
	
	//=========================================================================
	public void SetAutoDetail()
	{
		if ( rtAdjustSize != ECHORTADJUST.AUTO_DETAIL || _autoDetailChange < 1 )
			return;
		
		if ( rtAdjustSize == ECHORTADJUST.AUTO_DETAIL )
		{
			_renTex[0] = _autoTexPass1[_autoDetailFrame];
			_renTex[0].DiscardContents();
			
			if ( passCount > 1 )
			{
				_renTex[1] = _autoTexPass2[_autoDetailFrame];
				_renTex[1].DiscardContents();
			}
		}

		if ( !SystemInfo.supportsRenderTextures )
		{
			_copyScript.echoRenTex = _renTex[0];
			for ( int loop = 0; loop < cameraList.Count; loop++ )
			{
				if ( cameraList[loop].enabled )
				{
					_camScripts[loop].echoRenTex 	= _renTex[0];
					cameraList[loop].pixelRect = _renTex[0].GetScreenRect();
				}
			}
		}
		else
			_renTex[0].SetCamerasRenderTarget ( cameraList );
	}

	//=========================================================================
	public void RemoveOptionOfType ( ECHOPFXOPTION iopt, int ipass, int iid )
	{
		for ( int loop = 0; loop < epeList.Count; loop++ )
		{
			epeList[loop].RemoveOptionOfType ( iopt, ipass, iid );
		}
	}

	//=========================================================================
	public int PassOrder ( int index )
	{
		return ( _passSort[index] );
	}
	
	//=========================================================================
	public void ValidateOptions()
	{
		int loop;
		int n;
		List<EchoPFXMask> maskList = new List<EchoPFXMask>();
		
		_has2ndPass = false;

		if ( rtWrapMode.Length < 1 )
		{
			rtWrapMode 		= new TextureWrapMode[2];
			rtWrapMode[0] 	= TextureWrapMode.Clamp;
			rtWrapMode[1] 	= TextureWrapMode.Clamp;
		}
		
		if ( alphaFlag.Length < 1 )
		{
			alphaFlag 	 = new ECHOPFXALPHA[4];
			alphaFlag[0] = ECHOPFXALPHA.ALPHA_OFF;
			alphaFlag[1] = ECHOPFXALPHA.ALPHA_OFF;
			alphaFlag[2] = ECHOPFXALPHA.ALPHA_OFF;
			alphaFlag[3] = ECHOPFXALPHA.ALPHA_OFF;
		}
		
		if ( precision.Length < 1 )
		{
			precision 	 = new ECHOPRECISION[4];
			precision[0] = ECHOPRECISION.FIXED;
			precision[1] = ECHOPRECISION.FIXED;
			precision[2] = ECHOPRECISION.FIXED;
			precision[3] = ECHOPRECISION.FIXED;
		}

		SortPossibleOpts ( possibleOpts1 );
		SortPossibleOpts ( possibleOpts2 );
		SortPossibleOpts ( possibleOpts3 );
		SortPossibleOpts ( possibleOpts4 );

		_possibleOpts = new List<EchoPFXShaderOption>[4];
		_possibleOpts[0] = possibleOpts1;
		_possibleOpts[1] = possibleOpts2;
		_possibleOpts[2] = possibleOpts3;
		_possibleOpts[3] = possibleOpts4;


		if ( texCoordCount.Length < 1 )
		{
			texCoordCount = new int[4];
		}

		texCoordCount[0] = 1;
		texCoordCount[1] = 1;
		texCoordCount[2] = 1;
		texCoordCount[3] = 1;
		
		for ( int pass = 0; pass < 4; pass++ )
		{
			for ( loop = 0; loop < _possibleOpts[pass].Count; loop++ )
			{
				_possibleOpts[pass][loop].SetShit();
				if ( _possibleOpts[pass][loop].tcOpt == ECHOPFXTEXCOORD.UNIQUE )
				{
					_possibleOpts[pass][loop].tcIndex = texCoordCount[pass];
					texCoordCount[pass]++;
				}
				else
				{
					_possibleOpts[pass][loop].tcIndex = 0;
				}
			}
		}
		
		if ( _passSort == null || _passSort.Length < 1 )
			_passSort = new int[4];
		
		_passSort[0] = -1;
		_passSort[1] = -1;
		_passSort[2] = -1;
		_passSort[3] = -1;
		
		passCount = 0;
		_has2ndPass = false;
		
		int[] lookup = new int[4];
		lookup[0] = 2;
		lookup[1] = 0;
		lookup[2] = 3;
		lookup[3] = 1;
		
		bool[] opFlag = new bool[4];

		for ( loop = 0; loop < 4; loop++ )
		{
			if ( _possibleOpts[loop].Count > 0 )
				opFlag[loop] = true;
			else		
				opFlag[loop] = false; 
		}
		
		if ( opFlag[3] )
			opFlag[1] = true;
		
		for ( loop = 0; loop < 4; loop++ )
		{
			if ( opFlag[lookup[loop]] )
			{
				_passSort[passCount] = lookup[loop];
				
				passCount++;
				
				if ( lookup[loop] == 1 )
					_has2ndPass = true;
			}
		}
				
		if ( rtAdjustWidth < 2 )
			rtAdjustWidth = 2;

		if ( rtAdjustHeight < 2 )
			rtAdjustHeight = 2;
		
		for ( loop = 0; loop < epeList.Count; loop++ )
		{
			epeList[loop].ValidateOptions ( this );
		}

		// figure out mask textures used so we dont read same texture more than once per pixel.
		EchoPFXMask emask;
		
		_masks = new List<EchoPFXMask>[4];
		
		for ( int pass = 0; pass < 4; pass++ )
		{
			maskList = new List<EchoPFXMask>();
			
			// make a list of unque mask textures
			for ( loop = 0; loop < _possibleOpts[pass].Count; loop++ )
			{
				if ( _possibleOpts[pass][loop].fadeMask == null )
					_possibleOpts[pass][loop].fadeMaskDissolve = false;
		
				for ( n = 0; n < maskList.Count; n++ )
				{
					if ( _possibleOpts[pass][loop].fadeMask != null && _possibleOpts[pass][loop].fadeMask == maskList[n].tex )
					{
						if ( _possibleOpts[pass][loop].alwaysOn )
							maskList[n].alwaysOn = true;

						if ( _possibleOpts[pass][loop].fadeMaskDissolve )
							maskList[n].countDissolve++;
						else
							maskList[n].countNormal++;
						
						maskList[n].AddOrderID ( (int)_possibleOpts[pass][loop].order, _possibleOpts[pass][loop].fadeMaskDissolve );
						
						_possibleOpts[pass][loop].fadeMaskIndex = n;
						
						n = -99;
						break;
					}
				}
				
				if ( n >= 0 )
				{
					if ( _possibleOpts[pass][loop].fadeMask != null )
					{
						_possibleOpts[pass][loop].fadeMaskIndex = maskList.Count;
						
						emask = new EchoPFXMask ( _possibleOpts[pass][loop] ); 
						
						maskList.Add ( emask );
						
						if ( _possibleOpts[pass][loop].fadeMaskDissolve )
						{
							maskList[n].countNormal 	= 0;
							maskList[n].countDissolve 	= 1;
						}
						else
						{
							maskList[n].countNormal 	= 1;
							maskList[n].countDissolve 	= 0;
						}

						if ( _possibleOpts[pass][loop].alwaysOn )
							emask.alwaysOn = true;
					}
				}
			}
			
			_masks[pass] = maskList;
		}
	}
	
	//=========================================================================
	public List<EchoPFXMask> GetMaskList ( int ipass )
	{
		return ( _masks[ipass] );
	}
	
	//============================================================
	public void SetDetailLevel ( int ilevel )
	{
		_autoDetailFrame = ilevel;
		
		if ( _autoDetailFrame >= autoDetailLevels )
			_autoDetailFrame = autoDetailLevels-1;
		
		if ( _autoDetailFrame < 0 )
			_autoDetailFrame = 0;
	}
	
	//============================================================
	public void ProcessInUpdate()
	{
		if ( rtAdjustSize != ECHORTADJUST.AUTO_DETAIL || rtAutoDetailManual || _autoDetailChange > 0 )
		{
			_autoDetailChange--;
			return;
		}

		int delta =  _autoDetailTargetTime - ( (int)( Time.smoothDeltaTime * 10000.0f ) );
		
		if ( delta < -2 )
		{
			_autoDetailTime	= autoDetailChangeTime;
			if ( _autoDetailFrame < autoDetailLevels-1 )
			{
				_autoDetailFrame++;
				_autoDetailChange+=2;
			}
		}
		else
		{
			if ( _autoDetailTime > 0.0f )
			{
				_autoDetailTime-=Time.deltaTime;
			}
			else
			{
				if ( _autoDetailFrame > 0 && delta > 2 )
				{
					_autoDetailTime = autoDetailChangeTime;
					_autoDetailFrame--;
					_autoDetailChange+=2;
				}
			}
		}
	}

	//============================================================
	private void CreateMesh()
	{
		int 		xLoopCount;
		int 		yLoopCount;
		int 		numTri;
		int 		numVert;
		float 		umul;
		float 		vmul;
		Vector2[] 	uv;
		Vector3[] 	verts;
//		Color32[]  	vcolors;
		int[] 		tris;
		int 		loopx;
		int 		loopy;
		int 		index;

		if ( meshCellWidth < 1 )
			meshCellWidth = 1;
		
		if ( meshCellWidth > 128 )
			meshCellWidth = 128;

		if ( meshCellHeight < 1 )
			meshCellHeight = 1;
		
		if ( meshCellHeight > 128 )
			meshCellHeight = 128;

		xLoopCount = meshCellWidth + 1;
		yLoopCount = meshCellHeight + 1;
		
		numVert = xLoopCount * yLoopCount;
		numTri  = meshCellWidth * meshCellHeight * 6;
		
		umul = 1.0f / meshCellWidth;
		vmul = 1.0f / meshCellHeight;
		
		uv 		= new Vector2[numVert];
		verts 	= new Vector3[numVert];
//		vcolors = new Color32[numVert];
		tris 	= new int[numTri];
		
		index = 0;
		for ( loopy = 0; loopy < yLoopCount; loopy++ )
		{
			for ( loopx = 0; loopx < xLoopCount; loopx++ )
			{
				verts[index] 	= new Vector3 ( loopx * umul, loopy * vmul, 0.0f );
				uv[index] 		= new Vector2 ( (float)loopx * umul, (float)loopy * vmul );
				
				index++;
			}
		}

		index = 0;
		for ( loopy = 0; loopy < meshCellHeight; loopy++ )
		{
			for ( loopx = 0; loopx < meshCellWidth; loopx++ )
			{
				tris[index] = loopx + ( loopy * xLoopCount );
				index++;
				
				tris[index] = loopx + ( ( loopy + 1 ) * xLoopCount );
				index++;

				tris[index] = loopx + 1 + ( loopy * xLoopCount );
				index++;
				
				tris[index] = loopx + ( ( loopy + 1 ) * xLoopCount );
				index++;
				
				tris[index] = loopx + 1 + ( ( loopy + 1 ) * xLoopCount );
				index++;

				tris[index] = loopx + 1 + ( loopy * xLoopCount );
				index++;
			}
		}
		
		_mesh = new Mesh();
		
		_mesh.vertices 	= verts;
        _mesh.triangles = tris;
		//_mesh.colors32 	= vcolors;
        _mesh.uv = uv;
        _mesh.RecalculateNormals();
		;
#if !UNITY_3_5
		_mesh.MarkDynamic();
#endif

		//_meshColor = _mesh.colors32;

		return;
	}


}




