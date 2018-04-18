using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Callbacks;

public class EchoPFXEditorShaderTab : Editor 
{
	private static EchoPFXShaderOption 	_customOpt 			= null;
	private static int                  _customPass         = 0;
	private static bool 				_sortShaderOptions 	= false;
	private static int                  _curTab             = 0;

	//=========================================================================
	public static void ClearCustomOpt()
	{
		_customOpt 	= null;
		_customPass = 0;
	}

	//=========================================================================
	private static void SetDistortionDefaults ( EchoPFXRenderGroup ierg )
	{
		int n;
		int i;
		EchoPFXEffectOption epo;
		List<EchoPFXEffectOption> list = null;	
		
		for ( n = 0; n < ierg.epeList.Count; n++ )
		{
			switch ( _customPass )
			{
			case 0:
				list = ierg.epeList[n].passOpt1;
				break;
			case 1:
				list = ierg.epeList[n].passOpt2;
				break;
			case 2:
				list = ierg.epeList[n].passOpt3;
				break;
			case 3:
				list = ierg.epeList[n].passOpt4;
				break;
			default:
				list = null;
				break;
			}
			
			if ( list != null )
			{
				for ( i = 0; i < list.Count; i++ )
				{
					epo = list[i];
					if ( epo.optType == ECHOPFXOPTION.DISTORTION && epo.poid == _customOpt.id )
					{
						epo.ResetDefaults ( _customOpt );
					}
				}
			}
		}
	}

	//=========================================================================
	static public int GetPossibleOptID ( List<EchoPFXShaderOption> ipos, ECHOPFXOPTION iopt )
	{
		int 	newid = 0;
		int 	loop;
		bool 	flag;
		
		while ( true )
		{
			flag = false;
			
			for ( loop = 0; loop < ipos.Count; loop++ )
			{
				if ( ipos[loop].type == iopt )
				{
					if ( newid == ipos[loop].id )
					{
						flag = true;
						newid++;
					}
				}
			}
			
			if ( !flag )
				break;
		}
		
		return ( newid );
	}

	// SCOTTFIND  can use possibleopts[4]
	//=========================================================================
	private static bool IsShaderOptionInCurrentEffect ( EchoPFXRenderGroup ierg, EchoPFXShaderOption ieso, int iepeIndex )
	{
		int loop;
		
		if ( ierg == null )
			return ( false );

		if ( ierg.epeList == null )
			return ( false );

		if ( iepeIndex < 0 )
			return ( false );

		if ( ierg.epeList.Count > 0  )
		{
			if ( ierg.epeList[iepeIndex].passOpt1 != null )
			{
				for ( loop = 0; loop < ierg.epeList[iepeIndex].passOpt1.Count; loop++ )
				{
					if ( ierg.epeList[iepeIndex].passOpt1[loop].optType == ieso.type && ierg.epeList[iepeIndex].passOpt1[loop].poid == ieso.id )
						return ( true );
				}
			}
			
			if ( ierg.epeList[iepeIndex].passOpt2 != null )
			{
				for ( loop = 0; loop < ierg.epeList[iepeIndex].passOpt2.Count; loop++ )
				{
					if ( ierg.epeList[iepeIndex].passOpt2[loop].optType == ieso.type && ierg.epeList[iepeIndex].passOpt2[loop].poid == ieso.id )
						return ( true );
				}
			}
			
			if ( ierg.epeList[iepeIndex].passOpt3 != null )
			{
				for ( loop = 0; loop < ierg.epeList[iepeIndex].passOpt3.Count; loop++ )
				{
					if ( ierg.epeList[iepeIndex].passOpt3[loop].optType == ieso.type && ierg.epeList[iepeIndex].passOpt3[loop].poid == ieso.id )
						return ( true );
				}
			}
			
			
			if ( ierg.epeList[iepeIndex].passOpt4 != null )
			{
				for ( loop = 0; loop < ierg.epeList[iepeIndex].passOpt4.Count; loop++ )
				{
					if ( ierg.epeList[iepeIndex].passOpt4[loop].optType == ieso.type && ierg.epeList[iepeIndex].passOpt4[loop].poid == ieso.id )
						return ( true );
				}
			}
		}

		return ( false );
	}

