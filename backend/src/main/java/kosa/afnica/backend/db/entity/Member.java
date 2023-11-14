package kosa.afnica.backend.db.entity;

import lombok.*;

@Getter
@NoArgsConstructor
public class Member {
    private long id;
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String address;
    private boolean enabled;
    private String role;

    @Builder
    public Member(long id, String email, String password, String name, String phoneNumber, String address, boolean enabled, String role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.enabled = enabled;
        this.role = role;
    }
}
