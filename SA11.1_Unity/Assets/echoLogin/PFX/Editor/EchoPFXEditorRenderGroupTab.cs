using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Callbacks;

public class EchoPFXEditorRenderGroupTab : Editor 
{
	//=========================================================================
	public static bool IsCameraInOtherRenderGroup ( Camera icam, EchoPFXManager iman )
	{
		int loop;

		for ( loop = 0; loop < iman.ergList.Count; loop++ )
		{
			if ( iman.ergList[loop].cameraList.Contains ( icam ) )
				return ( true );
		}

		return ( false );
	}

	//=========================================================================
	public static bool DropAreaCameraGUI ( EchoPFXRenderGroup ierg, EchoPFXManager iman )
	{
		Event evt 		= Event.current;
		Rect drop_area 	= GUILayoutUtility.GetRect (0.0f, 25.0f, GUILayout.ExpandWidth ( true ) );
		GUI.Box ( drop_area, "Drag And Drop Camera(s) here");
		int loop;
		
		switch (evt.type) 
		{
		case EventType.DragUpdated:
		case EventType.DragPerform:
			if (!drop_area.Contains (evt.mousePosition))
				return(false);
			
			DragAndDrop.visualMode = DragAndDropVisualMode.Copy;
			
			if (evt.type == EventType.DragPerform) 
			{
				DragAndDrop.AcceptDrag ();
				
				for ( loop = 0; loop < DragAndDrop.objectReferences.Length; loop++ )
				{
					GameObject newCamObj =  DragAndDrop.objectReferences[loop] as GameObject;
					
					if ( newCamObj != null )
					{
						if ( newCamObj.GetComponent<Camera>() != null )
						{
							if ( !IsCameraInOtherRenderGroup ( newCamObj.GetComponent<Camera>(), iman ) )
							{
								ierg.cameraList.Add(newCamObj.GetComponent<Camera>());
								ierg.SortCameraList();
								GUI.changed = true;
							}
							else
							{
								EditorUtility.DisplayDialog("Camera Already in a RenderGroup", null , "Ok", null );

							}
						}
					}
				}

				return ( true );
			}
			break;
		}

		return ( false );
	}


