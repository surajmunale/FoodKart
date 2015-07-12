package vani;

import java.sql.Connection;
import java.sql.DriverManager;
import javax.swing.JOptionPane;

public class GetConnection {
	public static Connection con;
	
	static
	{
		try 
		{
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			JOptionPane.showMessageDialog(null, "JDBC Driver has not found");
		}
		
		try {
			con = DriverManager.getConnection("jdbc:mysql://localhost/bhive", "root", "");
		} catch (Exception e) {
			JOptionPane.showMessageDialog(null, "Error in Opening the Connection");
		}
	}
}