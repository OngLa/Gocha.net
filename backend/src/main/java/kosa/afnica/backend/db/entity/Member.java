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
}
