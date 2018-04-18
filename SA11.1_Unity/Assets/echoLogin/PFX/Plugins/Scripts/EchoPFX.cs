// (c) copyright echoLogin LLC 2014. All rights reserved.

using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;

//---------------------------------------------------------------
public class EchoPFX
{
	public static List<EchoPFXRenderGroup> 	ergList;  // set by manager on start 
	EchoPFXRenderGroup 						erg;
	EchoPFXEffect      						epe;

	//=========================================================================
	public EchoPFX ( string iergname, string ifxname )
	{
		int loop;

		erg = null;
		epe = null;

		if ( iergname != null && ifxname != null )
		{
			if ( ergList != null )
			{
				for ( loop = 0; loop < ergList.Count; loop++ )
				{
					if ( ergList[loop].name == iergname )
					{
						erg = ergList[loop];
						break;
					}
				}
				
				for ( loop = 0; loop < erg.epeList.Count; loop++ )
				{
					if ( erg.epeList[loop].name == ifxname )
					{
						epe = erg.epeList[loop];
						break;
					}
				}
			}
		}
	}

	//============================================================
	public void DistortionCenter ( int ipass, int iid, float icenterx, float icentery )
	{
		EchoPFXEffectOption epo;

		epo = epe.OptionGet ( ECHOPFXOPTION.DISTORTION, ipass, iid );

		if ( epo != null )
		{
			epo.params1.x = Mathf.Clamp ( icenterx, 0.0f, 1.0f );
			epo.params1.y = Mathf.Clamp ( icentery, 0.0f, 1.0f );
		}
	}

	//============================================================
	public void  DistortionCenter ( int ipass, int iid, int iscreenx, float iscreeny )
	{
		DistortionCenter ( ipass, iid, (float)iscreenx / (float)( Screen.width - 1 ), (float)iscreeny / (float)( Screen.height - 1 ) );
	}

	//=========================================================================
	public void SetColor ( int ipass, int iid, Color icolor, float iamplify = 1.0f )
	{
		EchoPFXEffectOption epo;

		epo = epe.OptionGet ( ECHOPFXOPTION.COLOR, ipass, iid );

		if ( epo != null )
		{
			epo.rgba 			= icolor;
			epo.rgbaMultiply 	= iamplify;
		}
	}

	//=========================================================================
	public void SetTexture ( int ipass, int iid, Texture2D itex )
	{
		EchoPFXEffectOption epo;

		epo = epe.OptionGet ( ECHOPFXOPTION.CUSTOM_FRAG, ipass, iid );

		if ( epo != null )
		{
			epo.tex = itex;
		}
	}

	//=========================================================================
	public void SetCustom ( int ipass, int iid, Vector4 iparam1, Vector4 iparam2 )
	{
		EchoPFXEffectOption epo;

		epo = epe.OptionGet ( ECHOPFXOPTION.CUSTOM_FRAG, ipass, iid );

		if ( epo != null )
		{
			epo.params1 = iparam1;
			epo.params2 = iparam2;
		}
	}

	//=========================================================================
	public void SetCustom ( int ipass, int iid, Vector4 iparam1 )
	{
		EchoPFXEffectOption epo;

		epo = epe.OptionGet ( ECHOPFXOPTION.CUSTOM_FRAG, ipass, iid );

		if ( epo != null )
		{
			epo.params1 = iparam1;
		}
	}

	//=========================================================================
	public void Start()
	{
		erg.epeEchoList.Activate ( epe );
		epe.Start();
	}

	//=========================================================================
	public void Start( float iscale )
	{
		erg.epeEchoList.Activate ( epe );
		epe.Start ( iscale );
	}

	//=========================================================================
	public void Stop()
	{
		epe.Stop();
	}

}