package semantic;

import twitter4j.*;
import twitter4j.auth.AccessToken;

public class SearchTweets {

	public String hotelPopularity(String hotelName) {
		Twitter twitter = new TwitterFactory().getInstance();
		AccessToken accessToken = new AccessToken(
				"3238079101-6semHHz1QCaABnJ4fZzqmrusAjEweFYvR70F6KK",
				"RiohWXLtH38Mh4SIXv6oYuULQFeO6MWkPDNVlUotLUHtI");
		twitter.setOAuthConsumer("6Q9YHQ76l2rfHOnyrkvDN8JeF",
				"4qVmnkIPLO8gTa1HtWZvY5wD1MNjMuRT8Z0iJvTMDmi5n95ZAU");
		twitter.setOAuthAccessToken(accessToken);
		String str = "";

		try {
			Query query = new Query("@" + hotelName);
			query.setCount(100);
			QueryResult result = twitter.search(query);
			for (Status status : result.getTweets())
				str += status.getText() + "\n";
		} catch (TwitterException te) {
			te.printStackTrace();
		}
		return str;
	}
}
