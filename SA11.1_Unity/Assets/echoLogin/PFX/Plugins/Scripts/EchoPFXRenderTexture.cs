// (c) copyright echoLogin LLC 2014. All rights reserved.

using UnityEngine;
using System.Collections;
using System.Collections.Generic;

//[ExecuteInEditMode()]
public class EchoPFXRenderTexture  
{
	private static EchoPFXRenderTexture _ertCopy  	= null;
	private static EchoPFXRenderTexture _ertSave  	= null;
	private static Texture2D 		_tex2DCopy		= null;
	private static Texture2D 		_tex2DSave		= null;
	private static Material        _blitMat;
	private Rect     		_scnRect 				= new Rect ( 0,0,0,0 );
	private Texture2D 		_tex2d 					= null;
	private RenderTexture 	_renTex 				= null;
	public 	Texture         texture 				= null;

	//=========================================================================
	public EchoPFXRenderTexture (  int iwidth, int iheight, int idepth, FilterMode ifiltermode, TextureWrapMode iwrap )
	{

		if ( SystemInfo.supportsRenderTextures )
		{
			_renTex 			= new RenderTexture ( iwidth, iheight, idepth, RenderTextureFormat.ARGB32 );
			_renTex.useMipMap	= false;
			_renTex.anisoLevel 	= 0;
			_renTex.wrapMode	= iwrap;
			_renTex.filterMode	= ifiltermode;
			_renTex.Create();

			texture = _renTex;
		}
		else
		{
			_blitMat = new Material (
				"Shader \"Hidden/Invert\" {" +
				"SubShader {" +
				"    Pass {" +
				"        ZTest Always Cull Off ZWrite Off" +
				"        SetTexture [_MyTex] { combine texture }" +
				"    }" +
				"}" +
				"}"
				);

			_scnRect = new Rect( 0f, 0f, iwidth, iheight );

			_tex2d 				= new Texture2D ( iwidth, iheight, TextureFormat.RGB24, false );

			if ( _tex2d == null )
				_tex2d 			= new Texture2D ( iwidth, iheight, TextureFormat.ARGB32, false );

			_tex2d.anisoLevel 	= 0;
			_tex2d.wrapMode 	= iwrap;
			_tex2d.filterMode 	= ifiltermode;
			_tex2d.Apply();
			
			texture = _tex2d;

			if ( _tex2DCopy == null )
			{
				_tex2DCopy				= new Texture2D ( Screen.width, Screen.height, TextureFormat.ARGB32, false );
				_tex2DCopy.anisoLevel 	= 0;
				_tex2DCopy.wrapMode 	= TextureWrapMode.Repeat;
				_tex2DCopy.filterMode 	= FilterMode.Point;
				_tex2DCopy.Apply();
			}

			if ( _tex2DSave == null )
			{
				_tex2DSave				= new Texture2D ( Screen.width, Screen.height, TextureFormat.ARGB32, false );
				_tex2DSave.anisoLevel 	= 0;
				_tex2DSave.wrapMode 	= TextureWrapMode.Repeat;
				_tex2DSave.filterMode 	= FilterMode.Point;
				_tex2DSave.Apply();
			}
		}
	}
	
	//=========================================================================
	public RenderTexture GetRenderTexture()
	{
		return ( _renTex );
	}

	//=========================================================================
	public Rect GetScreenRect()
	{
		return _scnRect;
	}

	//=========================================================================
	public void ReadPixels ()
	{
		_tex2d.ReadPixels ( _scnRect, 0, 0, false );
		_tex2d.Apply();
	}

	//=========================================================================
	private static void ReadScreenPixels ( Texture2D idestTex )
	{
		idestTex.ReadPixels ( new Rect ( 0, 0, Screen.width, Screen.height ), 0, 0, false );
		idestTex.Apply();
	}

	//=========================================================================
	private static void Tex2Screen( Texture itex )
	{
		_blitMat.SetTexture ("_MyTex", itex );
		_blitMat.SetPass(0);

		GL.Begin(GL.QUADS);
		GL.Color(Color.white);
		GL.TexCoord2(0, 0);
		GL.Vertex3(0, 0, 0.1f);
		
		GL.TexCoord2(1, 0);
		GL.Vertex3(1, 0, 0.1f);
		
		GL.TexCoord2(1, 1);
		GL.Vertex3(1, 1, 0.1f);
		
		GL.TexCoord2(0, 1);
		GL.Vertex3(0, 1, 0.1f);
		GL.End();
	}

