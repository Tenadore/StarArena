using UnityEngine;
using System.Collections;

public class orbbrain : MonoBehaviour 
{

	void Update ()
	{
		transform.Rotate ( Time.smoothDeltaTime * new Vector3 ( 32,14,15 ) );
	}
}
