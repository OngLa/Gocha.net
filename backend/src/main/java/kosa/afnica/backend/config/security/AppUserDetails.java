package kosa.afnica.backend.config.security;

import java.util.List;
import kosa.afnica.backend.db.entity.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

@Getter
public class AppUserDetails extends User {
	// 로그인 시 email에 대한 Member 객체와 이의 권한을 가지는 객체.

	private final Member member;

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

}
