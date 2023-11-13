package kosa.afnica.backend.config.security;

import java.util.List;
import kosa.afnica.backend.db.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class AppUserDetails extends User {
	private Member member;

	public AppUserDetails(Member member, List<GrantedAuthority> authorities) {
		super(
			String.valueOf(member.getId()),
			member.getPassword(),
			member.isEnabled(),
			true, 
			true, 
			true, 
			authorities
		);
		this.member = member;
	}
	
	public Member getMember() {
		return member;
	}
}
