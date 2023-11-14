package kosa.afnica.backend.db.dto.member;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberLoginResDto {
    private String email;
    private String role;
    private String accessToken;

    @Builder
    public MemberLoginResDto(String email, String accessToken, String role) {
        this.email = email;
        this.role = role;
        this.accessToken = accessToken;
    }
}
