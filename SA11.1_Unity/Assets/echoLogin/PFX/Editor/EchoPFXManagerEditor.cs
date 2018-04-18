using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Callbacks;
using System;
using System.IO;

public enum ECHOPFXTEXBLEND
{
	NORMAL = 0,
	ADD,
	SUBTRACT,
	MULTIPLY,
	SCREEN,
	OVERLAY
};

public enum ECHOPFXCOLOR
{
	NORMAL = 0,
	ADD,
	MULTIPLY,
	SCREEN,
	OVERLAY
};

public enum ECHOPFXBLUR
{
	MOBILE = 0,
	NORMAL,
};

public enum ECHOPFXDISTORTION
{
	WAVES = 0,
	RIPPLE,
	SHOCKWAVE,
	PINCH,
	BULDGE,
	FISHEYE,
	VORTEX
};

[CustomEditor (typeof(EchoPFXManager))]
public class EchoPFXManagerEditor : Editor 
{
	public static Color  compileColor 		= new Color ( 1.5f, 0.4f, 0.0f, 2.0f );
	public static Color  toggleColor 		= new Color ( 2.0f, 0.4f, 0.4f, 2.0f );
	public static Color  selectionColor 	= new Color ( 0.4f, 0.7f, 2.0f, 2.0f );
	public static Color  buttonColor 		= new Color ( 0.85f, 0.9f, 1.0f, 1.0f );
	public static Color  disabledColor		= new Color ( 0.8f, 0.8f, 0.8f, 1.0f );
	public static Color  curveColor       	= new Color ( 2.0f, 0.1f, 0.1f, 1.0f );
	public static bool   needCompile      	= true;
	public	static char upArrow 			= '\u25B2';
	public 	static char dnArrow 			= '\u25BC';
	public	static char rightArrow 			= '\u25B6';
	public	static EchoPFXManager epfxm    	= null;
	public  static int _passIndex           = 0;

	private static int _curid 		= 0;
	private	EchoPFXRenderGroup _erg = null;
	private int _epeIndex 			= 0;
	private int _ergIndex 			= 0;
	private bool _myfxFold 			= true;
	private bool _myrgFold 			= true;
	private bool _myrgOptFold 		= true;
	private int  _curShaderTab   	= 1;
	private int  _curMode   		= 0;
	private bool _playMaker         = false;
	private bool _jsEnabled         = false;
	private bool _setDirty          = false;
	private int _setDirtyFrames     = 0;

	public static readonly string[] optNames = new string[(int)ECHOPFXOPTION.COUNT]
	{
		"Distort",
		"Greyscale",
		"Color",
		"Color Correct",
		"Contrast",
		"Gamma",
		"Posterize",
		"Inverse",
		"RGB Separate",
		"Luminance Ramp",
		"Scanline",
		"Average Pixel",
		"Texture",
		"Custom Frag",
	};
	
	//=========================================================================
	public static void SetCompileFlag ( bool iflag )
	{
		needCompile = true;
	}
	
	//=========================================================================
	public string TrimString ( string istr )
	{
		char[] trimChars = {' '};
		
		return ( istr.Trim(trimChars) );
	}

	//=========================================================================
	public int GetGroupID()
	{

		if ( epfxm == null || epfxm.ergList == null || epfxm.ergList.Count < 1 )
			return ( 0 );

		return ( (int)epfxm.ergList[epfxm.ergList.Count-1].renderOrder + 1 );
	}
	
	//=========================================================================
	void SavePrefs()
	{
		EditorPrefs.SetInt ( "echo_ergIndex", _ergIndex );
		EditorPrefs.SetInt ( "echo_epeIndex", _epeIndex  );
		EditorPrefs.SetInt ( "echo_passIndex", _passIndex  );
		EditorPrefs.SetInt ( "echo_curMode", _curMode );
		EditorPrefs.SetInt ( "echo_curShaderTab", _curShaderTab );
		EditorPrefs.SetInt ( "echo_curID", _curid );
		EditorPrefs.SetBool ( "echo_needCompile", needCompile );
		EditorPrefs.SetBool ( "echo_PlayMaker", _playMaker );
	}

