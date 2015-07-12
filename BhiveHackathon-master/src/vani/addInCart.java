package vani;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class addInCart extends ActionSupport implements ServletRequestAware{
	
	private HttpServletRequest request;
	
	 @Override
	    public void setServletRequest(HttpServletRequest request) {
	        this.setRequest(request);
	    }
	     
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int hid;
	private int vegId;
	/*private String quant;*/
	private String rating;
	ArrayList<dishModel> dishList = new ArrayList<dishModel>();
	ArrayList<hotelModel> cartList;
	
	Connection con = null;
	PreparedStatement stmt = null;
	ResultSet rs = null;

	public ArrayList<hotelModel> getCartList() {
		return cartList;
	}

	public void setCartList(ArrayList<hotelModel> cartList) {
		this.cartList = cartList;
	}

	public ArrayList<dishModel> getDishList() {
		return dishList;
	}

	public void setDishList(ArrayList<dishModel> dishList) {
		this.dishList = dishList;
	}

	public int getHid() {
		return hid;
	}

	public void setHid(int hid) {
		this.hid = hid;
	}

	public int getVegId() {
		return vegId;
	}

	public void setVegId(int vegId) {
		this.vegId = vegId;
	}
	

	public String doGet()
			throws ServletException, IOException {
		System.out.println("in doget with agrument");
		ArrayList<hotelModel> list;
		
		hotelModel temp = null;
		int i = 0;
		System.out.println("hid : " + hid + ", vegId : " + vegId);
		try {
			con = GetConnection.con;
			stmt = con
					.prepareStatement("select * from dish, hotel, menu where dish_id=did and hotel_id = hid and hid = ? and did = ?");
			stmt.setInt(1, hid);
			stmt.setInt(2, vegId);
			// Create a session object if it is already not created.
			rs = stmt.executeQuery();
			i = 1;
			if (rs.next()) {
				temp = new hotelModel();

				temp.setSno(i++);
				temp.setName(rs.getString("hotel_name"));
				temp.setVegName(rs.getString("dish_name"));
				temp.setPrice((rs.getFloat("price")));
				temp.setRating(rs.getFloat("rating"));
				temp.setAddress(rs.getString("hotel_address"));
				temp.setHid(hid);
				temp.setVegId(vegId);
				
			}
			Map<String, Object> session  = ActionContext.getContext().getSession();
			list = (ArrayList<hotelModel>) session.get("cart");
			System.out.println("VAL : " + request.getParameter("quantId"));
			if(list == null)
			{
				list = new ArrayList<hotelModel>(); 
			}
			list.add(temp);
			session.put("cart", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try{
			con = GetConnection.con;
			stmt = con.prepareStatement("select * from dish");
			rs = stmt.executeQuery();
			i = 1;
			while(rs.next())
			{
				dishModel tempDish = new dishModel();
				tempDish.setSno(i++);
				tempDish.setVegId(rs.getInt("dish_id"));
				tempDish.setName(rs.getString("dish_name"));
				dishList.add(tempDish);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
		return SUCCESS;
	}
	
	public String remove()
	{
		Map<String, Object> session  = ActionContext.getContext().getSession();
		cartList = (ArrayList<hotelModel>) session.get("cart");
		if(cartList != null)
		{
			for(int i = 0; i < cartList.size(); i++)
			{
				System.out.println(cartList.get(i).getHid()+" " + cartList.get(i).getVegId());
				if(cartList.get(i).getHid() == hid && cartList.get(i).getVegId() == vegId)
				{
					cartList.remove(i);
					break;
				}
			}
		}
		session.put("cart", cartList);
		return SUCCESS;
	}
	
	
	public String show()
	{
		
		Map<String, Object> session  = ActionContext.getContext().getSession();
		cartList = (ArrayList<hotelModel>) session.get("cart");
		
		if(cartList != null)
		{
			for(int i = 0; i < cartList.size(); i++)
			{
				System.out.println(cartList.get(i).getHid()+" " + cartList.get(i).getVegId());
			}
			
		}
		return SUCCESS;
	}

	
	public String clearList()
	{
		System.out.print("in Clear List");
		Map<String, Object> session  = ActionContext.getContext().getSession();
		cartList = (ArrayList<hotelModel>) session.get("cart");
		if(cartList != null)
		{
			cartList.clear();
			session.put("cart", null);
		}
		
		return SUCCESS;
	}
	
	/*public String getQuantity() {
		return quant;
	}

	public void setQuantity(String quantity) {
		this.quant = quantity;
	}
*/
	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

}
