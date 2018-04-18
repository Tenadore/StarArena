using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.Callbacks;


public class EchoPFXEditorGadgets : Editor
{
	//=========================================================================
	public static float EchoSliderFloat ( string iname, float ival, float imin, float imax, int itwidth = 56 )
	{
		float rv;
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.LabelField ( iname, GUILayout.MaxWidth ( itwidth ) );
		rv = EditorGUILayout.Slider ( ival, imin, imax );
		EditorGUILayout.EndHorizontal();
		
		return ( rv );
	}
	
	//=========================================================================
	public static int EchoSliderInt ( string iname, int ival, int imin, int imax, int itwidth = 56 )
	{
		int rv;
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.LabelField ( iname, GUILayout.MaxWidth(itwidth) );
		rv = (int)EditorGUILayout.Slider ( ival, imin, imax );
		EditorGUILayout.EndHorizontal();
		
		return ( rv );
	}

}
