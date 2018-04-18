using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Callbacks;


[System.Serializable]
public class EchoPFXEditorEffectsTab : Editor
{
	//=========================================================================
	public static float RoundFloat ( float inum, float idp = 3 )
	{
		float num = Mathf.Pow ( 10.0f, idp );
		return Mathf.Round ( inum * num ) / num;
	}
	
	//=========================================================================
	public static void PostEffectOptionsGUI ( EchoPFXEffectOption iepo )
	{
		float num;
		float stageLength;
		
		EditorGUILayout.LabelField ( "TIMING:" );
		
		if ( iepo.attackCurve == null || iepo.attackCurve.length < 1 )
			iepo.attackCurve = AnimationCurve.Linear ( 0, 0, 1, 1 );
		
		if ( iepo.sustainCurve == null || iepo.sustainCurve.length < 1 )
			iepo.sustainCurve = AnimationCurve.Linear ( 0, 1, 1, 1 );
		
		if ( iepo.releaseCurve == null || iepo.releaseCurve.length < 1 )
			iepo.releaseCurve = AnimationCurve.Linear ( 0, 1, 1, 0 );


		// start delay
		EditorGUIUtility.LookLikeControls( 64, 0);
		EditorGUILayout.BeginHorizontal();
		iepo.delay 	= EditorGUILayout.FloatField ( "Delay :", iepo.delay, GUILayout.Width(128) );
		EditorGUILayout.LabelField ( " " );
		EditorGUILayout.EndHorizontal();

		// fade in values
		EditorGUILayout.BeginHorizontal();
		iepo.attackTime 	= EditorGUILayout.FloatField ( "Fade In :", iepo.attackTime, GUILayout.Width(128) );
		iepo.attackCurve 	= EditorGUILayout.CurveField ( iepo.attackCurve, EchoPFXManagerEditor.curveColor, new Rect (0,0,1,1) );
		EditorGUILayout.EndHorizontal();
		
		
		// sustain
		EditorGUILayout.BeginHorizontal();
		iepo.sustainTime 	= EditorGUILayout.FloatField ( "Sustain :", iepo.sustainTime, GUILayout.Width(128) );
		iepo.sustainCurve 	= EditorGUILayout.CurveField ( iepo.sustainCurve, EchoPFXManagerEditor.curveColor, new Rect (0,0,1,1) );
		EditorGUILayout.EndHorizontal();

		
		// fade out values
		EditorGUILayout.BeginHorizontal();
		iepo.releaseTime = EditorGUILayout.FloatField ( "Fade Out :", iepo.releaseTime, GUILayout.Width(128) );
		iepo.releaseCurve 	= EditorGUILayout.CurveField ( iepo.releaseCurve, EchoPFXManagerEditor.curveColor, new Rect (0,0,1,1) );
		EditorGUILayout.EndHorizontal();

		
		EditorGUILayout.BeginHorizontal();
		stageLength = iepo.attackTime + iepo.sustainTime + iepo.releaseTime;
		num = EditorGUILayout.FloatField ( "Duration :", stageLength, GUILayout.Width(128) );
		EditorGUILayout.LabelField ( " " );
		EditorGUILayout.EndHorizontal();
		
		if ( !Mathf.Approximately ( num, stageLength ) )
		{
			if ( stageLength <= 0.0f )
			{
				iepo.attackTime 	= 0;
				iepo.sustainTime 	= num;
				iepo.releaseTime	= 0;
			}
			else
			{
				float per = num / stageLength;
	
				iepo.attackTime *= per;
				iepo.sustainTime *= per;
				iepo.releaseTime *= per;
			}
		}
		EditorGUIUtility.LookLikeControls();
//		EditorGUILayout.Space();

		iepo.sustainHold = GUILayout.Toggle ( iepo.sustainHold, "Hold on Sustain" );
		//EditorGUILayout.Space();
		
		//EditorGUIUtility.LookLikeControls(0, 0);
		iepo.strength = EchoPFXEditorGadgets.EchoSliderFloat ("Strength", iepo.strength, 0.0f, 1.0f ); 
		EditorGUILayout.Space();
		
		iepo.ValidateInput();
	}
	