	//=========================================================================
	public static void EffectBuildOptionsDrawOptions ( int ipass, EchoPFXRenderGroup ierg, string[] ienumNames, int iepeIndex )
	{
		int count = 0;
		Color 		old_color = GUI.color;
		int 		index;
		int 		activeCount;
		int 		movableCount;
		int 		inverseIndex;
		int 		staticCount;
		GUIContent 	gc;
		string 		subOpt;
		int     	alwaysOnCount = 0;
		int 		index1;
		bool        sortFlag = false;
		EchoPFXShaderOption opt;
		List<EchoPFXShaderOption>[] possibleOpts;

//		if ( SystemInfo.supportsRenderTextures == true || ( SystemInfo.supportsRenderTextures == false && ierg.renderOrder == 0 ) )
//			has2ndPass = true;

		possibleOpts = new List<EchoPFXShaderOption>[4];
		
		possibleOpts[0] = ierg.possibleOpts1;
		possibleOpts[1] = ierg.possibleOpts2;
		possibleOpts[2] = ierg.possibleOpts3;
		possibleOpts[3] = ierg.possibleOpts4;

		activeCount = 0;
		for ( index = 0; index < possibleOpts[ipass].Count; index++ )
		{
			if ( possibleOpts[ipass][index].alwaysOn == false )
				activeCount++;
			
			if ( activeCount > 6 )
				possibleOpts[ipass][index].disabled = true;
			else
				possibleOpts[ipass][index].disabled = false;
		}
		
		staticCount  = 0;
		movableCount = 0;
		
		if ( possibleOpts[ipass].Count > 1 )
		{
			for ( index = 0; index < possibleOpts[ipass].Count; index++ )
			{
				if ( !possibleOpts[ipass][index].disabled )
				{
					if ( !possibleOpts[ipass][index].orderTop )
					{
						movableCount++;
					}
					else
					{
						staticCount++;
					}
				}
			}
		}
		
		EditorGUILayout.BeginVertical();
		
		GUILayout.Box( "Texcoord's inuse:"+ierg.texCoordCount[ipass], new GUILayoutOption[]{GUILayout.ExpandWidth(true)});
		
		bool passAvaliable = true;
		
		// copy pass 2 needs pass 1
		if ( ipass == 3 && possibleOpts[0].Count <= 0 )
			passAvaliable = false;
		
		// pass 2 needs pass 1
		if ( ipass == 1 && possibleOpts[0].Count <= 0 )
			passAvaliable = false;

//		if ( ipass == 0 || ( ipass == 1 && possibleOpts[0].Count > 0 && has2ndPass ) )
//			passAvaliable = true;
//		
//		if ( ipass == 2 || ( ipass == 3 && possibleOpts[1].Count > 0 && has2ndPass ) )
//			passAvaliable = true;
		
		if ( passAvaliable )
		{
			EditorGUI.BeginChangeCheck();
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField ( new GUIContent( "Frag Precision", "FIXED - fastest\nHALF\nFLOAT - most precise") );
			ierg.precision[ipass] = (ECHOPRECISION)EditorGUILayout.EnumPopup ( ierg.precision[ipass] );
			EditorGUILayout.EndHorizontal();
			if ( EditorGUI.EndChangeCheck() )
				EchoPFXManagerEditor.needCompile = true;
			
	//		if ( ierg != EchoPFXManagerEditor.epfxm.ergList[0] )
	//		{
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( new GUIContent( "Blend Mode", "Blend mode for this pass's shader") );
				EditorGUI.BeginChangeCheck();
				ierg.rtBlendMode[ipass] = (ECHOPFXBLEND)EditorGUILayout.EnumPopup ( ierg.rtBlendMode[ipass] );
				EditorGUILayout.EndHorizontal();
				if ( EditorGUI.EndChangeCheck() )
					EchoPFXManagerEditor.needCompile = true;
	//		}
	//		else
	//			ierg.rtBlendMode[ipass] = ECHOPFXBLEND.NORMAL;
			
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField ( new GUIContent( "Alpha Channel", "Enable alpha channel in shader") );
			EditorGUI.BeginChangeCheck();
			ierg.alphaFlag[ipass] = (ECHOPFXALPHA)EditorGUILayout.EnumPopup ( ierg.alphaFlag[ipass] );
			EditorGUILayout.EndHorizontal();
			if ( EditorGUI.EndChangeCheck() )
				EchoPFXManagerEditor.needCompile = true;
		

			
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField ( new GUIContent( "Blit Filter Mode", "Filter mode for this pass's render texture") );
			ierg.rtFilterMode[ipass] = (FilterMode)EditorGUILayout.EnumPopup ( ierg.rtFilterMode[ipass] );
			EditorGUILayout.EndHorizontal();
			
//			if ( ipass < 2 )
//			{
//				EditorGUILayout.BeginHorizontal();
//				EditorGUILayout.LabelField ( new GUIContent( "Wrap Mode", "Wrap mode for this pass's render texture") );
//				EditorGUI.BeginChangeCheck();
//				ierg.rtWrapMode[ipass] = (TextureWrapMode)EditorGUILayout.EnumPopup ( ierg.rtWrapMode[ipass] );
//				EditorGUILayout.EndHorizontal();
//			}

//			ierg.rtWrapMode[ipass] = TextureWrapMode.Clamp;

			EditorGUILayout.Space();
			
			index1 = EditorGUILayout.Popup ( 0, ienumNames ) - 1;
			
			if ( index1 >= 0 )
			{
				opt 		= new EchoPFXShaderOption ( (ECHOPFXOPTION)index1 ); 
				opt.order 	= possibleOpts[ipass].Count;
				opt.id 		= GetPossibleOptID ( possibleOpts[ipass], opt.type );
				
				if ( ( possibleOpts[ipass].Count - alwaysOnCount ) >= 6 )
				{
					if ( EditorUtility.DisplayDialog("All 6 Keyword slots are  in use !", "Add this Shader Option as 'Always on' ? ", "Add", "Cancel" ) )
					{
						opt.alwaysOn = true;
					}
					else
					{
						opt = null;
						index = -1;
					}
				}

				if ( opt != null )
				{
					EchoPFXManagerEditor.needCompile = true;
					possibleOpts[ipass].Add ( opt );
					ierg.ValidateOptions();
				}
			}
			
			EditorGUILayout.Space();
			
			EditorGUILayout.LabelField ("Global Shader Options");
			
			for ( int loop = possibleOpts[ipass].Count-1; loop >= 0; loop-- )
			{
				inverseIndex 	= possibleOpts[ipass].Count-1-loop;
				opt 			= possibleOpts[ipass][inverseIndex];
				
				count++;
				
				EditorGUILayout.BeginHorizontal();
				
				subOpt = EchoPFXManagerEditor.GetOptionExtraText ( opt );

				if ( subOpt != "" )
				{
					subOpt = "\nSub-Option = " + subOpt;
					subOpt += "\n\nPress button to modify sub-options";
				}
				
				gc = new GUIContent(EchoPFXManagerEditor.optNames[(int)opt.type] + "(" + opt.id + ")", "Type = " + EchoPFXManagerEditor.optNames[(int)opt.type] + "\nId = " + opt.id + subOpt  );
				
				if ( opt.disabled )
				{
					GUI.color = EchoPFXManagerEditor.disabledColor;
					GUILayout.Label ( gc );
				}
				else
				{
					if ( _customOpt == opt )
						GUI.color = EchoPFXManagerEditor.selectionColor;
					else
						GUI.color = EchoPFXManagerEditor.buttonColor;
					
					if ( IsShaderOptionInCurrentEffect ( ierg, opt, iepeIndex ) )
						GUILayout.Box( "E", GUILayout.Width(16));
					else
						GUILayout.Box( "", GUILayout.Width(16));
					
					if ( GUILayout.Button ( gc, GUILayout.MinWidth(48) ) )
					{
						_customOpt = opt;
						_customPass = ipass;
					}
				}
				
				GUI.color = old_color;
				
				if ( opt.alwaysOn )
				{
					GUI.color = EchoPFXManagerEditor.toggleColor;
					if ( GUILayout.Button ( new GUIContent( "A", "Always include in shader - ON\n This does not use a shader keyword"), GUILayout.Width(32) ) )
					{
						opt.alwaysOn = false;
						EchoPFXManagerEditor.needCompile = true;
					}
				}
				else
				{
					if ( GUILayout.Button ( new GUIContent("A", "Always include in shader - OFF"), GUILayout.Width(32) ) )
					{
						opt.alwaysOn = true;
						EchoPFXManagerEditor.needCompile = true;
					}
				}
				
				GUI.color = old_color;
				
				if ( opt.disabled )
				{
					GUI.color = EchoPFXManagerEditor.toggleColor;
					GUILayout.Label ( "DISABLED", GUILayout.Width(68) );
					GUI.color = old_color;
				}
				else
				{
					if ( inverseIndex > staticCount && possibleOpts[ipass][inverseIndex].orderTop == false && movableCount > 1 )
					{
						if ( GUILayout.Button ( new GUIContent( EchoPFXManagerEditor.upArrow.ToString(), "Move up in render order"), GUILayout.Width(32) ) )
						{
							_customOpt = null;
							opt.order-=1.5f;
							sortFlag = true;
							EchoPFXManagerEditor.needCompile = true;
						}
					}
					else
					{
						GUILayout.Box( "", GUILayout.Width(32));
					}
					
					if ( inverseIndex !=  possibleOpts[ipass].Count-1 && possibleOpts[ipass][inverseIndex].orderTop == false && movableCount > 1 )
					{
						if ( GUILayout.Button ( new GUIContent( EchoPFXManagerEditor.dnArrow.ToString(), "Move down in render order"), GUILayout.Width(32) ) )
						{
							_customOpt = null;
							opt.order+=1.5f;
							sortFlag = true;
							EchoPFXManagerEditor.needCompile = true;
						}
					}
					else
					{
						GUILayout.Box( "", GUILayout.Width(32));
					}
				}
				
				
				if ( GUILayout.Button (new GUIContent("-", "Remove this shader effect option"), GUILayout.Width(32) ) )
				{
					if ( EditorUtility.DisplayDialog("Remove this shader effect option ?", "This can not be undone", "Remove", "Cancel" ) )
					{
						EchoPFXManagerEditor.needCompile = true;
						_customOpt = null;
						ierg.RemoveOptionOfType ( opt.type, ipass, opt.id );
						possibleOpts[ipass].Remove ( opt );
						sortFlag = true;
					}
				}
				
				
				GUILayout.EndHorizontal();
			}
			
		}
		else
		{
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField ( "Not Availble", GUILayout.MaxWidth(128) );
			EditorGUILayout.LabelField ( ":" );
			EditorGUILayout.EndHorizontal();
		}

		if ( sortFlag )
		{
			ierg.ValidateOptions();
		}

		EditorGUILayout.EndVertical();
		EditorGUILayout.BeginVertical(GUILayout.Width(16));
		EditorGUILayout.EndVertical();

	}

