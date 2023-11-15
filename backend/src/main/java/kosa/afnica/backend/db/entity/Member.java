package kosa.afnica.backend.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Member {
    private Long id;
    private String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String address;
    private boolean enabled;
    private String role;

    @Builder
    public Member(String email, String name, String password, String phoneNumber, String address, String role) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.role = role;
    }
}