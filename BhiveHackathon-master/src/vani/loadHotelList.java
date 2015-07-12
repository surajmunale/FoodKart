package vani;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;

public class loadHotelList extends ActionSupport{

	private String vegId;
	ArrayList<hotelModel> hotelList = new ArrayList<hotelModel>();
	public ArrayList<hotelModel> getHotelList() {
		return hotelList;
	}

	public void setHotelList(ArrayList<hotelModel> hotelList) {
		this.hotelList = hotelList;
	}

	public String hotelList()
	{
		/*Map<String,String> m=new HashMap<String,String>();
		m.put("text","text=This is great hotel");
		try
	       {
	    	   //String result=RepustateClient.getSentimentBulk(m);
	    	   String result=RepustateClient.listSentimentRules("english");
	       }
	       catch(Exception e)
	       {e.printStackTrace();}
		
		*/
		
		
		System.out.println("Vaneet in HotelList");
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		int i = 0;
		try{
			con = GetConnection.con;
			stmt = con.prepareStatement("select * from hotel, menu where hotel_id=hid and did=?");
			stmt.setInt(1, Integer.parseInt(vegId));
			rs = stmt.executeQuery();
			i = 1;
			while(rs.next())
			{
				hotelModel temp = new hotelModel();
				temp.setSno(i++);
				temp.setHid(rs.getInt("hid"));
				temp.setVegId(Integer.parseInt(vegId));
				temp.setName(rs.getString("hotel_name"));
				temp.setPrice(rs.getFloat("price"));
				temp.setRating(rs.getFloat("rating"));
				temp.setAddress(rs.getString("hotel_address"));
				
				hotelList.add(temp);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return SUCCESS;
	}

	public String getVegId() {
		return vegId;
	}

	public void setVegId(String vegId) {
		this.vegId = vegId;
	}
}