package kosa.afnica.backend.db.dto.member;

import kosa.afnica.backend.db.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberMypageResDto {

    private String email;
    private String name;
    private String password;
    private String phoneNumber;

    public MemberMypageResDto(Member member) {
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.name = member.getName();
        this.phoneNumber = member.getPhoneNumber();
    }
}
