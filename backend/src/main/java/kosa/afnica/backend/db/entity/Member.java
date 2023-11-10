package kosa.afnica.backend.db.entity;

import lombok.Data;

@Data
public class Member {
    private long id;
    private String nickname;
    private String email;
    private String password;
    private String phoneNumber;
    private String withdrawal;
}