	public static bool DisplayGUI ( EchoPFXRenderGroup ierg, EchoPFXManager iman )
	{
		if ( ierg == null )
			return ( false );
		
		if ( iman.autoIncludeCameras )
		{
			int startRange;
			int endRange;
		
			startRange 	= (int)ierg.renderOrder;
			endRange 	= startRange+1;
			
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField("Camera Depth Range = ", GUILayout.Width(128) );
			EditorGUILayout.LabelField( startRange.ToString() + ".0 [inclusive] - " + endRange.ToString() + ".0 [exclusive]" );
			EditorGUILayout.EndHorizontal();
		}

		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.LabelField("Render Group Name: ", GUILayout.Width(128) );
		ierg.name = EditorGUILayout.TextField ( ierg.name, GUILayout.Width(128) );
		ierg.name = ierg.name.Trim();
		EditorGUILayout.EndHorizontal();

		EditorGUILayout.Space();
		
		EditorGUILayout.LabelField( new GUIContent( "Screen Mesh Quads" , "Set number of cells for distortion effects" ) );
		
		ierg.meshCellWidth = EchoPFXEditorGadgets.EchoSliderInt ( "Horz:", (int)ierg.meshCellWidth, 1, 127 );
		ierg.meshCellHeight = EchoPFXEditorGadgets.EchoSliderInt ( "Vert:", (int)ierg.meshCellHeight, 1, 127 );
		
		if ( ierg.meshCellWidth % 2 == 0 )
			ierg.meshCellWidth++;
		
		if ( ierg.meshCellHeight % 2 == 0 )
			ierg.meshCellHeight++;
		
		EditorGUILayout.Space();
		EditorGUILayout.Space();
		
		EditorGUILayout.LabelField("Render Texture Size" );
		ierg.rtAdjustSize = (ECHORTADJUST)EditorGUILayout.EnumPopup ( new GUIContent ( "Method", "Options for changing resolution of render texture" ), ierg.rtAdjustSize );
		
		if ( ierg.rtAdjustSize != ECHORTADJUST.DEVICE_SIZE )
		{
			if ( ierg.rtAdjustSize == ECHORTADJUST.AUTO_DETAIL )
			{
				ierg.rtAutoDetailManual     = EditorGUILayout.Toggle ( "Control levels manually", ierg.rtAutoDetailManual );
				ierg.autoDetailLevels 		= EditorGUILayout.IntSlider ( new GUIContent (  "Number Of Levels", "Number of screen size changes for detail levels" ), ierg.autoDetailLevels, 2, 5 );
				ierg.autoDetailMin 			= (float)(EditorGUILayout.IntSlider ( new GUIContent ( "Minimum Percent", "Minimum percent of th smallest screensize" ), (int)( ierg.autoDetailMin * 100.0f ), 20, 90 ) / 100.0f );
			
				if ( !ierg.rtAutoDetailManual )
				{
					ierg.autoDetailFudge 		= EditorGUILayout.Slider ( new GUIContent ( "Fudge Time", "How much off full fps before it changes detail" ),ierg.autoDetailFudge, 0.0f, 3.0f );
					ierg.autoDetailChangeTime   = EditorGUILayout.Slider ( new GUIContent ( "Change Up Time", "Delay before going back to higher detail" ), ierg.autoDetailChangeTime, 0.0f, 2.0f );
				}
			}
			else
			{
				ierg.rtAdjustWidth 	= EditorGUILayout.IntField ("Width", ierg.rtAdjustWidth );
				ierg.rtAdjustHeight = EditorGUILayout.IntField ("Height", ierg.rtAdjustHeight );
				
				if ( ierg.rtAdjustWidth < 2 )
					ierg.rtAdjustWidth = 2;

				if ( ierg.rtAdjustHeight < 2 )
					ierg.rtAdjustHeight = 2;
			}
		}
		
		EditorGUILayout.Space();
		EditorGUILayout.Space();

		if ( DropAreaCameraGUI( ierg, iman ) )
			return(true);

		EditorGUILayout.Space();

		Camera c;
		int removeIndex = -1;
		bool sortFlag = false;
		
		if ( ierg.cameraList != null )
		{
			for ( int loop = 0; loop < ierg.cameraList.Count; loop++ )
			{
				c = ierg.cameraList[loop];
				
				GUILayout.BeginHorizontal();
				
				EditorGUILayout.LabelField ( c.name );
				
				if ( loop > 0 )
				{
					if ( GUILayout.Button ( new GUIContent( EchoPFXManagerEditor.upArrow.ToString(), "Move up in render order"), GUILayout.Width(32) ) )
					{
						c.depth -= 0.015f;
						sortFlag = true;
						break;
					}
				}		
				else
					GUILayout.Box( "", GUILayout.Width(32));
				
				if ( loop < ierg.cameraList.Count-1 && ierg.cameraList.Count > 0 )
				{
					if ( GUILayout.Button ( new GUIContent( EchoPFXManagerEditor.dnArrow.ToString(), "Move up in render order"), GUILayout.Width(32) ) )
					{
						c.depth += 0.015f;
						sortFlag = true;
						break;
					}
				}
				else
					GUILayout.Box( "", GUILayout.Width(32));
				
				if ( GUILayout.Button ( new GUIContent( "-", "Remove camera from this render group"), GUILayout.Width(32) ) )
				{
					removeIndex = loop;
					sortFlag = true;
				}
				
				GUILayout.EndHorizontal();
			}
			
			if ( removeIndex >= 0 )
			{
				ierg.cameraList.Remove ( ierg.cameraList[removeIndex] );
			}
			
			if ( sortFlag )
				ierg.SortCameraList();
		}

		return ( true );
	}
}
