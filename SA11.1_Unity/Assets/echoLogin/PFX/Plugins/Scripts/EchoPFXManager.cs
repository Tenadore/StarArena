// (c) copyright echoLogin LLC 2014. All rights reserved.

using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;

//---------------------------------------------------------------
[System.Serializable]
public class EchoPFXManager : MonoBehaviour 
{
	public static Camera                    manCam              = null;
	public static int 						tick 				= 0; 
	public static bool 						initFlag			= false;
	public static float                     globalFPS           = 60;
	public List<EchoPFXRenderGroup> 		ergList 			= new List<EchoPFXRenderGroup>();
	public int                              frameRate           = 60;
	public bool                             autoIncludeCameras  = false;
	public bool                             dontDestroyOnLoad   = false;
	private Transform                   	_camTransform;
	private Vector4                         _echoVertTime       = new Vector4(0,0,0,0);
	private Vector4                         _echoFragTime       = new Vector4(0,0,0,0);
	private Vector4                         _echoScreenInfo;
	
	
#if !UNITY_4_0 && !UNITY_4_0_1 && !UNITY_4_1 && !UNITY_4_2 && !UNITY_3_5_7 && !UNITY_3_5_6
	private int								_echoVertTimeID     = 0;
	private int                          	_echoFragTimeID     = 0;
	private int                          	_echoScreenInfoID   = 0;
#endif

	//============================================================
	public void OnLevelWasLoaded ( int ilevel )
	{
		for ( int loop = 0; loop < ergList.Count; loop++ )
		{
			ergList[loop].ForceShaderPropertyUpdate();
		}
	}

	//============================================================
	public int GetRenderGroupID ( string iname )
	{
		for ( int loop = 0; loop < ergList.Count; loop++ )
		{
			if ( ergList[loop].name == iname )
				return ( loop );
		}
		
		return ( -1 );
	}

	//============================================================
	public int GetEffectID ( string iname, int iergindex )
	{
		for ( int index = 0; index < ergList[iergindex].epeList.Count; index++ )
		{
			if ( ergList[iergindex].epeList[index].name == iname )
				return ( index );
		}

		return ( -1 );
	}
	
	//============================================================
	public void SetDetailLevel ( int ierg_index, int ilevel )
	{
		ergList[ierg_index].SetDetailLevel ( ilevel );
	}

	//============================================================
	public void StartEffect ( int ierg_index, int ieffect_index )
	{
		ergList[ierg_index].epeList[ieffect_index].Start();
	}
	
	//============================================================
	public void UpdateAllRenderGroups()
	{
		for ( int loop = 0; loop < ergList.Count; loop++ )
		{
			ergList[loop].ValidateOptions();
		}
	}

	//============================================================
	public void SortRenderGroups()
	{
		int index;

		ergList.Sort ( delegate ( EchoPFXRenderGroup e1, EchoPFXRenderGroup e2 ) 
		{
			return ( e1.renderOrder.CompareTo ( e2.renderOrder ) );
		});

		for ( index = 0; index < ergList.Count; index++ )
		{
			ergList[index].renderOrder = index;
			ergList[index].SortCameraList();
		}
	}

	//============================================================
	void Awake()
	{
		Camera[] allCams = Camera.allCameras;
		Camera c;
		EchoPFXRenderGroup ergNext;
		int loop;

		if ( !autoIncludeCameras )
			allCams = null;

		EchoPFX.ergList = ergList;
		
		for ( loop = 0; loop < ergList.Count; loop++ )
		{
			ergList[loop].ForceShaderPropertyUpdate();
		}

#if !UNITY_4_0 && !UNITY_4_0_1 && !UNITY_4_1 && !UNITY_4_2 && !UNITY_3_5_7 && !UNITY_3_5_6
		_echoVertTimeID = Shader.PropertyToID ("_echoVertTime");
		_echoFragTimeID = Shader.PropertyToID ("_echoFragTime");
		_echoScreenInfoID = Shader.PropertyToID ("_echoScreenInfo");
#endif

		_echoScreenInfo = new Vector4 ( Screen.width, Screen.height, (float)Screen.width / (float)Screen.height, Screen.dpi );

		EchoPFX.ergList = ergList;

		globalFPS = frameRate;

		Application.targetFrameRate = frameRate;

		// setup this camera

		c = gameObject.GetComponent<Camera>();

		if ( c == null )
		{
			c = gameObject.AddComponent <Camera>() as Camera;
		}

		c.backgroundColor 		= new Color ( 0, 0, 0, 0 );
		c.clearFlags 			= CameraClearFlags.Nothing;
		c.orthographic 			= true;
		c.orthographicSize 		= 1;
		c.nearClipPlane     	= 0.1f;
		c.farClipPlane      	= 100;
		c.cullingMask       	= 0;
		c.hdr 					= false;
		c.useOcclusionCulling 	= false;
		c.hideFlags            	= HideFlags.HideInInspector | HideFlags.HideInHierarchy | HideFlags.NotEditable;
		//c.hideFlags             = HideFlags.None;
		c.depth                	= ergList.Count + 1;
		c.rect                  = new Rect(0,0,1,1);

		manCam = c;
		
		_camTransform = GetComponent<Camera>().transform;
		
		// sort to make sure they are processed in proper order
		SortRenderGroups();

		for ( loop = 0; loop < ergList.Count; loop++ )
		{
			ergNext = null;

			if ( loop < ( ergList.Count - 1 ) )
				ergNext = ergList[loop+1];
			
			ergList[loop].PrepareForRuntime ( frameRate, ergNext, allCams );
		}
	}

	//============================================================
	void Start()
	{
		for ( int loop = 0; loop < ergList.Count; loop++ )
		{
			ergList[loop].AllocRenderTextures();
		}
		
		Shader.WarmupAllShaders();
	}

	//============================================================
	void OnPreCull()
	{
		if ( !SystemInfo.supportsRenderTextures )
			EchoPFXManager.manCam.pixelRect = new Rect ( 0, 0, Screen.width, Screen.height );
	}
	
	//============================================================
	void OnPostRender()
	{
		int index;

		for ( index = 0; index < ergList.Count; index++ )
		{
			ergList[index].Render(_camTransform);
		}
		
		for ( index = 0; index < ergList.Count; index++ )
		{
			ergList[index].SetAutoDetail();
		}
		
		// mesh stuff  ( put a check here to test if mesh effects are even being used )
//			ProcessAreaEffects ( erg );
			
	}

	//============================================================
	void Update()
	{
		_echoVertTime.x = Time.time / 20.0f;
		_echoVertTime.y = Time.time;
		_echoVertTime.z = UnityEngine.Random.value;
		_echoVertTime.w = UnityEngine.Random.value;
		
		_echoFragTime = _echoVertTime;

#if UNITY_4_0 || UNITY_4_0_1 || UNITY_4_1 || UNITY_4_2 || UNITY_3_5_7 || UNITY_3_5_6
		Shader.SetGlobalVector ( "_echoVertTime", _echoVertTime );
		Shader.SetGlobalVector ( "_echoFragTime", _echoFragTime );
		Shader.SetGlobalVector ( "_echoScreenInfo", _echoScreenInfo );
#else
		Shader.SetGlobalVector ( _echoVertTimeID, _echoVertTime );
		Shader.SetGlobalVector ( _echoFragTimeID, _echoFragTime );
		Shader.SetGlobalVector ( _echoScreenInfoID, _echoScreenInfo );
#endif

		for ( int loop = 0; loop < ergList.Count; loop++ )
		{
			ergList[loop].ProcessInUpdate();
		}
	}
}
