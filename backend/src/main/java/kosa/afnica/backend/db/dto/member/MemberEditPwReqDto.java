package kosa.afnica.backend.db.dto.member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberEditPwReqDto {

    private String email;
    private String password;
}