	//=========================================================================
	public static bool PostFxOptionGUI ( List<EchoPFXEffectOption> iepolist, int ipos, string iname, EchoPFXShaderOption ipo )
	{
		bool flag = true;
		EchoPFXEffectOption epo = iepolist[ipos];
		
		
		// toggle, start, end, duration
		GUILayout.Box("", new GUILayoutOption[]{GUILayout.ExpandWidth(true), GUILayout.Height(1)});
		
		EditorGUILayout.BeginHorizontal();
		
		if ( epo.folded )
		{
			if ( GUILayout.Button ( EchoPFXManagerEditor.rightArrow.ToString(), GUILayout.MaxWidth(24) ) )
			{
				epo.folded = false;
			}
			else
			{
				flag = false;
			}
		}
		else
		{
			if ( GUILayout.Button ( EchoPFXManagerEditor.upArrow.ToString(), GUILayout.MaxWidth(24) ) )
			{
				epo.folded = true;
			}
		}
		
		if ( GUILayout.Button ( "Reset",GUILayout.Width(54) ) )
		{
			if ( EditorUtility.DisplayDialog("Reset Effect To Default Settings ?", "Are you sure ?", "Yes", "No" ) )
				epo.ResetDefaults ( ipo );
		}
		
		GUILayout.Box( iname, new GUILayoutOption[]{GUILayout.ExpandWidth(true)});
		if ( GUILayout.Button ( new GUIContent( "-" , "Remove this option from effect" ), GUILayout.MaxWidth(32) ) )
		{
			if ( EditorUtility.DisplayDialog("Remove Effect Option ?", "Are you sure ?", "Yes", "No" ) )
			{
				iepolist.RemoveAt ( ipos );
				flag = false;
			}
		}
		
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.Space();
		
		if ( flag && ipo.fadeType != ECHOPFXFADETYPE.ALWAYS_1 )
			PostEffectOptionsGUI ( epo );
		
		if ( ipo.fadeMaskDissolve && ipo.fadeMask != null )
		{
			EditorGUILayout.LabelField ( "MASK DISSOLVE OPTIONS:" );
			epo.maskDissolve = EchoPFXEditorGadgets.EchoSliderFloat ("Percent", epo.maskDissolve, 0.0f, 1.0f, 96 ); 
			epo.maskDissolveCurve 	= EditorGUILayout.CurveField ( "Curve", epo.maskDissolveCurve, EchoPFXManagerEditor.curveColor, new Rect (0,0,1,1) );
			epo.maskAnimateTime = GUILayout.Toggle ( epo.maskAnimateTime, "Automate With Fade Time" );
			
			EditorGUILayout.Space();
		}
		else
		{
			ipo.fadeMaskDissolve 	= false;
			epo.maskAnimateTime 	= false;
		}
		
		return ( flag );
	}
	
