using UnityEngine;
using UnityEditor;
using System.Collections;

public class EchoPFXToolbar : MonoBehaviour 
{

	[MenuItem ("GameObject/Create Other/echoLogin/_echoPFXManager")]
	public static void CreateManager()
	{
		GameObject go;
		
		go = new GameObject("_echoPFXManager");
		
		go.AddComponent<EchoPFXManager>();
		
		 if(Selection.activeTransform != null)
            go.transform.parent = Selection.activeTransform;
	}
}