	//=========================================================================
	void LoadPrefs()
	{
		_curMode 		= EditorPrefs.GetInt ( "echo_curMode", 0 );
		_curShaderTab 	= EditorPrefs.GetInt ( "echo_curShaderTab" );
		_curid 			= EditorPrefs.GetInt ( "echo_curid", 0 );
		needCompile 	= EditorPrefs.GetBool ( "echo_needCompile", false );
		_ergIndex   	= EditorPrefs.GetInt ( "echo_ergIndex", 0 );
		_epeIndex 		= EditorPrefs.GetInt ( "echo_epeIndex", 0 );
		_passIndex 		= EditorPrefs.GetInt ( "echo_passIndex", 0 );
		_playMaker  	= EditorPrefs.GetBool ( "echo_PlayMaker", false );
	}
	
	//=========================================================================
	void OnDisable()
	{
		//EditorPrefs.DeleteAll();
		if ( target != null )
			EditorUtility.SetDirty(target);
		SavePrefs();
		EchoPFXEditorShaderTab.ClearCustomOpt();
//		EchoPFXLoadSave.Save( epfxm, Application.dataPath+"/echoPFXSerialize.xml" );
	}
	
	//=========================================================================
	void OnEnable()
	{
		EchoPFXEffect epe;
		LoadPrefs();
		
		_jsEnabled = false;
		if ( !System.IO.File.Exists ( Application.dataPath + "/echoLogin/PFX/Plugins/Scripts/EchoPFXManager.cs" ) )
		{
			_jsEnabled = true;
		}
		
		EchoPFXEditorShaderTab.ClearCustomOpt();
		epfxm 		= (EchoPFXManager)target;

#if !UNITY_3_5_7 && !UNITY_3_5_6
		string scriptName = typeof(EchoPFXManager).Name;
		
		foreach (MonoScript monoScript in MonoImporter.GetAllRuntimeMonoScripts())
		{
			if (monoScript.name == scriptName)
			{
				if ( MonoImporter.GetExecutionOrder(monoScript) != -31000 )
					MonoImporter.SetExecutionOrder(monoScript, -31000);
				break;
			}
		}
#endif
		
		serializedObject.Update();
//		postFX.Update();

//		EchoPFXLoadSave.Load( epfxm, Application.dataPath+"/echoPFXSerialize.xml" );

		if ( epfxm.ergList.Count < 1 )
		{
			SetNewRenderGroup ( new EchoPFXRenderGroup( GetGroupID() ), true );
		}
		
		if ( _ergIndex < 0 || _ergIndex >= epfxm.ergList.Count )
			_ergIndex = 0;

		_erg = epfxm.ergList[ _ergIndex ];

		if ( _epeIndex < 0 || _epeIndex >= _erg.epeList.Count )
		{
			if ( _erg.epeList.Count < 1 )
			{
				epe 		= new EchoPFXEffect();
				epe.name 	= "New Effect";
				_erg.epeList.Add ( epe );
				_epeIndex 	= _erg.epeList.IndexOf ( epe );
			}
		}
		
		if ( Application.isPlaying == false )
			_erg.ValidateOptions();

		EditorApplication.playmodeStateChanged = AutoCompileShaders;
		
		//epfxm.UpdateAllRenderGroups();
	}

	//=========================================================================
	private static bool ReplaceInFile ( string ifilePath, string isearchText, string ireplaceText )
	{
		bool enabled = false;
		
		StreamReader reader = new StreamReader (ifilePath);
		string content = reader.ReadToEnd ();
		reader.Close();

		if (content.StartsWith(isearchText))
		{
			enabled = true;
			content = content.Replace ( isearchText, ireplaceText );
		}
		else
		{
			enabled = false;
			content = content.Replace ( ireplaceText, isearchText );
		}
		
		StreamWriter writer = new StreamWriter (ifilePath);
		writer.Write (content);
		writer.Close();
		
		return ( enabled );
	}
	
