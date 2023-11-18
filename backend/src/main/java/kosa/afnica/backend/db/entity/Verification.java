package kosa.afnica.backend.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Verification {

    String veriEmail;
    String veriCode;

    @Builder
    public Verification(String veriEmail, String veriCode) {
        this.veriEmail = veriEmail;
        this.veriCode = veriCode;
    }
}