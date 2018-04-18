using UnityEngine;
using System.Collections;

public enum ECHOPFXTEXCOORD
{
	DEFAULT = 0,
	UNIQUE,
	RANDOM
};

//-----------------------------------------------------------------------------
[System.Serializable]
public class EchoPFXShaderOption
{
	public ECHOPFXOPTION 	type;
	public ECHOPFXMATHS     maths;
	public bool             mathsFlag;
	public int              id;
	public float         	order;
	public bool             orderTop;
	public string        	customCode;
	public ECHOPFXTEXCOORD 	tcOpt;
	public int              tcIndex;
	public bool             alwaysOn;
	public bool             disabled;
	public int             	codeMask;  		// parts in binary mask
	public ECHOPFXFADETYPE  fadeType;   
	public Texture2D        fadeMask;      	// null if none
	public int              fadeMaskIndex; 
	public bool             fadeMaskDissolve;
	
	//=========================================================================
	public EchoPFXShaderOption ( ECHOPFXOPTION iopt )
	{
		order 				= 99 + (int)iopt;
		type  				= iopt;
		tcOpt 				= ECHOPFXTEXCOORD.DEFAULT;
		alwaysOn 			= false;
		disabled    		= false;
		tcIndex     		= 0;
		codeMask    		= 1;
		fadeMask    		= null;
		fadeMaskDissolve    = false;
		
		SetShit(true);
	}
	
	//=========================================================================
	public EchoPFXShaderOption ( ECHOPFXOPTION iopt, int iorder )
	{
		order 				= iorder;
		type  				= iopt;
		tcOpt 				= ECHOPFXTEXCOORD.DEFAULT;
		alwaysOn 			= false;
		disabled    		= false;
		tcIndex     		= 0;
		codeMask    		= 1;
		fadeMask    		= null;
		fadeMaskDissolve    = false;

		SetShit(true);
	}

	//=========================================================================
	public void SetShit( bool ionCreate = false )
	{
		orderTop    = false;

		if ( ionCreate )
		{
			mathsFlag   = true;
			maths 		= ECHOPFXMATHS.AVERAGE;
		}

		switch ( type )
		{
		case ECHOPFXOPTION.DISTORTION:
			orderTop    = true;
			tcOpt = ECHOPFXTEXCOORD.DEFAULT;
			if ( fadeMask != null )
				tcOpt = ECHOPFXTEXCOORD.UNIQUE;
			break;
			
		case ECHOPFXOPTION.GREYSCALE:
			mathsFlag   = false;
			break;
			
		case ECHOPFXOPTION.COLOR:
			if ( ionCreate )
				maths 		= ECHOPFXMATHS.ADD; 
			break;
			
		case ECHOPFXOPTION.COLOR_CORRECT:
			break;
			
		case ECHOPFXOPTION.CONTRAST:
			break;
			
		case ECHOPFXOPTION.GAMMA:
			break;
			
		case ECHOPFXOPTION.POSTERIZE:
			break;
			
		case ECHOPFXOPTION.INVERSE:	
			mathsFlag   = false;
			break;
			
		case ECHOPFXOPTION.RGB_SEPARATE:
			orderTop    = true;
			break;
			
		case ECHOPFXOPTION.LUMRAMP: 
			mathsFlag   = false;
			break;
			
		case ECHOPFXOPTION.SCANLINES:
			break;
			
		case ECHOPFXOPTION.AVERAGE_PIXEL:
			orderTop    = true;
			break;
			
		case ECHOPFXOPTION.TEXTURE:
			mathsFlag   = false;
			break;
			
		case ECHOPFXOPTION.CUSTOM_FRAG:
			break;
		}
	}

	//=========================================================================
	public void SetBlockMask ( int iblocknum )
	{
		codeMask = codeMask | ( 1 << iblocknum );
	}

	//=========================================================================
	public void ClearBlockMask ( int ipartnum )
	{
		codeMask = codeMask & ~( 1 << ipartnum );
	}
	
	//=========================================================================
	public bool GetBlockMask ( int ipartnum )
	{
		if ( ( codeMask & ( 1 << ipartnum ) ) > 0 )
			return ( true );
		
		return ( false );
	}
	
	//=========================================================================
	public int BlockCount ()
	{
	    int count = 0;
		int num = codeMask;	
			
	    while ( num != 0 )
	    {
	    	num &= ( num - 1 );
	      	count++;
	    }
			
	    return ( count );
	}
	
	//=========================================================================
	public int BlockNext ( int icurbit )
	{
		for ( int loop = icurbit; loop < 31; loop++ )
		{
			if ( GetBlockMask ( loop ) )
			{
				return ( loop );
			}
		}
		
		return ( -1 );
	}
	
};