	//=========================================================================
	private void SetNewRenderGroup ( EchoPFXRenderGroup ierg, bool iadd )
	{

		if ( _erg != ierg )
			EchoPFXEditorShaderTab.ClearCustomOpt();
		else
			return;

		_erg 		=  ierg;
		
		_erg.ValidateOptions();

		if ( iadd )
		{
			epfxm.ergList.Add ( _erg );
			_erg.renderOrder = epfxm.ergList.Count; 
			epfxm.SortRenderGroups();
		}

		_ergIndex = epfxm.ergList.IndexOf ( _erg );
		_epeIndex 		= 0;
		_passIndex  	= 0;
		_curShaderTab 	= 0;
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
	public void MyEffectsGUI()
	{
		int loop;
		int delIndex 	= -1;
		EchoPFXEffect epfx;
		Color old_color = GUI.color;
		EchoPFXEffect epe;

		EditorGUILayout.Space();
		
		if ( GUILayout.Button( new GUIContent( "Add Effect", "Add new effect to this render group") ) )
		{
			epe 			= new EchoPFXEffect();
			epe.name 		= "New Effect";
			_erg.epeList.Add ( epe );
			_epeIndex 		= _erg.epeList.IndexOf ( epe );
		}
		
		EditorGUILayout.Space();

		
		if ( _erg == null || _erg.epeList.Count < 1 )
		{
			EditorGUILayout.Space();
			EditorGUILayout.LabelField ( "Effect List Empty: Add a New Effect" );
			EditorGUILayout.Space();
			return;
		}
		

		if ( _erg == null )
			return;

		if ( _epeIndex >=_erg.epeList.Count )
		{
			_epeIndex = 0;
			return;
		}

		epe = _erg.epeList[_epeIndex];
		for ( loop = 0; loop < _erg.epeList.Count; loop++ )
		{
			epfx = _erg.epeList[ loop ];
			
			GUILayout.BeginHorizontal();
			
			if ( GUILayout.Button ( new GUIContent( "C", "Copy name to clipboard"), GUILayout.Width(32) ) )
			{
				EditorGUIUtility.systemCopyBuffer = epfx.name;
			}

			if ( epfx.active )
			{
				GUI.color = toggleColor;
				if ( GUILayout.Button ( new GUIContent( "ON", "Effect on at start"), GUILayout.Width(32) ) )
				{
					epfx.active = false;
				}
				GUI.color = old_color;
			}
			else
			{
				if ( GUILayout.Button ( new GUIContent( "OFF", "Effect off at start"), GUILayout.Width(32) ) )
				{
					epfx.active = true;
				}
			}

			if ( loop == _epeIndex )
				GUI.color = selectionColor;
			else
				GUI.color = buttonColor;
			
			if ( GUILayout.Button ( epfx.name ) )
			{
				epe   = epfx;
				_epeIndex = loop;
				//_curMode  = 2;
			}
			
			GUI.color = old_color;

			if ( GUILayout.Button ( new GUIContent( "-", "Remove this effect"), GUILayout.Width(32) ) )
			{
				if ( EditorUtility.DisplayDialog("Remove This Effect ?", "Are you sure ?", "Yes", "No" ) )
				{
					EchoPFXEditorShaderTab.ClearCustomOpt();
					delIndex = loop;
				}
			}
			
			GUILayout.EndHorizontal();
		}

		if ( delIndex >= 0 && _erg.epeList.Count > 0 )
		{
			_erg.epeList.RemoveAt ( delIndex );
			
			if (  _erg.epeList.Count <= 0 )
			{
				EditorUtility.DisplayDialog("All Effects Removed !", "System will add default Effect", "Ok", null );
				epe	= new EchoPFXEffect();
				epe.name 			= "New Effect";
				_erg.epeList.Add ( epe );
				_epeIndex 			= _erg.epeList.IndexOf ( epe );
			}
			

			if (  _epeIndex >= _erg.epeList.Count )
				_epeIndex = _erg.epeList.Count-1;
		}
	}
	
	//=========================================================================
	public static int HasCustomOptions ( EchoPFXShaderOption ipo )
	{
		int rc = -1;

		if ( ipo.mathsFlag )
			rc = (int)ipo.type;

		switch ( ipo.type )
		{
		case ECHOPFXOPTION.COLOR:
			rc = (int)ipo.type;
			break;

		case ECHOPFXOPTION.AVERAGE_PIXEL:
			rc = (int)ipo.type;
			break;

		case ECHOPFXOPTION.TEXTURE:
			rc = (int)ipo.type;
			break;

		case ECHOPFXOPTION.CUSTOM_FRAG:
			rc = (int)ipo.type;
			break;

		case ECHOPFXOPTION.SCANLINES:
			rc = (int)ipo.type;
			break;

		case ECHOPFXOPTION.DISTORTION:
			rc = (int)ipo.type;
			break;

		}

		return ( rc );
	}

	//=========================================================================
	public void MyRenderGroupsGUI()
	{
		int 				delIndex 	= -1;
		Color 				old_color	= GUI.color;
		bool 				sortFlag 	= false;
		int 				loop;
		EchoPFXRenderGroup 	erg;

		EditorGUILayout.Space();
		if ( GUILayout.Button ( new GUIContent( "Add Render Group", "Add new render group") ) )
		{
			SetNewRenderGroup ( new EchoPFXRenderGroup( GetGroupID() ), true );
			epfxm.SortRenderGroups();
		}

		EditorGUILayout.Space();

		if ( epfxm.ergList.Count < 1 )
		{
			EditorGUILayout.Space();
			EditorGUILayout.LabelField ( "No Render Groups !" );
			EditorGUILayout.Space();
			return;
		}
		
		for ( loop = 0; loop < epfxm.ergList.Count; loop++ )
		{
			erg = epfxm.ergList[ loop ];
			
			if ( erg == null )
			{
				continue;
			}
			
			GUILayout.BeginHorizontal();

			if ( GUILayout.Button ( new GUIContent( "C", "Copy name to clipboard"), GUILayout.Width(32) ) )
			{
				EditorGUIUtility.systemCopyBuffer = erg.name;
			}
			
			if ( loop == _ergIndex )
				GUI.color = selectionColor;
			else
				GUI.color = buttonColor;

			if ( GUILayout.Button ( erg.name ) )
			{
				SetNewRenderGroup ( erg, false );
				_curMode = 0;
			}
			
			GUI.color = old_color;
			
			if ( loop > 0 )
			{
				if ( GUILayout.Button ( new GUIContent( upArrow.ToString(), "Move up in render order"), GUILayout.Width(32) ) )
				{
					erg.renderOrder-=1.5f;
					sortFlag = true;
					break;
				}
			}
			else
				GUILayout.Box( "", GUILayout.Width(32));
			
			if ( loop < epfxm.ergList.Count-1 && epfxm.ergList.Count > 0 )
			{
				if ( GUILayout.Button ( new GUIContent( dnArrow.ToString(), "Move down in render order"), GUILayout.Width(32) ) )
				{
					erg.renderOrder+=1.5f;
					sortFlag = true;
					break;
				}
			}
			else
				GUILayout.Box( "", GUILayout.Width(32));


			if ( GUILayout.Button ( new GUIContent( "-", "Remove this render group"), GUILayout.Width(32) ) )
			{
				if ( EditorUtility.DisplayDialog("Remove This Render Group ?", "This will erase all effects in this group!\nAre you sure ?", "Yes", "No" ) )
				{
					EchoPFXEditorShaderTab.ClearCustomOpt();
					delIndex = loop;
				}
			}
			
			GUILayout.EndHorizontal();
		}
		
		if ( sortFlag )
		{
			needCompile = true;
			epfxm.SortRenderGroups();
		}
		
		if ( delIndex >= 0 )
		{
			if ( epfxm.ergList.Count > 0 )
			{
				epfxm.ergList.RemoveAt ( delIndex );

				_ergIndex--;
				
				if ( _ergIndex < 0 )
				{
					_ergIndex = 0;
					_erg = null;
					if ( epfxm.ergList.Count < 1 )
					{
						EditorUtility.DisplayDialog("All RenderGroups Removed !", "System will add empty RenderGroup and Effect", "Ok", null );
						SetNewRenderGroup ( new EchoPFXRenderGroup( GetGroupID() ), true );
						epfxm.SortRenderGroups();
						
						EchoPFXEffect epe	= new EchoPFXEffect();
						epe.name 			= "New Effect";
						_erg.epeList.Add ( epe );
						_epeIndex 			= _erg.epeList.IndexOf ( epe );
					}
				}
			}
			else
			{
				_erg 		= null;
				_ergIndex 	= 0;
			}
		}
	}
	
	//=========================================================================
	public bool MoveAssetFolder ( string isourceDir, string idestDir )
	{
		string status;
		DirectoryInfo dir 	= new DirectoryInfo(isourceDir);
		FileInfo[] files 	= dir.GetFiles("*.cs");
 
		foreach ( FileInfo file in files ) 
		{
		    status = AssetDatabase.MoveAsset ( isourceDir + "/" + file.Name, idestDir + "/" + file.Name );
			if ( status != "" )
				return ( false );
		}
	
		return ( true );
	}
	
	//=========================================================================
	public void ToggleUnityScriptSupport()
	{
		string csDir = "Assets/echoLogin/PFX/Plugins/Scripts";
		string jsDir = "Assets/Plugins/echoLogin/PFX";
		
		if ( System.IO.File.Exists ( Application.dataPath + "/echoLogin/PFX/Plugins/Scripts/EchoPFXManager.cs" ) )
		{
			if ( EditorUtility.DisplayDialog("Enable JS Support ?", "This will move source files into Assets/Plugins folder.", "Ok", "Cancel" ) )
			{
				_jsEnabled = true;
				
				AssetDatabase.CreateFolder ( "Assets","Plugins" );
				AssetDatabase.CreateFolder ( "Assets/Plugins","echoLogin" );
				AssetDatabase.CreateFolder ( "Assets/Plugins/echoLogin","PFX" );
				
				MoveAssetFolder ( csDir, jsDir );
			}
		}
		else
		{
			if ( EditorUtility.DisplayDialog("Disable JS Support ?", "This will move source files back to Assets/echoLogin Folder.\nYou will need to restart Unity after this operation.", "Ok", "Cancel" ) )
			{
				_jsEnabled = false;
				MoveAssetFolder ( jsDir, csDir );
				FileUtil.DeleteFileOrDirectory ( Application.dataPath + "/Plugins/echoLogin/PFX" );
				FileUtil.DeleteFileOrDirectory ( Application.dataPath + "/Plugins/echoLogin" );
			}
		}
		
		AssetDatabase.Refresh();
	}

	//=========================================================================
	public bool TogglePlayMakerActions()
	{
		string searchText 	= "#if false";
		string replaceText 	= "#if true";
		bool enabled 		= false;

		enabled = ReplaceInFile ( Application.dataPath + "/echoLogin/PFX/Plugins/PlayMakerActions/EchoTriggerPostEffect.cs", searchText, replaceText);
		enabled = ReplaceInFile ( Application.dataPath + "/echoLogin/PFX/Plugins/PlayMakerActions/EchoTriggerDistortionXY.cs", searchText, replaceText);

		AssetDatabase.Refresh();

		return ( enabled );
	}
	
	//=========================================================================
	public override void OnInspectorGUI()
	{
		string[] names = { "Group", "Shader", "Effects" };
		string[] toolTips = { "Render Group Settings", "Choose what effects options are included in shader", "Make effects from options chosen under Build tab" };
		int loop;
		Color oldColor = GUI.color;
		string cname;
		bool oldToggle;
		
		serializedObject.Update();
//		postFX.Update();
		
		if ( epfxm.ergList.Count > 0 )
		{
			SetNewRenderGroup ( epfxm.ergList[ _ergIndex ], false );
		}
		
		EditorGUILayout.Space();
		EditorGUILayout.LabelField ( "Manager Depth: " + (epfxm.ergList.Count+1) );
		EditorGUILayout.Space();

		epfxm.frameRate 			= EditorGUILayout.IntField ( new GUIContent( "Frame Rate", "Frames per second you app should run at" ), epfxm.frameRate );
		epfxm.autoIncludeCameras    = EditorGUILayout.Toggle ( new GUIContent( "Auto Include Cameras", "Includes cameras using Rengrgroup ID as a depth" ), epfxm.autoIncludeCameras );
	//	epfxm.dontDestroyOnLoad		= EditorGUILayout.Toggle (new GUIContent( "Dont Destroy On Load", "When true will keep EchoPFXManager across scenes." ), epfxm.dontDestroyOnLoad );
		

		oldToggle = _playMaker;
		_playMaker 					= EditorGUILayout.Toggle (new GUIContent( "PlayMaker Actions", "Toggle this on if you are using PlayMaker\n This will add actions to trigger post fx." ), _playMaker );
		if ( oldToggle != _playMaker )
		{
			_playMaker = TogglePlayMakerActions();
		}

		oldToggle = _jsEnabled;
		_jsEnabled 					= EditorGUILayout.Toggle (new GUIContent( "JavaScript Support", "Toggle this on if you are using UnityScript ( js )." ), _jsEnabled );
		if ( oldToggle != _jsEnabled )
		{
			ToggleUnityScriptSupport();
		}

		GUILayout.BeginHorizontal();
		if ( GUILayout.Button ( new GUIContent( "Export", "Saves all settings to a XML file" ) ) )
		{
			EchoPFXEditorShaderTab.ClearCustomOpt();
			EchoPFXLoadSave.Save( epfxm );
		}
		if ( GUILayout.Button ( new GUIContent( "Import", "Loads XML file to restore settings from a saved file" ) ) )
		{
			EchoPFXEditorShaderTab.ClearCustomOpt();
			needCompile 	= true;
			SetNewRenderGroup ( EchoPFXLoadSave.Load( epfxm ), false );
		}
		GUILayout.EndHorizontal();

		
		EditorGUILayout.Space();
		GUILayout.Box( "", new GUILayoutOption[]{GUILayout.ExpandWidth(true), GUILayout.Height(8)});
		EditorGUILayout.Space();

		_myrgFold = EditorGUILayout.Foldout (_myrgFold, new GUIContent("Render Groups") );
		if ( _myrgFold )
			MyRenderGroupsGUI();
		
		EditorGUILayout.Space();
		
		EditorGUILayout.Space();
		GUILayout.Box( "", new GUILayoutOption[]{GUILayout.ExpandWidth(true), GUILayout.Height(8)});
		EditorGUILayout.Space();	
		
		_myfxFold = EditorGUILayout.Foldout ( _myfxFold, new GUIContent("Effects") );

		if ( _myfxFold )
			MyEffectsGUI();
		
		EditorGUILayout.Space();
		GUILayout.Box("", new GUILayoutOption[]{GUILayout.ExpandWidth(true), GUILayout.Height(8)});
		EditorGUILayout.Space();

		EditorGUILayout.Space();

		if ( needCompile )
		{
			cname = ">> Compile Post FX Shaders <<";
			GUI.color = compileColor;
		}
		else
		{
			cname = "Compile Post FX Shaders";
		}

		if ( GUILayout.Button ( cname ,GUILayout.Height(24) ) )
		{
			EchoPFXShaderBuild.BuildShaders ( epfxm.ergList );
			needCompile = false;
		}
		GUI.color = oldColor;

		EditorGUILayout.Space();
		GUILayout.Box("", new GUILayoutOption[]{GUILayout.ExpandWidth(true), GUILayout.Height(8)});

		EditorGUILayout.Space();
		
		_myrgOptFold = EditorGUILayout.Foldout ( _myrgOptFold, new GUIContent("Render Group Options") );
		if ( _myrgOptFold )
		{
			GUILayout.BeginHorizontal();
			for ( loop = 0; loop < 3; loop++ )
			{
				if ( loop == _curMode )
					GUI.color = selectionColor;
				
				if ( GUILayout.Button (  new GUIContent( names[loop], toolTips[loop])) )
				{
					EchoPFXEditorShaderTab.ClearCustomOpt();
					_curMode 	= loop;
					epfxm.UpdateAllRenderGroups();
				}
				
				GUI.color = oldColor;
			}
			GUILayout.EndHorizontal();
	
			EditorGUILayout.Space();
			
			switch ( _curMode )
			{
			case 1:
				EchoPFXEditorShaderTab.DisplayGUI ( _erg, _epeIndex );
				break;
			
			case 2:
				_epeIndex = EchoPFXEditorEffectsTab.DisplayGUI ( _erg, _epeIndex );
				break;
				
			default:
				EchoPFXEditorRenderGroupTab.DisplayGUI ( _erg, epfxm );
				break;
			}
		}
		

#if !UNITY_4_0 && !UNITY_4_0_1 && !UNITY_4_1 && !UNITY_4_2 && !UNITY_3_5_7 && !UNITY_3_5_6
		if ( GUI.changed )
		{
			_setDirtyFrames = 0;
			_setDirty = true;
		}
		else
		{
			_setDirtyFrames++;
			if ( _setDirtyFrames > 8 )
			{
				_setDirtyFrames = 0;
				if ( _setDirty )
				{
					_setDirty = false;
					EditorUtility.SetDirty(target);
					serializedObject.ApplyModifiedProperties();
				}
			}
		}
#else
		_setDirtyFrames = 0;
		_setDirty = true;
		if ( _setDirty && _setDirtyFrames == 0 )
		{
			EditorUtility.SetDirty(target);
			serializedObject.ApplyModifiedProperties();
		}
#endif

	}

	public void AutoCompileShaders()
	{
		if ( needCompile && epfxm != null && epfxm.ergList != null )
		{
			EchoPFXShaderBuild.BuildShaders ( epfxm.ergList );
			needCompile = false;
		}
	}
}
