package vani;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Iterator;
import java.util.List;

import semantic.HotelDish;
import semantic.Semantic;

import com.opensymphony.xwork2.ActionSupport;

public class submitreview extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String hotelName;
	private String msg;
	Semantic sc=new Semantic();
	
	

	public String addreview()
	{
		System.out.println("Hotel NAme : " + hotelName + ", msg : " + msg);
		
		float rat = 0;
		int user = 0;
		List<HotelDish> h = sc.getMenuRating(hotelName, msg);
		Iterator<HotelDish> hitr = h.iterator();
		while (hitr.hasNext()) 
		{
			Connection con = null;
			PreparedStatement stmt = null;
			ResultSet rs = null;
			HotelDish hd = hitr.next();
			System.out.println(hd.getHotelName() + ", " + hd.getDish() + ", "
					+ hd.getRating()); 
			String str = hd.getDish().trim();
			try{
				con = GetConnection.con;
				stmt = con.prepareStatement("select rating, usercount from dish,menu,hotel where dish_id=did && hotel_id=hid && hotel_name=? && dish_name=?");
				stmt.setString(1, hd.getHotelName());
				stmt.setString(2, str);
				
				rs = stmt.executeQuery(); 
				
				System.out.println(hd.getHotelName() + "," + hd.getDish() + ", "
						+ hd.getRating() + "," + str);

				if(rs.next())
				{
					System.out.println("In If");
					System.out.println(rs.getFloat("rating") +", "+ rs.getInt("usercount"));
					rat = rs.getFloat("rating");
					user = rs.getInt("usercount");
					
					rat = rat * user;
					rat += hd.getRating();
					user++;
					rat /= user;
					
				}
				else
				{
					System.out.println("In else");
					rat = hd.getRating();
					user = 1;
				}
				System.out.println("Rat : " + rat + ", userCount : " + user);
				String query="update dish,menu,hotel set rating=?, usercount=? where dish_id=did && hotel_id=hid && hotel_name=? && dish_name=?;";
				//con = GetConnection.con;
				
				stmt = con.prepareStatement(query);
				stmt.setFloat(1, rat);
				stmt.setInt(2, user);
				stmt.setString(3, hd.getHotelName()); 
				stmt.setString(4, str);
				stmt.executeUpdate();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			
		}
		return SUCCESS;
	}

	public String getHotelName() {
		return hotelName;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