	//=========================================================================
	public static void LayoutHelp ( string item1, string item2, string item3 )
	{
		GUILayout.BeginHorizontal();
		EditorGUILayout.LabelField ( item1, GUILayout.Width(72) );
		EditorGUILayout.LabelField ( item2, GUILayout.Width(96) );
		EditorGUILayout.LabelField ( item3 );
		GUILayout.EndHorizontal();
	}

	//=========================================================================
	public static bool DisplayGUI ( EchoPFXRenderGroup ierg, int iepeIndex )
	{
		string[] 					names = { "Pass:1 >", "Pass:2 >", "Copy:1 >", "Copy:2 >" };
		List<EchoPFXShaderOption>[]	possibleOpts;
		string[]          			enumNames;
		int 						loop;
		int               			alwaysOnCount = 0;
		Color 						oldColor = GUI.color;
		int []                      sortTab = new int[4] { 2,0,3,1 };
		int                         sortCur;
		
		if ( ierg == null )
			return(false);

		enumNames = new string[(int)ECHOPFXOPTION.COUNT+1];
		enumNames[0] = "Add Option To Shader";
		
		for ( loop = 1; loop < enumNames.Length; loop++ )
		{
			enumNames[loop] = EchoPFXManagerEditor.optNames[loop-1];
		}
		
		if ( _sortShaderOptions )
		{
			_sortShaderOptions = false;
			ierg.ValidateOptions();
		}
		
		possibleOpts = new List<EchoPFXShaderOption>[4];
		
		possibleOpts[0] = ierg.possibleOpts1;
		possibleOpts[1] = ierg.possibleOpts2;
		possibleOpts[2] = ierg.possibleOpts3;
		possibleOpts[3] = ierg.possibleOpts4;
		
		// main passes
		EditorGUILayout.LabelField ("Shader Passes:" );
		
		GUILayout.BeginHorizontal();
		for ( loop = 0; loop < 4; loop++ )
		{
			sortCur = sortTab[loop];
			
			if ( sortCur == _curTab )
				GUI.color = EchoPFXManagerEditor.selectionColor;
			
			if ( GUILayout.Button (  new GUIContent( names[sortCur] ) ) )
			{
				_curTab = sortCur;
				ClearCustomOpt();
			}
			
			GUI.color = oldColor;
		}
		GUILayout.EndHorizontal();
		
		EditorGUILayout.BeginHorizontal();
		alwaysOnCount = 0;
		for ( loop = 0; loop < possibleOpts[_curTab].Count; loop++ )
		{
			if ( possibleOpts[_curTab][loop].alwaysOn )
				alwaysOnCount++;
		}
		
		EffectBuildOptionsDrawOptions ( _curTab, ierg, enumNames, iepeIndex );

		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.Space();
		EditorGUILayout.Space();

		EditorGUI.BeginChangeCheck();

		if ( _customOpt != null )
		{
			GUILayout.Box( "", new GUILayoutOption[]{GUILayout.ExpandWidth(true), GUILayout.Height(2)});
			EditorGUILayout.LabelField ("Sub-Options:" );
			EditorGUILayout.Space();
			
			switch ( _customOpt.type )
			{
			case ECHOPFXOPTION.DISTORTION:
				ECHOPFXDISTORTION  distval;
				ECHOPFXDISTORTION  olddistval;
				
				olddistval = (ECHOPFXDISTORTION)_customOpt.BlockNext(0);
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( new GUIContent( "Distortion Type: ", "Method of warping screen"));
				distval = (ECHOPFXDISTORTION)EditorGUILayout.EnumPopup (olddistval);
				
				EditorGUILayout.EndHorizontal();
				
				_customOpt.codeMask = 0;
				_customOpt.SetBlockMask ( (int)distval );
				
				if ( distval != olddistval )
				{
					SetDistortionDefaults(ierg);
				}
				break;
				
			case ECHOPFXOPTION.AVERAGE_PIXEL:
				ECHOPFXBLUR  optval;
				
				optval = (ECHOPFXBLUR)_customOpt.BlockNext(0);
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( new GUIContent( "Type: ", "Method of averaging pixels"));
				optval = (ECHOPFXBLUR)EditorGUILayout.EnumPopup (optval);
				EditorGUILayout.EndHorizontal();
				
				_customOpt.codeMask = 0;
				_customOpt.SetBlockMask ( (int)optval );
				break;
				
			case ECHOPFXOPTION.COLOR:
				ECHOPFXCOLOR  optColor;
				
				optColor = (ECHOPFXCOLOR)_customOpt.BlockNext(0);
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( new GUIContent( "Color Blend Mode: ", "Blend mode for solid colors") );
				optColor = (ECHOPFXCOLOR)EditorGUILayout.EnumPopup (optColor);
				EditorGUILayout.EndHorizontal();
				
				_customOpt.codeMask = 0;
				_customOpt.SetBlockMask ( (int)optColor );
				
				break;
				
			case ECHOPFXOPTION.TEXTURE:
				
				ECHOPFXTEXBLEND  texBlend;
				
				texBlend = (ECHOPFXTEXBLEND)_customOpt.BlockNext(0);
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField (new GUIContent(  "TexCoord Options:", "Use for tiling, scrolling or random UV effects"));
				_customOpt.tcOpt = (ECHOPFXTEXCOORD)EditorGUILayout.EnumPopup ( _customOpt.tcOpt );
				EditorGUILayout.EndHorizontal();
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( "Blend Mode: ");
				texBlend = (ECHOPFXTEXBLEND)EditorGUILayout.EnumPopup (texBlend );
				EditorGUILayout.EndHorizontal();
				
				_customOpt.codeMask = 0;
				_customOpt.SetBlockMask ( (int)texBlend );
				break;
				
				
			case ECHOPFXOPTION.CUSTOM_FRAG:
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField (new GUIContent(  "TexCoord Options:", "Use for tiling, scrolling or random UV effects"));
				_customOpt.tcOpt = (ECHOPFXTEXCOORD)EditorGUILayout.EnumPopup ( _customOpt.tcOpt );
				EditorGUILayout.EndHorizontal();
				
				EditorGUILayout.Space();
				EditorGUILayout.LabelField ( new GUIContent( "Fragment Shader Code:", "Enter your custom code below") );
				
				if ( _customOpt.customCode == null || _customOpt.customCode.Length < 1 )
					_customOpt.customCode = "";
				
				_customOpt.customCode = EditorGUILayout.TextArea ( _customOpt.customCode, GUILayout.Height(128) );
				
				//SCOTTFIND - make sure custom works and vars are correct
				EditorGUILayout.Space();
				LayoutHelp ( "vector3 or 4"	, "_Output", "Final Color Output" );
				LayoutHelp ( "sampler2D", "_Tex", "Texture" );
				LayoutHelp ( "texcoord"	, "_TC" , "Texture Coords" );
				LayoutHelp ( "vector4"	, "_Color", "Solid Color or Gradient values" );
				LayoutHelp ( "vector4"	, "_Params1", "User Values" );
				LayoutHelp ( "vector4"	, "_Params2", "User Values" );
				break;
				
			case ECHOPFXOPTION.SCANLINES:
				bool horzFlag;
				bool vertFlag;
				
				horzFlag = _customOpt.GetBlockMask ( 0 );
				vertFlag = _customOpt.GetBlockMask ( 1 );
				
				EditorGUILayout.LabelField (new GUIContent(  "Scanline Direction:", "Can use horizontal, vertcal or both"));
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( "Horizontal: ");
				horzFlag = EditorGUILayout.Toggle ( horzFlag );
				EditorGUILayout.EndHorizontal();
				
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( "Vertical: ");
				vertFlag = EditorGUILayout.Toggle ( vertFlag );
				EditorGUILayout.EndHorizontal();
				
				if ( horzFlag )
					_customOpt.SetBlockMask ( 0 );
				else
					_customOpt.ClearBlockMask ( 0 );
				
				if ( vertFlag )
					_customOpt.SetBlockMask ( 1 );
				else
					_customOpt.ClearBlockMask ( 1 );
				break;
				
			default:
				break;
			}

			Texture2D tempTex;

			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField ( "Mask:", GUILayout.MaxWidth(Screen.width/2-12)  );
			tempTex = _customOpt.fadeMask;
			_customOpt.fadeMask = (Texture2D)EditorGUILayout.ObjectField ( _customOpt.fadeMask, typeof ( Texture2D ), true, GUILayout.Width(64), GUILayout.Height(64) );
			EditorGUILayout.EndHorizontal();
			EditorGUILayout.Space();

			if ( _customOpt.fadeMask == null )
			{
				_customOpt.fadeMaskDissolve = false;
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( new GUIContent( "Shader Fade Option: ", "Affects what fade code will be included in shader"));
				_customOpt.fadeType = (ECHOPFXFADETYPE)EditorGUILayout.EnumPopup ( _customOpt.fadeType );
				EditorGUILayout.EndHorizontal();
			}
			else
			{
				if ( _customOpt.fadeMask.mipmapCount > 1 && tempTex == null )
				{
					EditorUtility.DisplayDialog("Warning optimization error!", "Disable mip-mapping for this texture\nfor maximum speed and quality" , "Ok", null );
				}

				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField (new GUIContent(  "Mask Dissolve Effect:", "Enables a dissolve effect using mask's alpha channel"));
				_customOpt.fadeMaskDissolve = EditorGUILayout.Toggle ( _customOpt.fadeMaskDissolve );
				EditorGUILayout.EndHorizontal();
				
				_customOpt.fadeType = ECHOPFXFADETYPE.DEFAULT;
			}
			
			if ( _customOpt.mathsFlag )
			{
				EditorGUILayout.BeginHorizontal();
				EditorGUILayout.LabelField ( new GUIContent( "Value Blend: ", "How values are blended when effects\nusing same options are active at same time"));
				_customOpt.maths = (ECHOPFXMATHS)EditorGUILayout.EnumPopup (_customOpt.maths);
				EditorGUILayout.EndHorizontal();
				EditorGUILayout.Space();
			}
			
			
			EditorGUILayout.Space();
			if ( GUILayout.Button ( "Done Editing" ) )
			{
				_customOpt = null;
			}
		}
		
		EditorGUILayout.Space();
		
		if ( EditorGUI.EndChangeCheck() )
			EchoPFXManagerEditor.needCompile = true;
		
		return ( true );
	}

}
