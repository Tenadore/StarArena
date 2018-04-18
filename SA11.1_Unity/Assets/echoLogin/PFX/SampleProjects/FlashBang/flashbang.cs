using UnityEngine;
using System.Collections;

public class flashbang : MonoBehaviour 
{
	private EchoPFX _fx;
	
	void Start ()
	{
		// Do this at start so its not allocating stuff during runtime 
		_fx = new EchoPFX ( "RenderGroup:0", "FLASHBANG" );
	}
	
	void Update ()
	{
		if ( Input.GetMouseButtonDown(0) )
		{
			_fx.Start();
		}
	}
}