	//=========================================================================
	public static void PostFxColorGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "COLOR OPTIONS:" );
		
		if ( iepo.texGradient == null )
		{
			EditorGUILayout.BeginHorizontal();
			iepo.rgba = EditorGUILayout.ColorField ( iepo.rgba );
			EditorGUILayout.LabelField ( " ", GUILayout.Width(26) );
			EditorGUILayout.EndHorizontal();
		}
		
		EditorGUILayout.LabelField ( "Gradient From Texture");
		iepo.texGradient = (Texture2D)EditorGUILayout.ObjectField ( iepo.texGradient, typeof ( Texture2D ), true, GUILayout.Height(32) );
		
		if ( iepo.texGradient != null )
		{
			try 
			{
				Color[] colors;
				colors = iepo.texGradient.GetPixels();
				if ( colors != null && colors[0] == new Color (0,0,0,0) )
					colors[0] = new Color(0,0,0,0);
			}
			catch ( UnityException e ) 
			{
				if ( e!=null )
				{
					EditorUtility.DisplayDialog("Please enable read/write on this texture using Advanced Options:", null, "Ok", null );
					iepo.texGradient = null;
				}
			}
		}
		
		if ( iepo.texGradient != null )
		{
			EditorGUILayout.Space();
			
			if ( iepo.rgbaCurve == null || iepo.rgbaCurve.length < 1 )
				iepo.rgbaCurve 		= AnimationCurve.Linear ( 0, 1, 1, 1 );
			
			iepo.rgbaCurve 	= EditorGUILayout.CurveField ( "Gradient Curve", iepo.rgbaCurve, new Color (1,0.4f,0,1), new Rect (0,0,1,1) );
			
			EditorGUILayout.Space();
		}
		
		iepo.rgbaMultiply = EchoPFXEditorGadgets.EchoSliderFloat ( "Amplify", iepo.rgbaMultiply, 1, 8 ); 
		
	}
	
	//=========================================================================
	public static void PostFxCustomGUI ( EchoPFXRenderGroup ierg, EchoPFXEffectOption iepo, int ipass )
	{
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.LabelField ( "CUSTOM:" );
		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.BeginHorizontal();
		iepo.params1 = EditorGUILayout.Vector4Field ( "Params1", iepo.params1 );
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.Space();

		EditorGUILayout.BeginHorizontal();
		iepo.params2 = EditorGUILayout.Vector4Field ( "Params2", iepo.params2 );
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.Space();

		PostFxColorGUI ( iepo );
		EditorGUILayout.Space();
		
		PostFxOverlayGUI ( ierg, iepo, ipass );
	}
	
	//=========================================================================
	public static void PostFxScanLinesGUI ( EchoPFXEffectOption iepo, EchoPFXShaderOption ipo )
	{
		EditorGUILayout.LabelField ( "SCANLINE OPTIONS:" );
		
		if ( ipo.GetBlockMask ( 0 ) )
		{
			EditorGUILayout.LabelField ( "Horizontal:" );
			EditorGUILayout.BeginHorizontal();
			iepo.opt1 = GUILayout.Toggle ( iepo.opt1, "" );
			EditorGUILayout.LabelField ( "Divide Screen Height By Count" );
			EditorGUILayout.EndHorizontal();
			
			iepo.params1.x = (float)EditorGUILayout.IntField ("Count", (int)iepo.params1.x );
			
			iepo.params1.y = EditorGUILayout.FloatField ( "Scroll", iepo.params1.y );
		}
		
		if ( ipo.GetBlockMask ( 0 ) && ipo.GetBlockMask ( 1 ) )
			EditorGUILayout.Space();
		
		if ( ipo.GetBlockMask ( 1 ) )
		{
			EditorGUILayout.LabelField ( "Vertical:" );
			EditorGUILayout.BeginHorizontal();
			iepo.opt2 = GUILayout.Toggle ( iepo.opt2, "" );
			EditorGUILayout.LabelField ( "Divide Screen Width By Count" );
			EditorGUILayout.EndHorizontal();
			
			iepo.params1.z = (float)EditorGUILayout.IntField ("Count", (int)iepo.params1.z );
			
			iepo.params1.w = EditorGUILayout.FloatField ( "Scroll", iepo.params1.w );
			
			iepo.fadeMult = EchoPFXEditorGadgets.EchoSliderFloat ("Multiply Fade", iepo.fadeMult, 0.0f, 2.0f ); 
		}
	}
	
	//=========================================================================
	public static void PostFxDistortionGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "WAVES OPTIONS:" );
		EditorGUILayout.Space();

		EditorGUILayout.LabelField ( "Horizontal:" );
		
		iepo.params1.x = EditorGUILayout.FloatField ( "Amount", iepo.params1.x );
		iepo.params1.y = EditorGUILayout.FloatField ( "Speed", iepo.params1.y );
		iepo.params1.z = EditorGUILayout.FloatField ( "Strength", iepo.params1.z );
		
		if ( iepo.params1.x < 0 )
			iepo.params1.x = 0;
		
		if ( iepo.params1.z < 0 )
			iepo.params1.z = 0;
		
		EditorGUILayout.Space();
		EditorGUILayout.LabelField ( "Vertical:" );
		
		iepo.params2.x = EditorGUILayout.FloatField ( "Amount", iepo.params2.x );
		iepo.params2.y = EditorGUILayout.FloatField ( "Speed", iepo.params2.y );
		iepo.params2.z = EditorGUILayout.FloatField ( "Strength", iepo.params2.z );
		
		if ( iepo.params2.x < 0 )
			iepo.params2.x = 0;
		
		if ( iepo.params2.z < 0 )
			iepo.params2.z = 0;
	}
	
	//=========================================================================
	public static void PostFxVortexGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "VORTEX OPTIONS:" );
		
		iepo.params1.x 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center X", iepo.params1.x, 0, 1 );
		iepo.params1.y 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center Y", iepo.params1.y, 0, 1 );
		iepo.params2.x 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Width", iepo.params2.x, 0, 1 );
		iepo.params2.y 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Height", iepo.params2.y, 0, 1 );
		iepo.params1.z 	= Mathf.Deg2Rad  * EditorGUILayout.FloatField ( "Angle", ( Mathf.Rad2Deg * iepo.params1.z ) );
	}
	
	//=========================================================================
	public static void PostFxFisheyeGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "FISHEYE OPTIONS:" );
		
		iepo.params1.x 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center X", iepo.params1.x, 0, 1 );
		iepo.params1.y 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center Y", iepo.params1.y, 0, 1 );
		iepo.params1.z 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Aperature", iepo.params1.z, 90, 180 );
		//iepo.params1.w 	= EchoSlider ( "Spin", iepo.params1.w, 0, 16 );
	}
	
	//=========================================================================
	public static void PostFxPinchBuldgeGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "BULDGE OPTIONS:" );
		
		iepo.params1.x 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center X", iepo.params1.x, 0, 1 );
		iepo.params1.y 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center Y", iepo.params1.y, 0, 1 );
		iepo.params1.z 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Amount", iepo.params1.z, 0, 0.25f );
		//iepo.params1.w 	= EchoSlider ( "Spin", iepo.params1.w, 0, 16 );
	}
	
	//=========================================================================
	public static void PostFxShockwaveGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "SHOCKWAVE OPTIONS:" );
		
		iepo.params1.x 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center X", iepo.params1.x, 0, 1 );
		iepo.params1.y 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center Y", iepo.params1.y, 0, 1 );
		iepo.params1.z 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Distance", iepo.params1.z, 0, 1 );
		iepo.params1.w 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Size", iepo.params1.w, 0, 1 );
	}
	
	//=========================================================================
	public static void PostFxRippleGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "RIPPLE OPTIONS:" );
		
		iepo.params1.x 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center X", iepo.params1.x, 0, 1 );
		iepo.params1.y 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Center Y", iepo.params1.y, 0, 1 );
		iepo.params1.z 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Amount", iepo.params1.z, 0, 128 );
		iepo.params1.w 	= EchoPFXEditorGadgets.EchoSliderFloat ( "Speed", iepo.params1.w, -32, 32 );
	}
	
	//=========================================================================
	public static void PostFxPosterizeGUI ( EchoPFXEffectOption iepo )
	{
		bool flag;
		
		EditorGUILayout.LabelField ( "POSTERIZE OPTIONS:" );
		
		if ( (int)iepo.params1.w == 0 )
			flag = false;
		else
			flag = true;
		
		flag = GUILayout.Toggle ( flag, "Lock" );
		
		if ( flag )
			iepo.params1.w = 1;
		else
			iepo.params1.w = 0;
		
		if ( flag )
		{
			iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderInt ( "Level:", (int)iepo.params1.x, 1, 64 );
			iepo.params1.y		= iepo.params1.x;
			iepo.params1.z		= iepo.params1.x;
		}
		else
		{
			EditorGUILayout.LabelField ( "Level:" );
			
			iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderInt ( "Red", (int)iepo.params1.x, 1, 64 );
			iepo.params1.y		= EchoPFXEditorGadgets.EchoSliderInt ( "Green", (int)iepo.params1.y, 1, 64 );
			iepo.params1.z		= EchoPFXEditorGadgets.EchoSliderInt ( "Blue", (int)iepo.params1.z, 2, 64 );
		}
	}
	
	//=========================================================================
	public static void PostFxGammaGUI ( EchoPFXEffectOption iepo )
	{
		bool flag;
		
		EditorGUILayout.LabelField ( "GAMMA OPTIONS:" );
		
		if ( (int)iepo.params1.w == 0 )
			flag = false;
		else
			flag = true;
		
		flag = GUILayout.Toggle ( flag, "Lock" );
		
		if ( flag )
			iepo.params1.w = 1;
		else
			iepo.params1.w = 0;
		
		if ( flag )
		{
			iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Level:", iepo.params1.x, 0.0f, 2.0f );
			iepo.params1.y		= iepo.params1.x;
			iepo.params1.z		= iepo.params1.x;
		}
		else
		{
			EditorGUILayout.LabelField ( "Level:" );
			
			iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Red", iepo.params1.x, 0.0f, 2.0f );
			iepo.params1.y		= EchoPFXEditorGadgets.EchoSliderFloat ( "Green", iepo.params1.y, 0.0f, 2.0f  );
			iepo.params1.z		= EchoPFXEditorGadgets.EchoSliderFloat ( "Blue", iepo.params1.z, 0.0f, 2.0f  );
		}
	}
	
	
	//=========================================================================
	public static void PostFxRGBSeparateGUI ( EchoPFXEffectOption iepo )
	{
		EditorGUILayout.LabelField ( "RGB SEPARATE OPTIONS:" );
		
		EditorGUILayout.LabelField ( "Separation:" );
		
		iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Red X", iepo.params1.x, -8.0f, 8.0f );
		iepo.params2.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Red Y", iepo.params2.x, -8.0f, 8.0f );
		
		EditorGUILayout.Space();
		
		iepo.params1.y		= EchoPFXEditorGadgets.EchoSliderFloat ( "Green X", iepo.params1.y, -8.0f, 8.0f );
		iepo.params2.y		= EchoPFXEditorGadgets.EchoSliderFloat ( "Green Y", iepo.params2.y, -8.0f, 8.0f  );
		
		EditorGUILayout.Space();
		
		iepo.params1.z		= EchoPFXEditorGadgets.EchoSliderFloat ( "Blue X", iepo.params1.z, -8.0f, 8.0f );
		iepo.params2.z		= EchoPFXEditorGadgets.EchoSliderFloat ( "Blue Y", iepo.params2.z, -8.0f, 8.0f );
	}
	
	//=========================================================================
	public static void PostFxContrastGUI ( EchoPFXEffectOption iepo )
	{
		bool flag;
		
		EditorGUILayout.LabelField ( "CONTRAST OPTIONS:" );
		
		if ( (int)iepo.params1.w == 0 )
			flag = false;
		else
			flag = true;
		
		flag = GUILayout.Toggle ( flag, "Lock" );
		
		if ( flag )
			iepo.params1.w = 1;
		else
			iepo.params1.w = 0;
		
		if ( flag )
		{
			iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Level:", iepo.params1.x, 0.0f, 2.0f );
			
			iepo.params1.y		= iepo.params1.x;
			iepo.params1.z		= iepo.params1.x;
		}
		else
		{
			EditorGUILayout.LabelField ( "Level:" );
			
			iepo.params1.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Red", iepo.params1.x, 0.0f, 2.0f );
			iepo.params1.y		= EchoPFXEditorGadgets.EchoSliderFloat ( "Green", iepo.params1.y, 0.0f, 2.0f );
			iepo.params1.z		= EchoPFXEditorGadgets.EchoSliderFloat ( "Blue", iepo.params1.z, 0.0f, 2.0f );
		}
		
		EditorGUILayout.Space();
		
		if ( (int)iepo.params2.w == 0 )
			flag = false;
		else
			flag = true;
		
		flag = GUILayout.Toggle ( flag, "Lock" );
		
		if ( flag )
			iepo.params2.w = 1;
		else
			iepo.params2.w = 0;
		
		if ( flag )
		{
			iepo.params2.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Cutoff:", iepo.params2.x, 0.0f, 2.0f );
			iepo.params2.y		= iepo.params2.x;
			iepo.params2.z		= iepo.params2.x;
		}
		else
		{
			EditorGUILayout.LabelField ( "Cutoff:" );
			
			iepo.params2.x		= EchoPFXEditorGadgets.EchoSliderFloat ( "Red", iepo.params2.x, 0.0f, 1.0f );
			iepo.params2.y		= EchoPFXEditorGadgets.EchoSliderFloat ( "Green", iepo.params2.y, 0.0f, 1.0f );
			iepo.params2.z		= EchoPFXEditorGadgets.EchoSliderFloat ( "Blue", iepo.params2.z, 0.0f, 1.0f );
		}
	}
	
	//=========================================================================
	public static void PostFxTextureGUI ( EchoPFXEffectOption iepo )
	{
		Texture2D tempTex = iepo.tex;

		iepo.tex = (Texture2D)EditorGUILayout.ObjectField ( iepo.tex, typeof ( Texture2D ), true, GUILayout.Width(64), GUILayout.Height(64) );

		if ( iepo.tex != null && iepo.tex.mipmapCount > 1 && tempTex == null )
		{
			EditorUtility.DisplayDialog("Warning optimization error!", "Disable mip-mapping for this texture\nfor maximum speed and quality" , "Ok", null );
		}
	}
	
	//=========================================================================
	public static bool HasTexCoord ( EchoPFXRenderGroup ierg, EchoPFXEffectOption iepo, int ipass )
	{
		List<EchoPFXShaderOption> poList;
		
		if ( ierg == null )
			return ( false );
		
		if ( ipass == 0 )
			poList = ierg.possibleOpts1;
		else
			poList = ierg.possibleOpts2;
		
		for ( int loop = 0; loop < poList.Count; loop++ )
		{
			if ( poList[loop].type == iepo.optType && poList[loop].id == iepo.poid && poList[loop].tcOpt == ECHOPFXTEXCOORD.UNIQUE )
				return ( true );
		}
		
		return ( false );
	}
	
	//=========================================================================
	public static void PostFxOverlayGUI ( EchoPFXRenderGroup ierg, EchoPFXEffectOption iepo, int ipass )
	{
		bool hasTC = HasTexCoord ( ierg, iepo, ipass );
		
		EditorGUILayout.LabelField ( "TEXTURE:" );
		
		if ( iepo.tex != null && hasTC )
		{
			iepo.overlayST = EditorGUILayout.Vector4Field ( "Tiling = xy  Offset = zw", iepo.overlayST );
			EditorGUILayout.Space();
		}
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.BeginVertical();
		
		EditorGUILayout.BeginHorizontal(GUILayout.Width(64));

		PostFxTextureGUI ( iepo );

		EditorGUILayout.EndHorizontal();
		EditorGUILayout.EndVertical();
		
		if ( iepo.tex != null && hasTC )
		{
			EditorGUILayout.BeginVertical();
			
			iepo.overlayST_Scroll.x	= EchoPFXEditorGadgets.EchoSliderFloat ( "Scroll U", iepo.overlayST_Scroll.x, 0.0f, 1.0f, 64 );
			iepo.overlayST_Scroll.y	= EchoPFXEditorGadgets.EchoSliderFloat ( "Scroll V", iepo.overlayST_Scroll.y, 0.0f, 1.0f, 64 );
			iepo.overlayST_Scroll.z	= EchoPFXEditorGadgets.EchoSliderFloat ( "U Throttle", iepo.overlayST_Scroll.z, -1.0f, 1.0f, 64 );
			iepo.overlayST_Scroll.w	= EchoPFXEditorGadgets.EchoSliderFloat ( "V Throttle", iepo.overlayST_Scroll.w, -1.0f, 1.0f, 64 );
			
			EditorGUILayout.EndVertical();
		}
		
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.Space();
		
	}
	
	//=========================================================================
	public static string GetOptionExtraText ( EchoPFXShaderOption ipo )
	{
		string txt = "";
		
		switch ( ipo.type )
		{
		case ECHOPFXOPTION.COLOR:
			txt = " [" + ((ECHOPFXCOLOR)ipo.BlockNext(0)).ToString();
			break;
			
		case ECHOPFXOPTION.AVERAGE_PIXEL:
			txt = " [" + ((ECHOPFXBLUR)ipo.BlockNext(0)).ToString();
			break;
			
		case ECHOPFXOPTION.TEXTURE:
			txt = " [" + ((ECHOPFXTEXBLEND)ipo.BlockNext(0)).ToString();
			break;
			
		case ECHOPFXOPTION.SCANLINES:
			txt = " [";
			
			if ( ipo.GetBlockMask ( 0 ) )
				txt += "HORZ";
			
			if ( ipo.GetBlockMask ( 1 ) )
				txt += " VERT";
			break;
			
		case ECHOPFXOPTION.DISTORTION:
			txt = " [" + ((ECHOPFXDISTORTION)ipo.BlockNext(0)).ToString();
			break;
		}
		
		if ( txt != "" )
			txt += "]";
		
		return ( txt );
	}

	//=========================================================================
	public static bool IsOptUseable ( List<EchoPFXEffectOption> iepos, EchoPFXShaderOption ipo )
	{
		if ( ipo.disabled == true )
		{
			return ( false );
		}
		
		for ( int loop = 0; loop < iepos.Count; loop++ )
		{
			if ( ipo.type == iepos[loop].optType && ipo.id == iepos[loop].poid )
				return ( false );
		}
		
		return ( true );
	}

	//=========================================================================
	public static void EffectPassMake( EchoPFXRenderGroup ierg, int ipassid, int iepeIndex )
	{
		List<EchoPFXEffectOption>[]	passOpt 		= new List<EchoPFXEffectOption>[4];
		List<EchoPFXShaderOption>[] possibleOpts	= new List<EchoPFXShaderOption>[4];
		EchoPFXShaderOption[]  		optLookup;
		EchoPFXEffectOption 		epo;
		int 						loop;
		string[]        			popupNames;
		int 						count;
		int                     	index;
		EchoPFXEffect           	epe;
		EchoPFXShaderOption 		po;
		
		if ( ierg == null )
		{
			return;
		}
		
		epe = ierg.epeList[iepeIndex];
		
		passOpt[0] = epe.passOpt1;
		passOpt[1] = epe.passOpt2;
		passOpt[2] = epe.passOpt3;
		passOpt[3] = epe.passOpt4;
		
		possibleOpts[0] = ierg.possibleOpts1;
		possibleOpts[1] = ierg.possibleOpts2;
		possibleOpts[2] = ierg.possibleOpts3;
		possibleOpts[3] = ierg.possibleOpts4;
		
		count = 0;
		for ( loop = 0; loop < possibleOpts[ipassid].Count; loop++ )
		{
			if ( IsOptUseable ( passOpt[ipassid], possibleOpts[ipassid][loop] ) )
			{
				count++;
			}
		}
		
		popupNames 		= new string[count+1];
		popupNames[0] 	= "Add Effect Option";
		optLookup 		= new EchoPFXShaderOption[count+1];
		
		count = 1;
		for ( loop = 0; loop < possibleOpts[ipassid].Count; loop++ )
		{
			if ( IsOptUseable ( passOpt[ipassid], possibleOpts[ipassid][loop] ) )
			{
				popupNames[count] = EchoPFXManagerEditor.optNames[(int)possibleOpts[ipassid][loop].type] + "(" + possibleOpts[ipassid][loop].id + ")" + GetOptionExtraText ( possibleOpts[ipassid][loop] ) ;
				optLookup[count] = possibleOpts[ipassid][loop];
				count++;
			}
		}
		
		if ( count > 1 )
		{
			GUILayout.BeginHorizontal();
			index = EditorGUILayout.Popup ( 0, popupNames );
			if ( index > 0 )
			{
				passOpt[ipassid].Add ( new EchoPFXEffectOption ( optLookup[index].type, optLookup[index].id, optLookup[index] ) );
				ierg.ValidateOptions();
			}
			GUILayout.EndHorizontal();
		}
		
		epe.passOpt[0] = epe.passOpt1;
		epe.passOpt[1] = epe.passOpt2;
		epe.passOpt[2] = epe.passOpt3;
		epe.passOpt[3] = epe.passOpt4;
		
		for ( loop = 0; loop < epe.passOpt[ipassid].Count; loop++ )
		{
			epo = epe.passOpt[ipassid][loop];
			
			if ( epo == null )
				continue;
			
			po = null;
			for (int i=0;i<possibleOpts[ipassid].Count;i++)
			{
				po = possibleOpts[ipassid][i];
				if ( po.type == epo.optType && po.id == epo.poid )
					break;
			}
			
			switch ( epo.optType )
			{
			case ECHOPFXOPTION.GREYSCALE:
				PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) ;
				break;
				
			case ECHOPFXOPTION.INVERSE:
				PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po );
				break;
				
			case ECHOPFXOPTION.COLOR:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxColorGUI ( epo );
				break;
				
			case ECHOPFXOPTION.DISTORTION:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
				{
					switch ( (ECHOPFXDISTORTION)po.BlockNext(0) )
					{
					case ECHOPFXDISTORTION.SHOCKWAVE:
						PostFxShockwaveGUI(epo);
						break;
					case ECHOPFXDISTORTION.WAVES:
						PostFxDistortionGUI (epo);
						break;
					case ECHOPFXDISTORTION.RIPPLE:
						PostFxRippleGUI(epo);
						break;
					case ECHOPFXDISTORTION.PINCH:
						PostFxPinchBuldgeGUI(epo);
						break;
					case ECHOPFXDISTORTION.BULDGE:
						PostFxPinchBuldgeGUI(epo);
						break;
					case ECHOPFXDISTORTION.FISHEYE:
						PostFxFisheyeGUI(epo);
						break;
					case ECHOPFXDISTORTION.VORTEX:
						PostFxVortexGUI(epo);
						break;
					}
				}
				break;
				
			case ECHOPFXOPTION.SCANLINES:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
				{
					PostFxScanLinesGUI ( epo, po );
				}
				break;
				
			case ECHOPFXOPTION.LUMRAMP:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxTextureGUI ( epo );
				break;
				
			case ECHOPFXOPTION.COLOR_CORRECT:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxTextureGUI ( epo );
				break;
				
			case ECHOPFXOPTION.CONTRAST:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxContrastGUI ( epo );
				break;
				
			case ECHOPFXOPTION.GAMMA:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxGammaGUI ( epo );
				break;
				
			case ECHOPFXOPTION.POSTERIZE:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxPosterizeGUI ( epo );
				break;
				
			case ECHOPFXOPTION.AVERAGE_PIXEL:
				PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po );
				break;
				
			case ECHOPFXOPTION.RGB_SEPARATE:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxRGBSeparateGUI ( epo );
				break;
				
			case ECHOPFXOPTION.TEXTURE:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxOverlayGUI ( ierg, epo, ipassid );
				break;
				
			case ECHOPFXOPTION.CUSTOM_FRAG:
				if ( PostFxOptionGUI ( passOpt[ipassid], loop, EchoPFXManagerEditor.optNames[(int)epo.optType] + "(" + epo.poid + ")" + GetOptionExtraText ( po ), po ) )
					PostFxCustomGUI ( ierg, epo, ipassid );
				break;
			}
		}
	}

	//=========================================================================
	public static int DisplayGUI( EchoPFXRenderGroup ierg, int iepeIndex )
	{
		Color oldColor = GUI.color;
		EchoPFXEffect epe;
		int sortPos;
		string name;
		
		if ( ierg == null )
			return(0);

		if ( ierg.epeList == null || ierg.epeList.Count <= 0 )
			return(0);
		
		if ( iepeIndex < 0 )
			iepeIndex = 0;
		
		if ( iepeIndex >= ierg.epeList.Count )
			iepeIndex = 0;
		
		epe = ierg.epeList[iepeIndex];
		
		// postfx options		
		EditorGUILayout.Space();
		
		if ( epe != null )
		{
			EditorGUILayout.BeginHorizontal();
			
			EditorGUILayout.LabelField ( "Name:", GUILayout.MaxWidth ( 42 ) );
			epe.name = EditorGUILayout.TextField ( epe.name );
			epe.name = epe.name.Trim();
			
			EditorGUILayout.EndHorizontal();
			
			EditorGUILayout.Space();
			
			GUILayout.BeginHorizontal();
			
			for ( int loop = 0; loop < 4; loop++ )
			{
				sortPos = ierg.PassOrder ( loop );
				
				if ( sortPos >= 0 )
				{
					if ( sortPos == EchoPFXManagerEditor._passIndex )
						GUI.color = EchoPFXManagerEditor.selectionColor;
					
					if ( sortPos > 1 )
						name = "Copy-"+(sortPos-1);
					else
						name = "Pass-"+(sortPos+1);
					
					if ( GUILayout.Button ( name ) )
					{
						EchoPFXManagerEditor._passIndex = sortPos;
					}
					GUI.color = oldColor;
				}
			}
			
			GUILayout.EndHorizontal();
			
			// title
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField("Effect Options:");
			EditorGUILayout.EndHorizontal();
			
			EffectPassMake( ierg, EchoPFXManagerEditor._passIndex, iepeIndex );

			EditorGUILayout.Space();
		}
		
		return ( iepeIndex );
	}

}
