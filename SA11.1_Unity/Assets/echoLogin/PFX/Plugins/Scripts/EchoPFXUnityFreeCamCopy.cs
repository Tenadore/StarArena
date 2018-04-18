using UnityEngine;
using System.Collections;

public class EchoPFXUnityFreeCamCopy : MonoBehaviour 
{
	public EchoPFXRenderTexture echoRenTex;

	//============================================================
	void OnPostRender()
	{
		if ( echoRenTex != null )
		{
			echoRenTex.ReadPixels();
			GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
			//GL.Clear ( true, true, new Color (0,0,0,0));
		}
	}
}
