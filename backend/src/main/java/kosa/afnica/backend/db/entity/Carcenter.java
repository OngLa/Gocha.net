package kosa.afnica.backend.db.entity;

import lombok.Data;

@Data
public class Carcenter {
    private long id;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String withdrawal;
}
