package vani;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import com.opensymphony.xwork2.ActionSupport;

public class loadVegList extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	ArrayList<dishModel> dishList = new ArrayList<dishModel>();
	
	public ArrayList<dishModel> getDishList() {
		return dishList;
	}

	public void setDishList(ArrayList<dishModel> dishList) {
		this.dishList = dishList;
	}

	public String vegList()
	{
		System.out.println("Vaneet in VegList");
		Connection con;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		int i = 1;
		try{
			con = GetConnection.con;
			stmt = con.prepareStatement("select * from dish");
			rs = stmt.executeQuery();
			i = 1;
			while(rs.next())
			{
				dishModel temp = new dishModel();
				temp.setSno(i++);
				temp.setVegId(rs.getInt("dish_id"));
				temp.setName(rs.getString("dish_name"));
				dishList.add(temp);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return SUCCESS;	
	}
}