	/*

		1pass > pass1 tex2d 2 screen

		2pass > pass1 to screen, screen to pass2 tex2d, pass2 text2d to screen
		( if > 1st rendergroup, backup screen b4 doing anything then draw backup back to screen b4 overlay new group )

		1copy/1pass  copy screen to dest tex2d, draw pass1 to screen  

		1pass/1copy  draw pass to screen, copy screen to dest tex2d

		1copy/2pass copy screen to dest tex2d, draw pass1 to screen, copy screen to pass2 tex2d
		
		pass1/1copy/pass2  - drawpass1 to screen, copy screen to dest tex2 group, copy screen to pass2 tex2d

		pass1/1copy/2copy/pass2 - drawpass1 to screen, copy screen to 1and 2 copy dest tex2d and pass2 tex2d, pass2 to screen

		copy1/pass1/copy2/pass2 - screen to dest rengrp tex, pass1 to screen, screen to copy2, screen to pass2, pass2 to screen
		

	 */ 


	//=========================================================================
	public static void SetRenderTarget ( EchoPFXRenderTexture iert, EchoPFXRenderTexture iertDest, int ipass, int irengrporder, bool ihas2ndpass, bool icleardest = false )
	{
		if ( SystemInfo.supportsRenderTextures )
		{
			if ( iertDest == null )
				RenderTexture.active = null;
			else
				RenderTexture.active = iertDest._renTex;
			
			if ( icleardest )
			{
				GL.Clear ( true, true, new Color(0,0,0,0) );
			}
		}
		else
		{
			if ( iertDest == null )
			{
				if ( ipass == 1 )
				{
					iert.ReadPixels();
					GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );

					if ( _ertSave != null )
					{
						Tex2Screen ( _tex2DSave );
						_ertSave = null;
					}

				}
				else
				{
					//GL.Viewport( iert._scnRect );
					//iert.ReadPixels();
					GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
				}
			}
			else
			{
				switch ( ipass )
				{
					case 0:
					if ( irengrporder > 0 && ihas2ndpass )
					{
						GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
						ReadScreenPixels( _tex2DSave );

						if ( icleardest )
							GL.Clear ( true, true, new Color(0,0,0,0) );

						_ertSave = iert;

					}

					GL.Viewport( iert._scnRect );
					break;

					case 1:
					break;

					default:
					// backup screen
					GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
					ReadScreenPixels ( _tex2DCopy );
						
						//if ( icleardest )
						//	GL.Clear ( true, true, new Color(0,0,0,0) );

					GL.Viewport( iertDest._scnRect );
						
					_ertCopy = iertDest;
					break;
				}

			}
		}
	}

	//=========================================================================
	public static void PostCleanup()
	{
		if ( _ertCopy != null )
		{
			_ertCopy.ReadPixels();
			GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
			Tex2Screen ( _tex2DCopy );
			_ertCopy = null;
		}
	}

	//=========================================================================
	public static void Active ( EchoPFXRenderTexture[] iert, int ipass, int ipasscount )
	{
		if ( SystemInfo.supportsRenderTextures )
		{
			if ( ipasscount > 1 )
			{
				if ( ipass == 0 )
					RenderTexture.active = iert[1]._renTex;
				else
					RenderTexture.active = null;
			}
			else
				RenderTexture.active = null;
		}
		else
		{
			if ( ipass == 1 )
			{
				iert[ipass].ReadPixels ();
				GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
			}
			else
			{
				if ( ipasscount == 1 )
					GL.Viewport( new Rect ( 0,0,Screen.width, Screen.height ) );
				else
					GL.Viewport( iert[ipass]._scnRect );
			}
		}
	}

	//=========================================================================
	public void DiscardContents()
	{
		if ( SystemInfo.supportsRenderTextures )
			_renTex.DiscardContents();
	}

	//=========================================================================
	public void SetCamerasRenderTarget ( List<Camera> icams )
	{
		if ( SystemInfo.supportsRenderTextures )
		{
			for ( int loop = 0; loop < icams.Count; loop++ )
			{
				icams[loop].targetTexture = _renTex;
			}
		}
	}
}
