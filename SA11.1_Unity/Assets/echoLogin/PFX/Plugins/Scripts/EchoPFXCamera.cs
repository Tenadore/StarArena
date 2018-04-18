using UnityEngine;
using System.Collections;

public class EchoPFXCamera : MonoBehaviour 
{
	public bool  activeAtStart = true;
	private EchoPFXRenderGroup _erg;
	
	//=========================================================================
	public void OnEnable()
	{
		if ( _erg != null )
			_erg.AddCamera ( GetComponent<Camera>() );
	}
	
	//=========================================================================
	public void OnDisable()
	{
	}
	
	//=========================================================================
	public void SetRenderGroup ( EchoPFXRenderGroup ierg )
	{
		_erg = ierg;
		
		if ( !activeAtStart && GetComponent<Camera>() != null )
			GetComponent<Camera>().enabled = false;
	}
}
