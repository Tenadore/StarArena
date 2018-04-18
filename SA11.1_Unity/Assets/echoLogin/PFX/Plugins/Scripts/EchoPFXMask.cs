using UnityEngine;
using System.Collections;
using System.Collections.Generic;

//-----------------------------------------------------------------------------
public class EchoPFXMaskOrder
{
	public int order;
	public bool dissolve;
}

//-----------------------------------------------------------------------------
public class EchoPFXMask
{
	public Texture2D 					tex;
	public bool      					alwaysOn;
//	public bool      					dissolve;
	public int       					countDissolve;
	public int       					countNormal;
	public List<EchoPFXMaskOrder>		orderList;
	
	//=========================================================================
	public EchoPFXMask ( EchoPFXShaderOption ieso )
	{
		orderList 	= new List<EchoPFXMaskOrder>();
		AddOrderID ( (int)ieso.order, ieso.fadeMaskDissolve );
		tex 		= ieso.fadeMask;
		//dissolve    = ieso.fadeMaskDissolve;
		alwaysOn 	= false;
	}
	
	//=========================================================================
	public void AddOrderID ( int iorder, bool idissolve )
	{
		EchoPFXMaskOrder eo = new EchoPFXMaskOrder();
		
		eo.order 	= iorder;
		eo.dissolve = idissolve;
		
		orderList.Add ( eo );
	}
}
