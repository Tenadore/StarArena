using UnityEngine;
using System.Collections;

public class EchoPFXUnityFreeCamSetRect : MonoBehaviour 
{
	public EchoPFXRenderTexture echoRenTex;

	//============================================================
	// work in progress go away
	void OnPreCull()
	{
		GetComponent<Camera>().pixelRect = echoRenTex.GetScreenRect();
	}
}
