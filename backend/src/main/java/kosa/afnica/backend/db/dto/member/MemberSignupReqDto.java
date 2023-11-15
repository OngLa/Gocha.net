package kosa.afnica.backend.db.dto.member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberSignupReqDto {

    private String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String address;
    private String role;

}







